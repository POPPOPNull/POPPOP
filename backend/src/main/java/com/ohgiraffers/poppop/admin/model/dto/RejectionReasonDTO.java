package com.ohgiraffers.poppop.admin.model.dto;

public class RejectionReasonDTO {

    private String primaryReason;
    private int reasonCount;

    public RejectionReasonDTO() {}

    public RejectionReasonDTO(String primaryReason, int reasonCount) {
        this.primaryReason = primaryReason;
        this.reasonCount = reasonCount;
    }

    public String getPrimaryReason() {
        return primaryReason;
    }

    public void setPrimaryReason(String primaryReason) {
        this.primaryReason = primaryReason;
    }

    public int getReasonCount() {
        return reasonCount;
    }

    public void setReasonCount(int reasonCount) {
        this.reasonCount = reasonCount;
    }

    @Override
    public String toString() {
        return "RejectionReasonDTO{" +
                "primaryReason='" + primaryReason + '\'' +
                ", reasonCount=" + reasonCount +
                '}';
    }
}
