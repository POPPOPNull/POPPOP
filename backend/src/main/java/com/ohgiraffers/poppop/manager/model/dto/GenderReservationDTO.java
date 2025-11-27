package com.ohgiraffers.poppop.manager.model.dto;

import com.ohgiraffers.poppop.jwt.security.JwtTokenProvider;

public class GenderReservationDTO {

    private String gender;   // 'M', 'F'
    private int count;       // 성별 별 예약 건수

    public GenderReservationDTO() {}

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "GenderReservationDTO{" +
                "gender='" + gender + '\'' +
                ", count=" + count +
                '}';
    }
}

