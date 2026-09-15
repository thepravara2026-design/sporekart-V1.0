package com.sporekart.media.internal.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "media_assets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "file_path", nullable = false, unique = true)
    private String filePath;

    @Column(name = "public_url", nullable = false)
    private String publicUrl;

    @Column(name = "bucket_name", nullable = false)
    private String bucketName;

    @Column(name = "content_type", nullable = false)
    private String contentType;

    @Column(name = "size_bytes", nullable = false)
    private Long sizeBytes;

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "entity_type")
    private String entityType; // PRODUCT, CATEGORY, TRAINING, ARTICLE, USER_AVATAR, BANNER, GENERAL

    @Column(name = "entity_id")
    private Long entityId;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private OffsetDateTime updatedAt;
}
