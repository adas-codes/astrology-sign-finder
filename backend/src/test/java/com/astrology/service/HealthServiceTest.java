package com.astrology.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.astrology.dto.HealthResponse;
import org.junit.jupiter.api.Test;

class HealthServiceTest {

  @Test
  void returnsApplicationHealthAndVersion() {
    HealthService healthService = new HealthService("vedic-birth-chart", "0.1.0-SNAPSHOT");

    HealthResponse response = healthService.getStatus();

    assertThat(response.status()).isEqualTo("UP");
    assertThat(response.applicationName()).isEqualTo("vedic-birth-chart");
    assertThat(response.version()).isEqualTo("0.1.0-SNAPSHOT");
  }
}
