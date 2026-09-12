package com.sporekart;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@SpringBootTest
@ActiveProfiles("dev")
class SporekartApplicationTest {

    @Test
    @DisplayName("Verify Spring Boot application context loads successfully")
    void contextLoads() {
        assertDoesNotThrow(() -> {
            // Context load verification
        });
    }
}
