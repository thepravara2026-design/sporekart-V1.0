package com.sporekart.iam;

public enum UserRole {
    BUYER,
    TRAINEE;

    public String getAuthority() {
        return "ROLE_" + name();
    }
}
