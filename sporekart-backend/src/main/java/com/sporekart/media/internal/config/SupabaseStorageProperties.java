package com.sporekart.media.internal.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "sporekart.supabase")
@Getter
@Setter
public class SupabaseStorageProperties {
    private String url = "https://demo.supabase.co";
    private String key = "demo_supabase_api_key_sporekart_2026";
    private String bucket = "sporekart-media";
    private boolean enabled = true;
}
