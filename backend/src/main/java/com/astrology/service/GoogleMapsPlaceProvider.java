package com.astrology.service;

import com.astrology.exception.ExternalServiceException;
import com.fasterxml.jackson.databind.JsonNode;
import java.net.URI;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GoogleMapsPlaceProvider implements PlaceProvider {
  private static final String GEOCODING_URL =
      "https://maps.googleapis.com/maps/api/geocode/json";
  private static final String TIME_ZONE_URL =
      "https://maps.googleapis.com/maps/api/timezone/json";

  private final RestClient client;
  private final String apiKey;
  private final String provider;

  public GoogleMapsPlaceProvider(
      RestClient.Builder clientBuilder,
      @Value("${app.location.google-api-key:}") String apiKey,
      @Value("${app.location.provider:}") String provider) {
    this.client = clientBuilder.build();
    this.apiKey = apiKey;
    this.provider = provider;
  }

  @Override
  public List<Place> search(String query) {
    JsonNode response = geocode("address", query);
    String status = response.path("status").asText();
    if ("ZERO_RESULTS".equals(status)) {
      return List.of();
    }
    requireProviderSuccess(status);

    List<Place> places = new ArrayList<>();
    for (JsonNode result : response.path("results")) {
      places.add(toPlace(result));
    }
    return List.copyOf(places);
  }

  @Override
  public Place resolve(String placeId) {
    JsonNode response = geocode("place_id", placeId);
    requireProviderSuccess(response.path("status").asText());
    JsonNode result = response.path("results").path(0);
    return toPlace(result);
  }

  @Override
  public String timeZoneId(Place place, LocalDate birthDate) {
    requireConfigured();
    long timestamp = birthDate.atTime(12, 0).toInstant(ZoneOffset.UTC).getEpochSecond();
    URI uri = UriComponentsBuilder.fromUriString(TIME_ZONE_URL)
        .queryParam("location", place.latitude() + "," + place.longitude())
        .queryParam("timestamp", timestamp)
        .queryParam("key", apiKey)
        .build()
        .encode()
        .toUri();
    JsonNode response = get(uri);
    requireProviderSuccess(response.path("status").asText());
    String zoneId = response.path("timeZoneId").asText();
    if (zoneId.isBlank()) {
      throw new ExternalServiceException("The birthplace time zone could not be resolved.");
    }
    return zoneId;
  }

  private JsonNode geocode(String parameter, String value) {
    requireConfigured();
    URI uri = UriComponentsBuilder.fromUriString(GEOCODING_URL)
        .queryParam(parameter, value)
        .queryParam("key", apiKey)
        .build()
        .encode()
        .toUri();
    return get(uri);
  }

  private JsonNode get(URI uri) {
    try {
      JsonNode response = client.get().uri(uri).retrieve().body(JsonNode.class);
      if (response == null) {
        throw new ExternalServiceException("The configured place provider returned no response.");
      }
      return response;
    } catch (RuntimeException exception) {
      if (exception instanceof ExternalServiceException externalServiceException) {
        throw externalServiceException;
      }
      throw new ExternalServiceException("The configured place provider is unavailable.");
    }
  }

  private Place toPlace(JsonNode result) {
    JsonNode location = result.path("geometry").path("location");
    JsonNode latitude = location.path("lat");
    JsonNode longitude = location.path("lng");
    String placeId = result.path("place_id").asText();
    String label = result.path("formatted_address").asText();
    if (result.isMissingNode() || placeId.isBlank() || label.isBlank()
        || !latitude.isNumber() || !longitude.isNumber()) {
      throw new ExternalServiceException("The selected birthplace could not be resolved.");
    }
    double lat = latitude.asDouble();
    double lon = longitude.asDouble();
    if (!Double.isFinite(lat) || lat < -90 || lat > 90
        || !Double.isFinite(lon) || lon < -180 || lon > 180) {
      throw new ExternalServiceException("The place provider returned invalid coordinates.");
    }
    return new Place(placeId, label, lat, lon);
  }

  private void requireConfigured() {
    if (!"google-maps".equals(provider)) {
      throw new ExternalServiceException(
          "Place lookup is disabled. Configure LOCATION_PROVIDER=google-maps to enable the declared provider.");
    }
    if (apiKey == null || apiKey.isBlank()) {
      throw new ExternalServiceException("Place lookup is not configured. Set GOOGLE_MAPS_API_KEY.");
    }
  }

  private void requireProviderSuccess(String status) {
    if (!"OK".equals(status)) {
      throw new ExternalServiceException("The configured place provider could not complete the request.");
    }
  }
}
