package com.sporekart.media.internal.controller;

import com.sporekart.media.internal.model.MediaAsset;
import com.sporekart.media.internal.service.MediaService;
import com.sporekart.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
@Tag(name = "Canonical Media Storage API", description = "Supabase Storage & PostgreSQL Metadata REST API")
public class MediaController {

    private final MediaService mediaService;

    public record MediaAssetResponseDto(
            Long id,
            String fileName,
            String filePath,
            String publicUrl,
            String bucketName,
            String contentType,
            Long sizeBytes,
            String entityType,
            Long entityId
    ) {
        public static MediaAssetResponseDto fromEntity(MediaAsset asset) {
            return new MediaAssetResponseDto(
                    asset.getId(),
                    asset.getFileName(),
                    asset.getFilePath(),
                    asset.getPublicUrl(),
                    asset.getBucketName(),
                    asset.getContentType(),
                    asset.getSizeBytes(),
                    asset.getEntityType(),
                    asset.getEntityId()
            );
        }
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload Image to Supabase Storage & Save Metadata")
    public ResponseEntity<ApiResponse<MediaAssetResponseDto>> uploadMedia(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "entityType", defaultValue = "GENERAL") String entityType,
            @RequestParam(value = "entityId", required = false) Long entityId,
            HttpServletRequest request
    ) {
        MediaAsset asset = mediaService.uploadMedia(file, entityType, entityId, 1L);
        return ResponseEntity.ok(ApiResponse.success(MediaAssetResponseDto.fromEntity(asset), request.getRequestURI()));
    }

    @GetMapping
    @Operation(summary = "List Media Assets by Entity Type / Entity ID")
    public ResponseEntity<ApiResponse<List<MediaAssetResponseDto>>> getMedia(
            @RequestParam(value = "entityType", required = false) String entityType,
            @RequestParam(value = "entityId", required = false) Long entityId,
            HttpServletRequest request
    ) {
        List<MediaAssetResponseDto> dtos = mediaService.getMediaByEntity(entityType, entityId)
                .stream()
                .map(MediaAssetResponseDto::fromEntity)
                .toList();
        return ResponseEntity.ok(ApiResponse.success(dtos, request.getRequestURI()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Media Asset Details by ID")
    public ResponseEntity<ApiResponse<MediaAssetResponseDto>> getMediaById(
            @PathVariable Long id,
            HttpServletRequest request
    ) {
        MediaAsset asset = mediaService.getMediaById(id);
        return ResponseEntity.ok(ApiResponse.success(MediaAssetResponseDto.fromEntity(asset), request.getRequestURI()));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Media Asset from Supabase Storage & PostgreSQL")
    public ResponseEntity<ApiResponse<String>> deleteMedia(
            @PathVariable Long id,
            HttpServletRequest request
    ) {
        mediaService.deleteMedia(id);
        return ResponseEntity.ok(ApiResponse.success("Media asset ID " + id + " successfully deleted", request.getRequestURI()));
    }
}
