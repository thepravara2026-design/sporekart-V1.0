package com.sporekart.shared.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final RestAuthenticationEntryPoint authenticationEntryPoint;
    private final RestAccessDeniedHandler accessDeniedHandler;
    private final TraceIdFilter traceIdFilter;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler)
            )
            .authorizeHttpRequests(auth -> auth
                // Public Reads (Buyer catalog, Trainee training, FAQs, Reviews, Media)
                .requestMatchers(HttpMethod.GET,
                    "/api/v1/buyer/products/**", "/api/v1/products/**", "/products/**",
                    "/api/v1/buyer/categories/**", "/api/v1/categories/**", "/categories/**",
                    "/api/v1/trainee/training/**", "/api/v1/training/**", "/training/**",
                    "/api/v1/reviews/**", "/reviews/**",
                    "/api/v1/faqs/**", "/faqs/**",
                    "/api/v1/education/**", "/education/**",
                    "/api/v1/media/**", "/media/**"
                ).permitAll()

                // Customer Auth (Buyer & Trainee Auth) & Guest Cart
                .requestMatchers(
                    "/api/v1/buyer/auth/**",
                    "/api/v1/trainee/auth/**",
                    "/api/v1/auth/**",
                    "/auth/**",
                    "/api/v1/buyer/cart/guest/**",
                    "/api/v1/cart/guest/**",
                    "/cart/guest/**"
                ).permitAll()

                // Trainee Course Access
                .requestMatchers("/api/v1/trainee/**").hasAuthority("ROLE_TRAINEE")

                // Buyer Access (Accessible by both ROLE_BUYER and ROLE_TRAINEE so trainees can buy products)
                .requestMatchers("/api/v1/buyer/**", "/api/v1/cart/**", "/api/v1/orders/**").hasAnyAuthority("ROLE_BUYER", "ROLE_TRAINEE")

                // Admin Auth & Isolated Admin Routes
                .requestMatchers("/api/v1/admin/auth/**", "/admin/auth/**").permitAll()
                .requestMatchers("/api/v1/admin/**", "/admin/**").hasAuthority("ROLE_ADMIN")

                // Swagger & System Actuator Endpoints
                .requestMatchers(
                    "/actuator/**",
                    "/h2-console/**",
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html"
                ).permitAll()

                // Any other request requires authentication
                .anyRequest().authenticated()
            )
            .addFilterBefore(traceIdFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Trace-ID", "X-Requested-With"));
        configuration.setExposedHeaders(List.of("X-Trace-ID", "Location"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
