package com.sporekart.shared.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private boolean success;
    private T data;
    private ApiError error;
    @Builder.Default
    private Instant timestamp = Instant.now();
    private String path;

    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> success(T data, String path) {
        return ApiResponse.<T>builder()
                .success(true)
                .data(data)
                .path(path)
                .build();
    }

    public static <T> ApiResponse<T> error(String code, String message, String path) {
        return ApiResponse.<T>builder()
                .success(false)
                .error(new ApiError(code, message))
                .path(path)
                .build();
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ApiError {
        private String code;
        private String message;
    }
}
