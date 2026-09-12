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
class FaqControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("GET /faqs should return list of FAQs with HTTP 200 OK")
    void testGetAllFaqs_ReturnsSuccessResponse() throws Exception {
        mockMvc.perform(get("/faqs")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$.data[0].question", notNullValue()))
                .andExpect(jsonPath("$.data[0].answer", notNullValue()))
                .andExpect(jsonPath("$.data[0].category", notNullValue()));
    }

    @Test
    @DisplayName("GET /faqs should match expected content type JSON")
    void testGetAllFaqs_ReturnsJsonContentType() throws Exception {
        mockMvc.perform(get("/faqs"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }
}
