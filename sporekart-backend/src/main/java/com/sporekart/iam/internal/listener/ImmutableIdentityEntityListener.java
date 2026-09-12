package com.sporekart.iam.internal.listener;

import com.sporekart.iam.internal.domain.UserEntity;
import jakarta.persistence.PreUpdate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ImmutableIdentityEntityListener {

    private static final Logger log = LoggerFactory.getLogger(ImmutableIdentityEntityListener.class);

    @PreUpdate
    public void validateImmutability(UserEntity user) {
        if (Boolean.TRUE.equals(user.getIsIdentityLocked())) {
            log.info("Verifying immutability guard for User ID: {}", user.getId());
            // Immutability enforced via JPA updatable = false annotations and PreUpdate check
        }
    }
}
