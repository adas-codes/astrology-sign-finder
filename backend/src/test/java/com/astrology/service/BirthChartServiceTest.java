package com.astrology.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.astrology.dto.BirthChartRequest;
import com.astrology.dto.BirthChartResponse;
import com.astrology.exception.ApiProblemException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class BirthChartServiceTest {
  @Mock private PlaceProvider places;
  @Mock private SwissEphemerisEngine ephemeris;

  private BirthChartService service;

  @BeforeEach
  void setUp() {
    service = new BirthChartService(places, ephemeris);
  }

  @Test
  void calculatesNineGrahasLagnaWholeSignHousesAndNakshatraPada() {
    LocalDate date = LocalDate.of(1994, 6, 15);
    PlaceProvider.Place place = new PlaceProvider.Place("place-1", "Pune, India", 18.52, 73.85);
    when(places.resolve("place-1")).thenReturn(place);
    when(places.timeZoneId(place, date)).thenReturn("Asia/Kolkata");
    when(ephemeris.calculate(org.mockito.ArgumentMatchers.any(), org.mockito.ArgumentMatchers.eq(18.52),
        org.mockito.ArgumentMatchers.eq(73.85))).thenReturn(new SwissEphemerisEngine.EphemerisData(
            359.999,
            List.of(
                new SwissEphemerisEngine.BodyPosition("Sun", 0, false),
                new SwissEphemerisEngine.BodyPosition("Moon", 30, false),
                new SwissEphemerisEngine.BodyPosition("Mercury", 60, true),
                new SwissEphemerisEngine.BodyPosition("Venus", 90, false),
                new SwissEphemerisEngine.BodyPosition("Mars", 120, false),
                new SwissEphemerisEngine.BodyPosition("Jupiter", 150, false),
                new SwissEphemerisEngine.BodyPosition("Saturn", 180, false),
                new SwissEphemerisEngine.BodyPosition("Rahu", 210, true))));

    BirthChartResponse chart = service.calculate(request(date, LocalTime.of(8, 42), "place-1"));

    assertEquals("Lahiri", chart.method().ayanamsa());
    assertEquals("Whole sign", chart.method().houseSystem());
    assertEquals("Pisces", chart.lagna().sign());
    assertEquals(12, chart.houses().size());
    assertEquals("Pisces", chart.houses().get(0).sign());
    assertEquals("Aries", chart.houses().get(1).sign());
    assertEquals(10, chart.points().size());
    assertEquals("Lagna", chart.points().get(0).name());
    assertEquals("Aries", chart.points().get(1).sign());
    assertEquals(2, chart.points().get(1).house());
    assertEquals("Krittika", chart.points().get(2).nakshatra());
    assertEquals(2, chart.points().get(2).pada());
    assertEquals("Rahu", chart.points().get(8).name());
    assertEquals("Ketu", chart.points().get(9).name());
    assertEquals("Taurus", chart.points().get(9).sign());
    assertEquals(3, chart.points().get(9).house());
  }

  @Test
  void rejectsNonexistentAndAmbiguousLocalTimesInsteadOfChoosingAnOffset() {
    PlaceProvider.Place place = new PlaceProvider.Place("place-1", "New York", 40.7, -74.0);
    when(places.resolve("place-1")).thenReturn(place);
    when(places.timeZoneId(place, LocalDate.of(2024, 3, 10))).thenReturn("America/New_York");
    when(places.timeZoneId(place, LocalDate.of(2024, 11, 3))).thenReturn("America/New_York");

    assertThrows(ApiProblemException.class, () -> service.calculate(
        request(LocalDate.of(2024, 3, 10), LocalTime.of(2, 30), "place-1")));
    assertThrows(ApiProblemException.class, () -> service.calculate(
        request(LocalDate.of(2024, 11, 3), LocalTime.of(1, 30), "place-1")));
    verify(ephemeris, org.mockito.Mockito.never())
        .calculate(org.mockito.ArgumentMatchers.any(), org.mockito.ArgumentMatchers.anyDouble(),
            org.mockito.ArgumentMatchers.anyDouble());
  }

  private BirthChartRequest request(LocalDate date, LocalTime time, String placeId) {
    return new BirthChartRequest(date, time, new BirthChartRequest.Birthplace(placeId));
  }
}
