package com.sporekart.iam;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sporekart.iam.internal.controller.AuthController;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("POST /auth/otp/send should accept valid phone target and return HTTP 200 OK")
    void testSendOtp_ValidPhone_ReturnsSuccess() throws Exception {
        AuthController.SendOtpRequest request = new AuthController.SendOtpRequest("+919876543210", "PHONE");

        mockMvc.perform(post("/auth/otp/send")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", containsString("OTP dispatched successfully")));
    }

    @Test
    @DisplayName("POST /auth/otp/verify should authenticate and return tokens")
    void testVerifyOtp_ValidRequest_ReturnsTokens() throws Exception {
        AuthController.VerifyOtpRequest request = new AuthController.VerifyOtpRequest("+919876543210", "123456", "Ramesh", "Kumar", "ROLE_BUYER");

        mockMvc.perform(post("/auth/otp/verify")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.accessToken", notNullValue()))
                .andExpect(jsonPath("$.data.tokenType", is("Bearer")));
    }

    @Test
    @DisplayName("POST /auth/google should authenticate Google token and return AuthResponseDto")
    void testAuthenticateGoogle_ReturnsSuccess() throws Exception {
        AuthController.GoogleAuthRequest request = new AuthController.GoogleAuthRequest("valid_google_id_token_xyz", "ROLE_BUYER");

        mockMvc.perform(post("/auth/google")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.accessToken", notNullValue()))
                .andExpect(jsonPath("$.data.email", is("google.user@sporekart.com")));
    }
}
