package com.sporekart.iam;

import com.sporekart.iam.internal.domain.UserEntity;
import com.sporekart.shared.exception.ImmutableAttributeViolationException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class UserEntityTest {

    @Test
    @DisplayName("Verify UserEntity creation and default field state")
    void testUserEntity_CreationAndDefaults() {
        UserEntity user = UserEntity.builder()
                .phoneNumber("+919876543210")
                .email("grower@sporekart.com")
                .firstName("Ramesh")
                .lastName("Kumar")
                .role(UserEntity.UserRole.ROLE_BUYER)
                .authProvider(UserEntity.AuthProvider.PHONE_OTP)
                .build();

        assertThat(user.getPhoneNumber()).isEqualTo("+919876543210");
        assertThat(user.getEmail()).isEqualTo("grower@sporekart.com");
        assertThat(user.getFirstName()).isEqualTo("Ramesh");
        assertThat(user.getLastName()).isEqualTo("Kumar");
        assertThat(user.getRole()).isEqualTo(UserEntity.UserRole.ROLE_BUYER);
        assertThat(user.getAuthProvider()).isEqualTo(UserEntity.AuthProvider.PHONE_OTP);
        assertThat(user.getIsIdentityLocked()).isTrue();
    }
}
