package com.astrology.dto;

import java.util.List;

public record PlaceSearchResponse(List<PlaceResult> places) {
  public record PlaceResult(String placeId, String label) {}
}
