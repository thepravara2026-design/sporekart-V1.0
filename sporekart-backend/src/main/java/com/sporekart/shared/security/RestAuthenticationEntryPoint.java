package com.sporekart.shared.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sporekart.shared.dto.ProblemDetailsResponse;
import com.sporekart.shared.exception.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;

@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper = new ObjectMapper().findAndRegisterModules();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        String traceId = MDC.get("traceId") != null ? MDC.get("traceId") : UUID.randomUUID().toString();

        ProblemDetailsResponse problem = ProblemDetailsResponse.builder()
                .type("https://sporekart.com/errors/unauthorized")
                .title("Authentication Required")
                .status(HttpServletResponse.SC_UNAUTHORIZED)
                .detail("Full authentication is required to access this resource. Please provide a valid Bearer JWT or OTP.")
                .instance(request.getRequestURI())
                .code(ErrorCode.UNAUTHORIZED_ACCESS.getCode())
                .traceId(traceId)
                .build();

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_PROBLEM_JSON_VALUE);
        objectMapper.writeValue(response.getOutputStream(), problem);
    }
}
