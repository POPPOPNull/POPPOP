package com.ohgiraffers.poppop.auth.model.dto;

import java.time.LocalDateTime;

public class RefreshToken {

    private int id;
    private String principalId;
    private String principalType;
    private String token;
    private LocalDateTime expiryDate;

    public RefreshToken() {}

    public RefreshToken(int id, String principalId, String principalType, String token, LocalDateTime expiryDate) {
        this.id = id;
        this.principalId = principalId;
        this.principalType = principalType;
        this.token = token;
        this.expiryDate = expiryDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPrincipalId() {
        return principalId;
    }

    public void setPrincipalId(String principalId) {
        this.principalId = principalId;
    }

    public String getPrincipalType() {
        return principalType;
    }

    public void setPrincipalType(String principalType) {
        this.principalType = principalType;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }

    @Override
    public String toString() {
        return "RefreshToken{" +
                "id=" + id +
                ", principalId='" + principalId + '\'' +
                ", principalType='" + principalType + '\'' +
                ", token='" + token + '\'' +
                ", expiryDate=" + expiryDate +
                '}';
    }
}
