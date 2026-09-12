package com.sporekart.iam.internal.domain;

import com.sporekart.iam.internal.listener.ImmutableIdentityEntityListener;
import jakarta.persistence.*;
import lombok.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "users")
@EntityListeners(ImmutableIdentityEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, updatable = false)
    private String email;

    @Column(name = "phone_number", unique = true, updatable = false)
    private String phoneNumber;

    @Column(name = "first_name", nullable = false, updatable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false, updatable = false)
    private String lastName;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "auth_provider", nullable = false)
    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    @Column(name = "is_identity_locked", nullable = false)
    @Builder.Default
    private Boolean isIdentityLocked = true;

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private ZonedDateTime createdAt = ZonedDateTime.now();

    @Column(name = "updated_at")
    @Builder.Default
    private ZonedDateTime updatedAt = ZonedDateTime.now();

    public enum UserRole {
        ROLE_ADMIN,
        ROLE_BUYER,
        ROLE_TRAINEE
    }

    public enum AuthProvider {
        GOOGLE_OAUTH,
        PHONE_OTP,
        EMAIL_OTP
    }
}
