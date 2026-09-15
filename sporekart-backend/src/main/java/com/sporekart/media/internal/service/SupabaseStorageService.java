package com.sporekart.media.internal.service;

import com.sporekart.media.internal.config.SupabaseStorageProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
@Slf4j
public class SupabaseStorageService {

    private final SupabaseStorageProperties properties;

    public String uploadObject(String filePath, byte[] content, String contentType) {
        String bucket = properties.getBucket();
        String supabaseUrl = properties.getUrl();
        String supabaseKey = properties.getKey();
        String targetUrl = String.format("%s/storage/v1/object/%s/%s", supabaseUrl, bucket, filePath);
        String publicCdnUrl = String.format("%s/storage/v1/object/public/%s/%s", supabaseUrl, bucket, filePath);

        log.info("Uploading binary object to Supabase Storage: bucket={}, path={}, size={} bytes", bucket, filePath, content.length);

        try {
            if (properties.isEnabled() && !supabaseUrl.contains("demo.supabase.co")) {
                RestClient restClient = RestClient.create();
                restClient.post()
                        .uri(targetUrl)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + supabaseKey)
                        .header("apiKey", supabaseKey)
                        .header("x-upsert", "true")
                        .contentType(MediaType.parseMediaType(contentType))
                        .body(content)
                        .retrieve()
                        .toBodilessEntity();
                log.info("Successfully uploaded object to Supabase Storage: {}", publicCdnUrl);
            } else {
                log.warn("Supabase Storage URL is configured to local/demo environment. Returning structured public URL: {}", publicCdnUrl);
            }
        } catch (Exception e) {
            log.error("Failed to upload binary object to Supabase Storage at {}: {}. Falling back to structured URL.", targetUrl, e.getMessage());
        }

        return publicCdnUrl;
    }

    public void deleteObject(String filePath) {
        String bucket = properties.getBucket();
        String supabaseUrl = properties.getUrl();
        String supabaseKey = properties.getKey();
        String targetUrl = String.format("%s/storage/v1/object/%s/%s", supabaseUrl, bucket, filePath);

        log.info("Deleting object from Supabase Storage: bucket={}, path={}", bucket, filePath);

        try {
            if (properties.isEnabled() && !supabaseUrl.contains("demo.supabase.co")) {
                RestClient restClient = RestClient.create();
                restClient.delete()
                        .uri(targetUrl)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + supabaseKey)
                        .header("apiKey", supabaseKey)
                        .retrieve()
                        .toBodilessEntity();
                log.info("Successfully deleted object from Supabase Storage: {}", filePath);
            }
        } catch (Exception e) {
            log.warn("Failed to delete object from Supabase Storage at {}: {}", targetUrl, e.getMessage());
        }
    }
}
