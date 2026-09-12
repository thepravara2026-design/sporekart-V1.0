package com.sporekart;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.modulith.core.ApplicationModules;

class ApplicationModulesTest {

    @Test
    @DisplayName("Verify Spring Modulith modular architecture rules and dependencies")
    void verifyModularStructure() {
        ApplicationModules modules = ApplicationModules.of(SporekartApplication.class);
        modules.verify();
    }
}
