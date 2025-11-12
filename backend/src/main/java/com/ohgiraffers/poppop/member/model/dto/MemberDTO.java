package com.ohgiraffers.poppop.member.model.dto;

import java.util.Date;

public class MemberDTO {

    private String id;
<<<<<<< HEAD
    private String pwd;
=======
    private String password;
>>>>>>> JWT/master
    private String name;
    private String phone;
    private String role;
    private String email;
    private String businessNo;
    private String gender;
    private Date birthDate;

    public MemberDTO() {}

<<<<<<< HEAD
    public MemberDTO(String id, String pwd, String name, String phone, String role, String email, String businessNo, String gender, Date birthDate) {
        this.id = id;
        this.pwd = pwd;
=======
    public MemberDTO(String id, String password, String name, String phone, String role, String email, String businessNo, String gender, Date birthDate) {
        this.id = id;
        this.password = password;
>>>>>>> JWT/master
        this.name = name;
        this.phone = phone;
        this.role = role;
        this.email = email;
        this.businessNo = businessNo;
        this.gender = gender;
        this.birthDate = birthDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

<<<<<<< HEAD
    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
=======
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
>>>>>>> JWT/master
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

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    @Override
    public String toString() {
        return "MemberDTO{" +
                "id='" + id + '\'' +
<<<<<<< HEAD
                ", pwd='" + pwd + '\'' +
=======
                ", password='" + password + '\'' +
>>>>>>> JWT/master
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", role='" + role + '\'' +
                ", email='" + email + '\'' +
                ", businessNo='" + businessNo + '\'' +
                ", gender='" + gender + '\'' +
                ", birthDate=" + birthDate +
                '}';
    }
}
