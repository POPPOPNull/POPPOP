package com.ohgiraffers.poppop.admin.model.dto;

public class ManagerKpiDTO {

    private long managerCount;
    private long ongoingStoreCount;
    private long pendingStoreCount;
    private long brandCount;
    private long imminentStoreCount;

    public ManagerKpiDTO() {}

    public ManagerKpiDTO(long managerCount, long ongoingStoreCount, long pendingStoreCount, long brandCount, long imminentStoreCount) {
        this.managerCount = managerCount;
        this.ongoingStoreCount = ongoingStoreCount;
        this.pendingStoreCount = pendingStoreCount;
        this.brandCount = brandCount;
        this.imminentStoreCount = imminentStoreCount;
    }

    public long getManagerCount() {
        return managerCount;
    }

    public void setManagerCount(long managerCount) {
        this.managerCount = managerCount;
    }

    public long getOngoingStoreCount() {
        return ongoingStoreCount;
    }

    public void setOngoingStoreCount(long ongoingStoreCount) {
        this.ongoingStoreCount = ongoingStoreCount;
    }

    public long getPendingStoreCount() {
        return pendingStoreCount;
    }

    public void setPendingStoreCount(long pendingStoreCount) {
        this.pendingStoreCount = pendingStoreCount;
    }

    public long getBrandCount() {
        return brandCount;
    }

    public void setBrandCount(long brandCount) {
        this.brandCount = brandCount;
    }

    public long getImminentStoreCount() {
        return imminentStoreCount;
    }

    public void setImminentStoreCount(long imminentStoreCount) {
        this.imminentStoreCount = imminentStoreCount;
    }

    @Override
    public String toString() {
        return "ManagerKpiDTO{" +
                "managerCount=" + managerCount +
                ", ongoingStoreCount=" + ongoingStoreCount +
                ", pendingStoreCount=" + pendingStoreCount +
                ", brandCount=" + brandCount +
                ", imminentStoreCount=" + imminentStoreCount +
                '}';
    }
}
