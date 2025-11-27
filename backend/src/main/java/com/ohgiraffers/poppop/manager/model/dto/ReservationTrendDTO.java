package com.ohgiraffers.poppop.manager.model.dto;

public class ReservationTrendDTO {

    private String date;
    private int reservationCount;

    public ReservationTrendDTO(String date, int reservationCount) {}

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public int getReservationCount() {
        return reservationCount;
    }
    public void setReservationCount(int reservationCount) {
        this.reservationCount = reservationCount;
    }

    @Override
    public String toString() {
        return "ReservationTrendDTO{" +
                "date='" + date + '\'' +
                ", reservationCount=" + reservationCount +
                '}';
    }
}
