package com.astrology.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record BirthChartResponse(
    LocalDate birthDate,
    LocalTime birthTime,
    Birthplace birthplace,
    Method method,
    Lagna lagna,
    List<House> houses,
    List<Point> points) {

  public record Birthplace(String label) {}

  public record Method(
      String chart,
      String ayanamsa,
      String zodiac,
      String positionFrame,
      String houseSystem,
      String lunarNode) {}

  public record Lagna(String sign, double longitude, String nakshatra, int pada) {}

  public record House(int house, String sign) {}

  public record Point(
      String name,
      String sign,
      int house,
      double longitude,
      double longitudeInSign,
      String nakshatra,
      int pada,
      boolean isRetrograde) {}
}
