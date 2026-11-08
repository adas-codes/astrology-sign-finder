package com.astrology.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;

public record BirthChartRequest(
    @NotNull LocalDate dateOfBirth,
    @NotNull LocalTime timeOfBirth,
    @NotNull @Valid Birthplace birthplace) {

  public record Birthplace(
      @NotBlank @Size(max = 300) String placeId) {}
}
