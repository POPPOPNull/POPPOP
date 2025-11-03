package com.ohgiraffers.poppop.reservation.model.dto;

public class ReservationSummaryDTO {

    private String popupName;
    private String status;
    private int reservationCount;
    private int totalPersonnel;

    public ReservationSummaryDTO() {}

    public ReservationSummaryDTO(String popupName, String status, int reservationCount, int totalPersonnel) {
        this.popupName = popupName;
        this.status = status;
        this.reservationCount = reservationCount;
        this.totalPersonnel = totalPersonnel;
    }

    public String getPopupName() {
        return popupName;
    }

    public void setPopupName(String popupName) {
        this.popupName = popupName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getReservationCount() {
        return reservationCount;
    }

    public void setReservationCount(int reservationCount) {
        this.reservationCount = reservationCount;
    }

    public int getTotalPersonnel() {
        return totalPersonnel;
    }

    public void setTotalPersonnel(int totalPersonnel) {
        this.totalPersonnel = totalPersonnel;
    }

    @Override
    public String toString() {
        return "ReservationSummaryDTO{" +
                "popupName='" + popupName + '\'' +
                ", status='" + status + '\'' +
                ", reservationCount=" + reservationCount +
                ", totalPersonnel=" + totalPersonnel +
                '}';
    }
}
