package com.astrology.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.astrology.config.CorsConfig;
import com.astrology.service.HealthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(HealthController.class)
@Import({HealthService.class, CorsConfig.class})
@TestPropertySource(properties = {
    "spring.application.name=astrology-sign-finder",
    "app.version=0.1.0-test",
    "app.cors.allowed-origins=http://localhost:8000"
})
class HealthControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void returnsStructuredHealthResponse() throws Exception {
    mockMvc.perform(get("/api/health"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("UP"))
        .andExpect(jsonPath("$.applicationName").value("astrology-sign-finder"))
        .andExpect(jsonPath("$.version").value("0.1.0-test"));
  }

  @Test
  void allowsConfiguredFrontendOrigin() throws Exception {
    mockMvc.perform(options("/api/health")
            .header("Origin", "http://localhost:8000")
            .header("Access-Control-Request-Method", "GET"))
        .andExpect(status().isOk())
        .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:8000"));
  }
}
