package com.astrology.service;

import com.astrology.dto.HealthResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class HealthService {

  private final String applicationName;
  private final String version;

  public HealthService(
      @Value("${spring.application.name}") String applicationName,
      @Value("${app.version}") String version) {
    this.applicationName = applicationName;
    this.version = version;
  }

  public HealthResponse getStatus() {
    return new HealthResponse("UP", applicationName, version);
  }
}
