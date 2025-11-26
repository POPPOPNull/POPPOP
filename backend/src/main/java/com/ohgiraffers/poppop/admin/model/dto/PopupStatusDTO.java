package com.ohgiraffers.poppop.admin.model.dto;

public class PopupStatusDTO {

    private String month;
    private int totalCount;
    private int approvedCount;
    private int rejectedCount;

    public PopupStatusDTO() {}

    public PopupStatusDTO(String month, int totalCount, int approvedCount, int rejectedCount) {
        this.month = month;
        this.totalCount = totalCount;
        this.approvedCount = approvedCount;
        this.rejectedCount = rejectedCount;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getApprovedCount() {
        return approvedCount;
    }

    public void setApprovedCount(int approvedCount) {
        this.approvedCount = approvedCount;
    }

    public int getRejectedCount() {
        return rejectedCount;
    }

    public void setRejectedCount(int rejectedCount) {
        this.rejectedCount = rejectedCount;
    }

    @Override
    public String toString() {
        return "PopupStatusDTO{" +
                "month='" + month + '\'' +
                ", totalCount=" + totalCount +
                ", approvedCount=" + approvedCount +
                ", rejectedCount=" + rejectedCount +
                '}';
    }
}
