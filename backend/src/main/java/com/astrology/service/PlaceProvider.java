package com.astrology.service;

import java.time.LocalDate;
import java.util.List;

public interface PlaceProvider {
  List<Place> search(String query);

  Place resolve(String placeId);

  String timeZoneId(Place place, LocalDate birthDate);

  record Place(String placeId, String label, double latitude, double longitude) {}
}
