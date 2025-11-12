package com.ohgiraffers.poppop.jwt.dto;

public class LoginRequest {

    private String id;
    private String password;

    public LoginRequest() {}

    public LoginRequest(String id, String password) {
        this.id = id;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "LoginRequest{" +
                "id='" + id + '\'' +
                ", pwd='" + password + '\'' +
                '}';
    }
}
