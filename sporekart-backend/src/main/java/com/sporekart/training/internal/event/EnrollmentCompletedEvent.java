package com.sporekart.training.internal.event;

public record EnrollmentCompletedEvent(
        Long enrollmentId,
        Long userId,
        Long batchId,
        String traineeName,
        String courseName
) {}
