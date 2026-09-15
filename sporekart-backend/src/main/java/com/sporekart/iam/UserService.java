package com.sporekart.iam;

import com.sporekart.iam.internal.domain.UserEntity;
import com.sporekart.iam.internal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserEntity findOrCreateUserAndGrantRole(String targetInput, UserRole roleToGrant, String firstName, String lastName) {
        boolean isEmail = targetInput != null && targetInput.contains("@");
        Optional<UserEntity> existingUserOpt = isEmail
                ? userRepository.findByEmail(targetInput)
                : userRepository.findByPhoneNumber(targetInput);

        if (existingUserOpt.isPresent()) {
            UserEntity user = existingUserOpt.get();
            user.addRole(roleToGrant);
            return userRepository.save(user);
        }

        String email = isEmail ? targetInput : "user_" + System.currentTimeMillis() + "@sporekart.com";
        String phone = isEmail ? "+91" + (System.currentTimeMillis() % 10000000000L) : targetInput;

        UserEntity newUser = UserEntity.builder()
                .email(email)
                .phoneNumber(phone)
                .firstName(firstName != null && !firstName.isBlank() ? firstName : "Guest")
                .lastName(lastName != null && !lastName.isBlank() ? lastName : "User")
                .authProvider(isEmail ? UserEntity.AuthProvider.EMAIL_OTP : UserEntity.AuthProvider.PHONE_OTP)
                .isIdentityLocked(true)
                .build();

        newUser.addRole(roleToGrant);
        return userRepository.save(newUser);
    }
}
