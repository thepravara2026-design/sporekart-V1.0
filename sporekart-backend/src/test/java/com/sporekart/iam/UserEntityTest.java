package com.sporekart.iam;

import com.sporekart.iam.internal.domain.UserEntity;
import com.sporekart.iam.UserRole;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class UserEntityTest {

    @Test
    @DisplayName("Verify UserEntity creation and multi-role assignment")
    void testUserEntity_CreationAndMultiRoles() {
        UserEntity user = UserEntity.builder()
                .phoneNumber("+919876543210")
                .email("grower@sporekart.com")
                .firstName("Ramesh")
                .lastName("Kumar")
                .roles(new java.util.HashSet<>(Set.of(UserRole.BUYER)))
                .authProvider(UserEntity.AuthProvider.PHONE_OTP)
                .build();

        user.addRole(UserRole.TRAINEE);

        assertThat(user.getPhoneNumber()).isEqualTo("+919876543210");
        assertThat(user.getEmail()).isEqualTo("grower@sporekart.com");
        assertThat(user.getFirstName()).isEqualTo("Ramesh");
        assertThat(user.getLastName()).isEqualTo("Kumar");
        assertThat(user.getRoles()).containsExactlyInAnyOrder(UserRole.BUYER, UserRole.TRAINEE);
        assertThat(user.getAuthProvider()).isEqualTo(UserEntity.AuthProvider.PHONE_OTP);
        assertThat(user.getIsIdentityLocked()).isTrue();
    }
}
