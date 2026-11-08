package com.astrology.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.astrology.exception.ExternalServiceException;
import org.springframework.http.HttpStatus;
import org.junit.jupiter.api.Test;

class SwissEphemerisEngineTest {
  @Test
  void parsesSwissEphemerisPlanetAndAscendantOutput() {
    String output = """
        Sun 10.000000 0.900000
        Moon 20.000000 13.000000
        Mercury 30.000000 -0.200000
        Venus 40.000000 1.100000
        Mars 50.000000 0.500000
        Jupiter 60.000000 -0.050000
        Saturn 70.000000 0.020000
        Mean Node 80.000000 -0.052000
        Asc 90.000000
        """;

    SwissEphemerisEngine.EphemerisData result = SwissEphemerisEngine.parseOutput(output);

    assertEquals(90, result.ascendant());
    assertEquals(8, result.bodies().size());
    assertEquals("Mercury", result.bodies().get(2).name());
    assertEquals(true, result.bodies().get(2).retrograde());
    assertEquals("Rahu", result.bodies().get(7).name());
    assertEquals(true, result.bodies().get(7).retrograde());
  }

  @Test
  void doesNotAcceptIncompleteOutputAsSuccessfulCalculation() {
    assertThrows(ExternalServiceException.class, () ->
        SwissEphemerisEngine.parseOutput("Sun 10.0 0.9\nAsc 90.0\n"));
  }

  @Test
  void reportsMissingExternalEngineConfigurationWithoutReturningChartData() {
    SwissEphemerisEngine engine = new SwissEphemerisEngine("", "");

    ExternalServiceException error = assertThrows(ExternalServiceException.class, () ->
        engine.calculate(java.time.Instant.parse("2000-01-01T00:00:00Z"), 0, 0));

    assertEquals(HttpStatus.SERVICE_UNAVAILABLE, error.getStatus());
  }
}
