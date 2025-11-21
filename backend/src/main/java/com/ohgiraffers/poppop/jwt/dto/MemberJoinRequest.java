package com.ohgiraffers.poppop.jwt.dto;

import java.time.LocalDate;
import java.util.Date;

public class MemberJoinRequest {

    private String id;
    private String password;
    private String name;
    private String phone;
    private String role;
    private String email;
    private String businessNo;
    private String gender;
    private LocalDate birthdate;

    public MemberJoinRequest() {}

    public MemberJoinRequest(String id, String password, String name, String phone, String role, String email, String businessNo, String gender, LocalDate birthdate) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.role = role;
        this.email = email;
        this.businessNo = businessNo;
        this.gender = gender;
        this.birthdate = birthdate;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBusinessNo() {
        return businessNo;
    }

    public void setBusinessNo(String businessNo) {
        this.businessNo = businessNo;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    @Override
    public String toString() {
        return "MemberJoinRequest{" +
                "id='" + id + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", role='" + role + '\'' +
                ", email='" + email + '\'' +
                ", businessNo='" + businessNo + '\'' +
                ", gender='" + gender + '\'' +
                ", birthdate=" + birthdate +
                '}';
    }
}
