package com.sporekart;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.lang.ArchRule;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;
import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

public class ArchitectureBoundaryTest {

    private static JavaClasses importedClasses;

    @BeforeAll
    public static void setUp() {
        importedClasses = new ClassFileImporter().importPackages("com.sporekart");
    }

    @Test
    public void adminControllersShouldBeInAdminPackage() {
        ArchRule rule = classes()
                .that().haveSimpleNameStartingWith("Admin")
                .and().haveSimpleNameEndingWith("Controller")
                .should().resideInAPackage("..admin..");

        rule.check(importedClasses);
    }

    @Test
    public void customerAuthPathShouldNotReferenceAdminUserEntity() {
        ArchRule rule = noClasses()
                .that().resideInAPackage("..iam.internal.controller..")
                .and().haveSimpleName("AuthController")
                .should().dependOnClassesThat().haveSimpleName("AdminUserEntity");

        rule.check(importedClasses);
    }
}
