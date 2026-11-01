package com.astrology.exception;

import com.astrology.dto.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import java.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiErrorResponse> handleValidation(
      MethodArgumentNotValidException exception,
      HttpServletRequest request) {
    String message = exception.getBindingResult().getFieldErrors().stream()
        .map(error -> error.getField() + ": " + error.getDefaultMessage())
        .findFirst()
        .orElse("Request validation failed");
    return errorResponse(HttpStatus.BAD_REQUEST, message, request);
  }

  @ExceptionHandler({ConstraintViolationException.class, HttpMessageNotReadableException.class})
  public ResponseEntity<ApiErrorResponse> handleBadRequest(
      Exception exception,
      HttpServletRequest request) {
    return errorResponse(HttpStatus.BAD_REQUEST, "The request is invalid", request);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiErrorResponse> handleUnexpected(
      Exception exception,
      HttpServletRequest request) {
    LOGGER.error("Unexpected error handling {}", request.getRequestURI(), exception);
    return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred",
        request);
  }

  private ResponseEntity<ApiErrorResponse> errorResponse(
      HttpStatus status,
      String message,
      HttpServletRequest request) {
    ApiErrorResponse body = new ApiErrorResponse(
        Instant.now(),
        status.value(),
        status.getReasonPhrase(),
        message,
        request.getRequestURI());
    return ResponseEntity.status(status).body(body);
  }
}
