package com.ohgiraffers.poppop.reservation.model.dto;

public class ReservationDTO {

    private int reservationNo;
    private String reservationStatus;
    private int reservationPersonnel;
    private String cancelReason;
    private int popupNo;
    private String memberId;
    private String popupName;

    public ReservationDTO() {}

    public ReservationDTO(int reservationNo, String reservationStatus, int reservationPersonnel, String cancelReason, int popupNo, String memberId, String popupName) {
        this.reservationNo = reservationNo;
        this.reservationStatus = reservationStatus;
        this.reservationPersonnel = reservationPersonnel;
        this.cancelReason = cancelReason;
        this.popupNo = popupNo;
        this.memberId = memberId;
        this.popupName = popupName;
    }

    public int getReservationNo() {
        return reservationNo;
    }

    public void setReservationNo(int reservationNo) {
        this.reservationNo = reservationNo;
    }

    public String getReservationStatus() {
        return reservationStatus;
    }

    public void setReservationStatus(String reservationStatus) {
        this.reservationStatus = reservationStatus;
    }

    public int getReservationPersonnel() {
        return reservationPersonnel;
    }

    public void setReservationPersonnel(int reservationPersonnel) {
        this.reservationPersonnel = reservationPersonnel;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public void setCancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
    }

    public int getPopupNo() {
        return popupNo;
    }

    public void setPopupNo(int popupNo) {
        this.popupNo = popupNo;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getPopupName() {
        return popupName;
    }

    public void setPopupName(String popupName) {
        this.popupName = popupName;
    }

    @Override
    public String toString() {
        return "ReservationDTO{" +
                "reservationNo=" + reservationNo +
                ", reservationStatus='" + reservationStatus + '\'' +
                ", reservationPersonnel=" + reservationPersonnel +
                ", cancelReason='" + cancelReason + '\'' +
                ", popupNo=" + popupNo +
                ", memberId='" + memberId + '\'' +
                ", popupName='" + popupName + '\'' +
                '}';
    }
}
