package com.sporekart.media.internal.service;

import com.sporekart.media.internal.config.SupabaseStorageProperties;
import com.sporekart.media.internal.model.MediaAsset;
import com.sporekart.media.internal.repository.MediaAssetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaService {

    private final MediaAssetRepository repository;
    private final SupabaseStorageService supabaseStorageService;
    private final SupabaseStorageProperties properties;

    private static final List<String> ALLOWED_CONTENT_TYPES = List.of(
            "image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"
    );
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    @Transactional
    public MediaAsset uploadMedia(MultipartFile file, String entityType, Long entityId, Long ownerId) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Upload file cannot be empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds 10MB limit");
        }

        String contentType = file.getContentType() != null ? file.getContentType() : "image/jpeg";
        if (!ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException("Unsupported image content type: " + contentType);
        }

        String originalName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "upload.jpg";
        String cleanOriginalName = originalName.replaceAll("[^a-zA-Z0-9._-]", "_");
        String extension = cleanOriginalName.contains(".") ? cleanOriginalName.substring(cleanOriginalName.lastIndexOf(".")) : ".jpg";

        String entityCategory = entityType != null ? entityType.toLowerCase() : "general";
        LocalDate now = LocalDate.now();
        String filePath = String.format("%s/%d/%02d/%s_%s%s",
                entityCategory, now.getYear(), now.getMonthValue(), UUID.randomUUID().toString().substring(0, 8), cleanOriginalName.replace(extension, ""), extension);

        try {
            byte[] fileBytes = file.getBytes();
            String publicUrl = supabaseStorageService.uploadObject(filePath, fileBytes, contentType);

            MediaAsset asset = MediaAsset.builder()
                    .fileName(cleanOriginalName)
                    .filePath(filePath)
                    .publicUrl(publicUrl)
                    .bucketName(properties.getBucket())
                    .contentType(contentType)
                    .sizeBytes(file.getSize())
                    .ownerId(ownerId)
                    .entityType(entityType != null ? entityType.toUpperCase() : "GENERAL")
                    .entityId(entityId)
                    .build();

            MediaAsset saved = repository.save(asset);
            log.info("Saved media asset metadata to PostgreSQL: id={}, url={}", saved.getId(), saved.getPublicUrl());
            return saved;
        } catch (Exception e) {
            log.error("Failed to process media upload for file {}: {}", cleanOriginalName, e.getMessage());
            throw new RuntimeException("Media upload failed: " + e.getMessage(), e);
        }
    }

    public List<MediaAsset> getMediaByEntity(String entityType, Long entityId) {
        if (entityType != null && entityId != null) {
            return repository.findByEntityTypeAndEntityId(entityType.toUpperCase(), entityId);
        } else if (entityType != null) {
            return repository.findByEntityType(entityType.toUpperCase());
        }
        return repository.findAll();
    }

    public MediaAsset getMediaById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Media asset not found with ID: " + id));
    }

    @Transactional
    public void deleteMedia(Long id) {
        MediaAsset asset = getMediaById(id);
        supabaseStorageService.deleteObject(asset.getFilePath());
        repository.delete(asset);
        log.info("Deleted media asset ID {} from PostgreSQL metadata and Supabase Storage", id);
    }
}
