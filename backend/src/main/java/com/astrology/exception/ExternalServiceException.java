package com.astrology.exception;

import org.springframework.http.HttpStatus;

public class ExternalServiceException extends ApiProblemException {
  public ExternalServiceException(String message) {
    super(HttpStatus.SERVICE_UNAVAILABLE, message);
  }
}
