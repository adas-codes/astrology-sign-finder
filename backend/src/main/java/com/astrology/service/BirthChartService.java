package com.astrology.service;

import com.astrology.dto.BirthChartRequest;
import com.astrology.dto.BirthChartResponse;
import com.astrology.exception.ApiProblemException;
import com.astrology.exception.ExternalServiceException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.zone.ZoneRules;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class BirthChartService {
  private static final List<String> SIGNS = List.of(
      "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
      "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces");
  private static final List<String> NAKSHATRAS = List.of(
      "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
      "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni",
      "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha",
      "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha",
      "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
      "Uttara Bhadrapada", "Revati");
  private static final double NAKSHATRA_SIZE = 360.0 / 27.0;
  private static final double PADA_SIZE = NAKSHATRA_SIZE / 4.0;

  private final PlaceProvider places;
  private final SwissEphemerisEngine ephemeris;

  public BirthChartService(PlaceProvider places, SwissEphemerisEngine ephemeris) {
    this.places = places;
    this.ephemeris = ephemeris;
  }

  public List<PlaceProvider.Place> searchPlaces(String query) {
    return places.search(query);
  }

  public BirthChartResponse calculate(BirthChartRequest request) {
    if (request.timeOfBirth().getNano() != 0) {
      throw new ApiProblemException(
          HttpStatus.BAD_REQUEST, "Birth time must be precise to the nearest second.");
    }

    PlaceProvider.Place place = places.resolve(request.birthplace().placeId());
    if (!Double.isFinite(place.latitude()) || place.latitude() < -90 || place.latitude() > 90
        || !Double.isFinite(place.longitude()) || place.longitude() < -180
        || place.longitude() > 180) {
      throw new ExternalServiceException("The selected birthplace has invalid coordinates.");
    }
    String timeZoneId = places.timeZoneId(place, request.dateOfBirth());
    ZoneId zoneId;
    try {
      zoneId = ZoneId.of(timeZoneId);
    } catch (RuntimeException exception) {
      throw new ExternalServiceException("The birthplace provider returned an invalid time zone.");
    }
    LocalDateTime localDateTime = LocalDateTime.of(request.dateOfBirth(), request.timeOfBirth());
    ZoneRules rules = zoneId.getRules();
    List<ZoneOffset> offsets = rules.getValidOffsets(localDateTime);
    if (offsets.isEmpty()) {
      throw new ApiProblemException(
          HttpStatus.BAD_REQUEST, "This local birth time does not exist because of a clock change.");
    }
    if (offsets.size() != 1) {
      throw new ApiProblemException(
          HttpStatus.BAD_REQUEST, "This local birth time is ambiguous because of a clock change.");
    }

    Instant instant = localDateTime.toInstant(offsets.get(0));
    if (instant.isAfter(Instant.now())) {
      throw new ApiProblemException(HttpStatus.BAD_REQUEST, "Birth time cannot be in the future.");
    }
    SwissEphemerisEngine.EphemerisData data =
        ephemeris.calculate(instant, place.latitude(), place.longitude());
    double ascendant = normalize(data.ascendant());
    int lagnaSignIndex = signIndex(ascendant);
    List<BirthChartResponse.Point> points = new ArrayList<>();
    points.add(toPoint("Lagna", ascendant, false, lagnaSignIndex));
    for (SwissEphemerisEngine.BodyPosition body : data.bodies()) {
      double longitude = normalize(body.longitude());
      points.add(toPoint(body.name(), longitude, body.retrograde(), lagnaSignIndex));
      if ("Rahu".equals(body.name())) {
        points.add(toPoint("Ketu", normalize(longitude + 180.0), body.retrograde(), lagnaSignIndex));
      }
    }
    if (points.size() != 10) {
      throw new ExternalServiceException("Swiss Ephemeris returned an incomplete nine-graha chart.");
    }

    List<BirthChartResponse.House> houses = new ArrayList<>();
    for (int house = 1; house <= 12; house++) {
      houses.add(new BirthChartResponse.House(
          house, SIGNS.get((lagnaSignIndex + house - 1) % SIGNS.size())));
    }
    PositionDetails lagnaPosition = positionDetails(ascendant);
    return new BirthChartResponse(
        request.dateOfBirth(),
        request.timeOfBirth(),
        new BirthChartResponse.Birthplace(place.label()),
        new BirthChartResponse.Method(
            "D1 / Rāśi", "Lahiri", "Sidereal", "Geocentric", "Whole sign", "Mean lunar node"),
        new BirthChartResponse.Lagna(
            SIGNS.get(lagnaSignIndex), ascendant, lagnaPosition.nakshatra(), lagnaPosition.pada()),
        List.copyOf(houses),
        List.copyOf(points));
  }

  private BirthChartResponse.Point toPoint(
      String name, double longitude, boolean retrograde, int lagnaSignIndex) {
    int sign = signIndex(longitude);
    int house = (sign - lagnaSignIndex + SIGNS.size()) % SIGNS.size() + 1;
    PositionDetails details = positionDetails(longitude);
    return new BirthChartResponse.Point(
        name, SIGNS.get(sign), house, longitude, longitude - sign * 30.0,
        details.nakshatra(), details.pada(), retrograde);
  }

  private PositionDetails positionDetails(double longitude) {
    int nakshatraIndex = Math.min(26, (int) ((longitude + 1e-10) / NAKSHATRA_SIZE));
    double withinNakshatra = longitude - nakshatraIndex * NAKSHATRA_SIZE;
    int pada = Math.min(4, (int) ((withinNakshatra + 1e-10) / PADA_SIZE) + 1);
    return new PositionDetails(NAKSHATRAS.get(nakshatraIndex), pada);
  }

  private static int signIndex(double longitude) {
    return Math.min(11, (int) (longitude / 30.0));
  }

  private static double normalize(double longitude) {
    double normalized = longitude % 360.0;
    return normalized < 0 ? normalized + 360.0 : normalized;
  }

  private record PositionDetails(String nakshatra, int pada) {}
}
