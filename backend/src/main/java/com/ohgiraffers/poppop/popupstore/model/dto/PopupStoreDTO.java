package com.ohgiraffers.poppop.popupstore.model.dto;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class PopupStoreDTO {

<<<<<<< HEAD
=======



>>>>>>> JWT/master
    private int no;
    private String name;
    private String brandName;
    private String startDate;
    private String endDate;
    private Time openTime;
    private Time closeTime;
    private String location;
<<<<<<< HEAD
    private double latitude;
    private double longitude;
    private int reservableStatus;
    private String explanation;
    private String approvalStatus;
    private String rejectionReason;
    private String id;
    private int clickCount;
    private String categoryName;
    private int advanceReservation;
    private String homepageLink;
    private int capacity;
    private String hashtagName;
    public PopupStoreDTO(){}

    public PopupStoreDTO(int no, String name, String brandName, String startDate, String endDate, Time openTime, Time closeTime, String location, double latitude, double longitude, int reservableStatus, String explanation, String approvalStatus, String rejectionReason, String id, int clickCount, String categoryName, int advanceReservation, String homepageLink, int capacity, String hashtagName) {
=======
    private boolean reservableStatus;
    private String explanation;
    private String approvalStatus;
    private String rejectionReason;
    private String categoryName;
    private String id;
    private int clickCount;

    public PopupStoreDTO(){}

    public PopupStoreDTO(int no, String name, String brandName, String startDate, String endDate, Time openTime, Time closeTime, String location, boolean reservableStatus, String explanation, String approvalStatus, String rejectionReason, String categoryName, String id, String hashtags, int clickCount) {
>>>>>>> JWT/master
        this.no = no;
        this.name = name;
        this.brandName = brandName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.location = location;
<<<<<<< HEAD
        this.latitude = latitude;
        this.longitude = longitude;
=======
>>>>>>> JWT/master
        this.reservableStatus = reservableStatus;
        this.explanation = explanation;
        this.approvalStatus = approvalStatus;
        this.rejectionReason = rejectionReason;
<<<<<<< HEAD
        this.id = id;
        this.clickCount = clickCount;
        this.categoryName = categoryName;
        this.advanceReservation = advanceReservation;
        this.homepageLink = homepageLink;
        this.capacity = capacity;
        this.hashtagName = hashtagName;
=======
        this.categoryName = categoryName;
        this.id = id;
        this.clickCount = clickCount;
>>>>>>> JWT/master
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Time getOpenTime() {
        return openTime;
    }

    public void setOpenTime(Time openTime) {
        this.openTime = openTime;
    }

    public Time getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(Time closeTime) {
        this.closeTime = closeTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

<<<<<<< HEAD
    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public int getReservableStatus() {
        return reservableStatus;
    }

    public void setReservableStatus(int reservableStatus) {
=======
    public boolean isReservableStatus() {
        return reservableStatus;
    }

    public void setReservableStatus(boolean reservableStatus) {
>>>>>>> JWT/master
        this.reservableStatus = reservableStatus;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

<<<<<<< HEAD
=======
    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

>>>>>>> JWT/master
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

<<<<<<< HEAD
=======

>>>>>>> JWT/master
    public int getClickCount() {
        return clickCount;
    }

    public void setClickCount(int clickCount) {
        this.clickCount = clickCount;
    }

<<<<<<< HEAD
    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public int getAdvanceReservation() {
        return advanceReservation;
    }

    public void setAdvanceReservation(int advanceReservation) {
        this.advanceReservation = advanceReservation;
    }

    public String getHomepageLink() {
        return homepageLink;
    }

    public void setHomepageLink(String homepageLink) {
        this.homepageLink = homepageLink;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getHashtagName() {
        return hashtagName;
    }

    public void setHashtagName(String hashtagName) {
        this.hashtagName = hashtagName;
    }

=======
>>>>>>> JWT/master
    @Override
    public String toString() {
        return "PopupStoreDTO{" +
                "no=" + no +
                ", name='" + name + '\'' +
                ", brandName='" + brandName + '\'' +
<<<<<<< HEAD
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", openTime=" + openTime +
                ", closeTime=" + closeTime +
                ", location='" + location + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
=======
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", openTime=" + openTime +
                ", closeTime=" + closeTime +
                ", location='" + location + '\'' +
>>>>>>> JWT/master
                ", reservableStatus=" + reservableStatus +
                ", explanation='" + explanation + '\'' +
                ", approvalStatus='" + approvalStatus + '\'' +
                ", rejectionReason='" + rejectionReason + '\'' +
<<<<<<< HEAD
                ", id='" + id + '\'' +
                ", clickCount=" + clickCount +
                ", categoryName='" + categoryName + '\'' +
                ", advanceReservation=" + advanceReservation +
                ", homepageLink='" + homepageLink + '\'' +
                ", capacity=" + capacity +
                ", hashtagName='" + hashtagName + '\'' +
=======
                ", categoryName='" + categoryName + '\'' +
                ", id='" + id + '\'' +
                ", clickCount=" + clickCount +
>>>>>>> JWT/master
                '}';
    }
}
