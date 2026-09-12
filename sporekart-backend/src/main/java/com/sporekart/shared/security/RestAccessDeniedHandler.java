package com.sporekart.shared.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sporekart.shared.dto.ProblemDetailsResponse;
import com.sporekart.shared.exception.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;

@Component
public class RestAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        String traceId = MDC.get("traceId") != null ? MDC.get("traceId") : UUID.randomUUID().toString();

        ProblemDetailsResponse problem = ProblemDetailsResponse.builder()
                .type("https://sporekart.com/errors/forbidden")
                .title("Access Denied")
                .status(HttpServletResponse.SC_FORBIDDEN)
                .detail("You do not have sufficient permissions (assigned roles) to execute this operation.")
                .instance(request.getRequestURI())
                .code(ErrorCode.UNAUTHORIZED_ACCESS.getCode())
                .traceId(traceId)
                .build();

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType(MediaType.APPLICATION_PROBLEM_JSON_VALUE);
        objectMapper.writeValue(response.getOutputStream(), problem);
    }
}
