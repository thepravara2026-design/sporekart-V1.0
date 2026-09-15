package com.sporekart.iam.internal.domain;

import com.sporekart.iam.UserRole;
import com.sporekart.iam.internal.listener.ImmutableIdentityEntityListener;
import jakarta.persistence.*;
import lombok.*;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

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

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Set<UserRole> roles = new HashSet<>();

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

    public void addRole(UserRole role) {
        if (this.roles == null) {
            this.roles = new HashSet<>();
        }
        this.roles.add(role);
    }

    public enum AuthProvider {
        GOOGLE_OAUTH,
        PHONE_OTP,
        EMAIL_OTP
    }
}
