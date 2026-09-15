package com.sporekart.iam.internal.repository;

import com.sporekart.iam.internal.domain.OtpVerificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpVerificationRepository extends JpaRepository<OtpVerificationEntity, Long> {
    Optional<OtpVerificationEntity> findFirstByTargetAndIsVerifiedFalseOrderByCreatedAtDesc(String target);
}
