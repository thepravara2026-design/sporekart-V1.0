package com.sporekart.catalog.internal.service;

import com.sporekart.catalog.internal.domain.GuestCartEntity;
import com.sporekart.catalog.internal.repository.GuestCartRepository;
import com.sporekart.iam.UserRole;
import com.sporekart.iam.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class GuestCartService {

    private final GuestCartRepository guestCartRepository;
    private final UserService userService;

    public GuestCartService(GuestCartRepository guestCartRepository, UserService userService) {
        this.guestCartRepository = guestCartRepository;
        this.userService = userService;
    }

    @Transactional
    public GuestCartEntity getOrCreateGuestCart(String guestToken, String itemsJson) {
        if (guestToken != null && !guestToken.isBlank()) {
            Optional<GuestCartEntity> cartOpt = guestCartRepository.findByGuestToken(guestToken);
            if (cartOpt.isPresent()) {
                GuestCartEntity cart = cartOpt.get();
                if (itemsJson != null) {
                    cart.setItemsJson(itemsJson);
                    cart.setUpdatedAt(ZonedDateTime.now());
                }
                return guestCartRepository.save(cart);
            }
        }

        String newToken = "guest_token_" + UUID.randomUUID().toString();
        GuestCartEntity newCart = GuestCartEntity.builder()
                .guestToken(newToken)
                .itemsJson(itemsJson != null ? itemsJson : "[]")
                .expiresAt(ZonedDateTime.now().plusDays(7))
                .build();

        return guestCartRepository.save(newCart);
    }

    @Transactional
    public String mergeGuestCartOnAuth(String guestToken, String userIdentifier, String firstName, String lastName) {
        // Single atomic transaction granting BUYER role and merging guest cart
        userService.findOrCreateUserAndGrantRole(userIdentifier, UserRole.BUYER, firstName, lastName);

        if (guestToken != null && !guestToken.isBlank()) {
            Optional<GuestCartEntity> cartOpt = guestCartRepository.findByGuestToken(guestToken);
            if (cartOpt.isPresent()) {
                GuestCartEntity cart = cartOpt.get();
                String items = cart.getItemsJson();
                guestCartRepository.delete(cart); // Clean up guest cart after merge
                return items;
            }
        }
        return "[]";
    }
}
