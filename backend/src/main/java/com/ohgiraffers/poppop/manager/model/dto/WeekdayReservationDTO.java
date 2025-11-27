package com.ohgiraffers.poppop.manager.model.dto;

public class WeekdayReservationDTO {

    private String dayOfWeek;       // "월", "화", ...
    private int reservationCount;   // 예약 수

    public WeekdayReservationDTO() {}

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public int getReservationCount() {
        return reservationCount;
    }

    public void setReservationCount(int reservationCount) {
        this.reservationCount = reservationCount;
    }

    @Override
    public String toString() {
        return "WeekdayReservationDTO{" +
                "dayOfWeek='" + dayOfWeek + '\'' +
                ", reservationCount=" + reservationCount +
                '}';
    }
}
