package com.astrology.controller;

import com.astrology.dto.BirthChartRequest;
import com.astrology.dto.BirthChartResponse;
import com.astrology.dto.PlaceSearchResponse;
import com.astrology.service.BirthChartService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/v1")
public class BirthChartController {
  private final BirthChartService charts;

  public BirthChartController(BirthChartService charts) {
    this.charts = charts;
  }

  @GetMapping("/places")
  public PlaceSearchResponse searchPlaces(
      @RequestParam @NotBlank @Size(min = 3, max = 120) String query) {
    List<PlaceSearchResponse.PlaceResult> results = charts.searchPlaces(query).stream()
        .map(place -> new PlaceSearchResponse.PlaceResult(place.placeId(), place.label()))
        .toList();
    return new PlaceSearchResponse(results);
  }

  @PostMapping("/charts")
  public BirthChartResponse calculate(@Valid @RequestBody BirthChartRequest request) {
    return charts.calculate(request);
  }
}
