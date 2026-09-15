package com.sporekart.iam.internal.repository;

import com.sporekart.iam.internal.domain.AdminUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUserEntity, Long> {
    Optional<AdminUserEntity> findByUsername(String username);
    Optional<AdminUserEntity> findByEmail(String email);
}
