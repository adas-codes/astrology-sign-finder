package com.astrology.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.astrology.config.CorsConfig;
import com.astrology.dto.BirthChartResponse;
import com.astrology.exception.ExternalServiceException;
import com.astrology.exception.GlobalExceptionHandler;
import com.astrology.service.BirthChartService;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(BirthChartController.class)
@Import({CorsConfig.class, GlobalExceptionHandler.class})
@TestPropertySource(properties = "app.cors.allowed-origins=http://localhost:8000")
class BirthChartControllerTest {
  @Autowired private MockMvc mockMvc;
  @MockitoBean private BirthChartService charts;

  @Test
  void returnsVersionedVedicChartStructure() throws Exception {
    when(charts.calculate(any())).thenReturn(chart());

    mockMvc.perform(post("/api/v1/charts")
            .contentType("application/json")
            .content("""
                {
                  "dateOfBirth":"1994-06-15",
                  "timeOfBirth":"08:42:00",
                  "birthplace":{"placeId":"google-place-id"}
                }
                """))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.method.chart").value("D1 / Rāśi"))
        .andExpect(jsonPath("$.method.ayanamsa").value("Lahiri"))
        .andExpect(jsonPath("$.method.houseSystem").value("Whole sign"))
        .andExpect(jsonPath("$.houses.length()").value(12))
        .andExpect(jsonPath("$.points.length()").value(10))
        .andExpect(jsonPath("$.points[0].name").value("Lagna"))
        .andExpect(jsonPath("$.points[9].name").value("Ketu"));
  }

  @Test
  void validatesRequiredBirthDataBeforeCalculation() throws Exception {
    mockMvc.perform(post("/api/v1/charts")
            .contentType("application/json")
            .content("""
                {
                  "dateOfBirth":"1994-06-15",
                  "timeOfBirth":"08:42:00",
                  "birthplace":{"placeId":" "}
                }
                """))
        .andExpect(status().isBadRequest());
    verifyNoInteractions(charts);
  }

  @Test
  void surfacesMissingProviderConfigurationAsServiceUnavailable() throws Exception {
    when(charts.searchPlaces("Pune")).thenThrow(
        new ExternalServiceException("Place lookup is disabled; configure a provider."));

    mockMvc.perform(get("/api/v1/places").param("query", "Pune"))
        .andExpect(status().isServiceUnavailable())
        .andExpect(jsonPath("$.message").value("Place lookup is disabled; configure a provider."));
  }

  private BirthChartResponse chart() {
    return new BirthChartResponse(
        LocalDate.of(1994, 6, 15),
        LocalTime.of(8, 42),
        new BirthChartResponse.Birthplace("Pune, India"),
        new BirthChartResponse.Method(
            "D1 / Rāśi", "Lahiri", "Sidereal", "Geocentric", "Whole sign", "Mean lunar node"),
        new BirthChartResponse.Lagna("Pisces", 350, "Revati", 4),
        java.util.stream.IntStream.rangeClosed(1, 12)
            .mapToObj(index -> new BirthChartResponse.House(index, "Pisces"))
            .toList(),
        List.of(
            point("Lagna"), point("Sun"), point("Moon"), point("Mercury"), point("Venus"),
            point("Mars"), point("Jupiter"), point("Saturn"), point("Rahu"), point("Ketu")));
  }

  private BirthChartResponse.Point point(String name) {
    return new BirthChartResponse.Point(name, "Aries", 2, 20, 20, "Bharani", 2, false);
  }
}
