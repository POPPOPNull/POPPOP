package com.ohgiraffers.poppop.jwt.dto;

public class LoginSuccessInfo {

    private final String principalId;
    private final String role;
    private final String principalType;

    public LoginSuccessInfo(String principalId, String role, String principalType) {
        this.principalId = principalId;
        this.role = role;
        this.principalType = principalType;
    }

    public String getPrincipalId() {
        return principalId;
    }

    public String getRole() {
        return role;
    }

    public String getPrincipalType() {
        return principalType;
    }
}
