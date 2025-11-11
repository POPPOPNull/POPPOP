package com.ohgiraffers.poppop.reservation.model.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ReservationDetailsDTO {

    private int reservationNo;
    private String reservationStatus;
    private int reservationPersonnel;
    private int popupNo;
    private String memberId;
    private String popupName;
    private String phone;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private String name;

    public ReservationDetailsDTO() {}

    public ReservationDetailsDTO(int reservationNo,
                                 String reservationStatus,
                                 int reservationPersonnel,
                                 int popupNo,
                                 String memberId,
                                 String popupName,
                                 String phone,
                                 LocalDate reservationDate,
                                 LocalTime reservationTime,
                                 String name) {
        this.reservationNo = reservationNo;
        this.reservationStatus = reservationStatus;
        this.reservationPersonnel = reservationPersonnel;
        this.popupNo = popupNo;
        this.memberId = memberId;
        this.popupName = popupName;
        this.phone = phone;
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.name = name;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    public LocalTime getReservationTime() {
        return reservationTime;
    }

    public void setReservationTime(LocalTime reservationTime) {
        this.reservationTime = reservationTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "ReservationDTO{" +
                "reservationNo=" + reservationNo +
                ", reservationStatus='" + reservationStatus + '\'' +
                ", reservationPersonnel=" + reservationPersonnel +
                ", popupNo=" + popupNo +
                ", memberId='" + memberId + '\'' +
                ", popupName='" + popupName + '\'' +
                ", phone='" + phone + '\'' +
                ", reservationDate=" + reservationDate +
                ", reservationTime=" + reservationTime +
                ", name='" + name + '\'' +
                '}';
    }
}
