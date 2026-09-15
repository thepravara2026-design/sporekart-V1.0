package com.sporekart.catalog.internal.repository;

import com.sporekart.catalog.internal.domain.GuestCartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GuestCartRepository extends JpaRepository<GuestCartEntity, Long> {
    Optional<GuestCartEntity> findByGuestToken(String guestToken);
}
