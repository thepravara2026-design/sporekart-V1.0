package com.sporekart.catalog;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class ReviewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("GET /reviews should return list of verified grower reviews with HTTP 200 OK")
    void testGetAllReviews_ReturnsSuccessResponse() throws Exception {
        mockMvc.perform(get("/reviews")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$.data[0].reviewerName", notNullValue()))
                .andExpect(jsonPath("$.data[0].rating", is(5)))
                .andExpect(jsonPath("$.data[0].isVerifiedGrower", is(true)));
    }
}
