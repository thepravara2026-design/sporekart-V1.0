package com.sporekart.training.internal.listener;

import com.sporekart.training.internal.event.EnrollmentCompletedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Component;

@Component
public class CertificateGenerationListener {

    private static final Logger log = LoggerFactory.getLogger(CertificateGenerationListener.class);

    @ApplicationModuleListener
    public void onEnrollmentCompleted(EnrollmentCompletedEvent event) {
        log.info("Async Listener: Generating OpenPDF certificate for enrollmentId={}, trainee={}",
                event.enrollmentId(), event.traineeName());
        // Async certificate generation logic...
    }
}
