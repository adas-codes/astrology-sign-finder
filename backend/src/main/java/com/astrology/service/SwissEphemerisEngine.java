package com.astrology.service;

import com.astrology.exception.ExternalServiceException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SwissEphemerisEngine {
  private static final DateTimeFormatter DATE_FORMAT =
      DateTimeFormatter.ofPattern("d.M.uuuu", Locale.ROOT).withZone(ZoneOffset.UTC);
  private static final DateTimeFormatter TIME_FORMAT =
      DateTimeFormatter.ofPattern("HH:mm:ss", Locale.ROOT).withZone(ZoneOffset.UTC);
  private static final Pattern OUTPUT_ROW = Pattern.compile(
      "^\\s*(.*?)\\s+([+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+))"
          + "(?:\\s+([+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)))?.*$");
  private static final Map<String, String> BODY_NAMES = Map.of(
      "sun", "Sun",
      "moon", "Moon",
      "mercury", "Mercury",
      "venus", "Venus",
      "mars", "Mars",
      "jupiter", "Jupiter",
      "saturn", "Saturn",
      "mean node", "Rahu");

  private final String executable;
  private final String ephemerisPath;

  public SwissEphemerisEngine(
      @Value("${app.swisseph.executable:}") String executable,
      @Value("${app.swisseph.ephemeris-path:}") String ephemerisPath) {
    this.executable = executable;
    this.ephemerisPath = ephemerisPath;
  }

  public EphemerisData calculate(Instant instant, double latitude, double longitude) {
    if (executable.isBlank() || ephemerisPath.isBlank()) {
      throw new ExternalServiceException(
          "Swiss Ephemeris is not configured. Set SWISSEPH_EXECUTABLE and SWISSEPH_EPHEMERIS_PATH.");
    }

    List<String> command = new ArrayList<>(List.of(
        executable,
        "-b" + DATE_FORMAT.format(instant),
        "-ut" + TIME_FORMAT.format(instant),
        "-p0123456m",
        "-sid1",
        "-eswe",
        "-fPls",
        "-head",
        "-house" + longitude + "," + latitude + ",W",
        "-edir" + ephemerisPath));
    try {
      Process process = new ProcessBuilder(command).redirectErrorStream(true).start();
      if (!process.waitFor(30, TimeUnit.SECONDS)) {
        process.destroyForcibly();
        throw new ExternalServiceException("Swiss Ephemeris did not finish the chart calculation.");
      }
      String output = new String(process.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
      if (process.exitValue() != 0) {
        throw new ExternalServiceException(
            "Swiss Ephemeris could not calculate this birth chart; verify its data files and date range.");
      }
      return parseOutput(output);
    } catch (IOException exception) {
      throw new ExternalServiceException("Swiss Ephemeris could not be started.");
    } catch (InterruptedException exception) {
      Thread.currentThread().interrupt();
      throw new ExternalServiceException("Swiss Ephemeris calculation was interrupted.");
    }
  }

  static EphemerisData parseOutput(String output) {
    Map<String, BodyPosition> positions = new java.util.LinkedHashMap<>();
    Double ascendant = null;
    for (String line : output.lines().toList()) {
      Matcher matcher = OUTPUT_ROW.matcher(line);
      if (!matcher.matches()) {
        continue;
      }
      String label = matcher.group(1).trim().toLowerCase(Locale.ROOT);
      double longitude;
      double speed;
      try {
        longitude = Double.parseDouble(matcher.group(2));
        if (!Double.isFinite(longitude)) {
          continue;
        }
        speed = matcher.group(3) == null ? 0 : Double.parseDouble(matcher.group(3));
        if (!Double.isFinite(speed)) {
          continue;
        }
      } catch (NumberFormatException exception) {
        continue;
      }
      if ("asc".equals(label) || "ascendant".equals(label)) {
        ascendant = normalize(longitude);
      } else {
        String bodyName = BODY_NAMES.get(label);
        if (bodyName != null && matcher.group(3) != null) {
          positions.put(bodyName, new BodyPosition(bodyName, normalize(longitude), speed < 0));
        }
      }
    }

    if (ascendant == null || !positions.keySet().containsAll(BODY_NAMES.values())) {
      throw new ExternalServiceException(
          "Swiss Ephemeris returned an incomplete chart; verify the configured engine version.");
    }
    return new EphemerisData(ascendant, List.copyOf(positions.values()));
  }

  static double normalize(double longitude) {
    double result = longitude % 360.0;
    return result < 0 ? result + 360.0 : result;
  }

  public record BodyPosition(String name, double longitude, boolean retrograde) {}

  public record EphemerisData(double ascendant, List<BodyPosition> bodies) {}
}
