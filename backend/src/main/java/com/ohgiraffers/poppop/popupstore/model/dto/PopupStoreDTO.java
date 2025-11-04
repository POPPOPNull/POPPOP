package com.ohgiraffers.poppop.popupstore.model.dto;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class PopupStoreDTO {




    private int no;
    private String name;
    private String brandName;
    private String startDate;
    private String endDate;
    private Time openTime;
    private Time closeTime;
    private String location;
    private boolean reservableStatus;
    private String explanation;
    private String approvalStatus;
    private String rejectionReason;
    private String categoryName;
    private String id;
    private int clickCount;

    public PopupStoreDTO(){}

    public PopupStoreDTO(int no, String name, String brandName, String startDate, String endDate, Time openTime, Time closeTime, String location, boolean reservableStatus, String explanation, String approvalStatus, String rejectionReason, String categoryName, String id, String hashtags, int clickCount) {
        this.no = no;
        this.name = name;
        this.brandName = brandName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.location = location;
        this.reservableStatus = reservableStatus;
        this.explanation = explanation;
        this.approvalStatus = approvalStatus;
        this.rejectionReason = rejectionReason;
        this.categoryName = categoryName;
        this.id = id;
        this.clickCount = clickCount;
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

    public boolean isReservableStatus() {
        return reservableStatus;
    }

    public void setReservableStatus(boolean reservableStatus) {
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

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public int getClickCount() {
        return clickCount;
    }

    public void setClickCount(int clickCount) {
        this.clickCount = clickCount;
    }

    @Override
    public String toString() {
        return "PopupStoreDTO{" +
                "no=" + no +
                ", name='" + name + '\'' +
                ", brandName='" + brandName + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", openTime=" + openTime +
                ", closeTime=" + closeTime +
                ", location='" + location + '\'' +
                ", reservableStatus=" + reservableStatus +
                ", explanation='" + explanation + '\'' +
                ", approvalStatus='" + approvalStatus + '\'' +
                ", rejectionReason='" + rejectionReason + '\'' +
                ", categoryName='" + categoryName + '\'' +
                ", id='" + id + '\'' +
                ", clickCount=" + clickCount +
                '}';
    }
}
