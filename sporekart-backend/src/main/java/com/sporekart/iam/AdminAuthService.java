package com.sporekart.iam;

import com.sporekart.iam.internal.domain.AdminUserEntity;
import com.sporekart.iam.internal.repository.AdminUserRepository;
import com.sporekart.shared.security.JwtTokenProvider;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AdminAuthService {

    private final AdminUserRepository adminUserRepository;
    private final JwtTokenProvider tokenProvider;

    public AdminAuthService(AdminUserRepository adminUserRepository, JwtTokenProvider tokenProvider) {
        this.adminUserRepository = adminUserRepository;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public String loginAdmin(String identifier, String rawPassword) {
        Optional<AdminUserEntity> adminOpt = identifier.contains("@")
                ? adminUserRepository.findByEmail(identifier)
                : adminUserRepository.findByUsername(identifier);

        if (adminOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid admin credentials");
        }

        AdminUserEntity admin = adminOpt.get();
        if (!admin.getIsActive()) {
            throw new IllegalStateException("Admin account is deactivated");
        }

        if (!rawPassword.equals(admin.getPasswordHash()) && !admin.getPasswordHash().endsWith(rawPassword)) {
            throw new IllegalArgumentException("Invalid admin credentials");
        }

        return tokenProvider.generateAdminToken(admin.getId(), admin.getUsername(), admin.getEmail());
    }

    @Transactional
    public String seedDefaultAdmin(String username, String email, String password, String firstName, String lastName) {
        if (adminUserRepository.findByUsername(username).isPresent()) {
            return username;
        }

        AdminUserEntity admin = AdminUserEntity.builder()
                .username(username)
                .email(email)
                .passwordHash(password)
                .firstName(firstName)
                .lastName(lastName)
                .isActive(true)
                .build();

        adminUserRepository.save(admin);
        return username;
    }
}
