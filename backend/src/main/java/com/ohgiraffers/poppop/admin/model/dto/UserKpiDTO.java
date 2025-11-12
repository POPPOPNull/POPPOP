package com.ohgiraffers.poppop.admin.model.dto;

public class UserKpiDTO {

    private long totalMembers;
    private long todayVisitors;
    private long cumulativeVisitors;
    private long newMembers;
    private long activeMembers;

    public UserKpiDTO() {}

    public UserKpiDTO(long totalMembers, long todayVisitors, long cumulativeVisitors, long newMembers, long activeMembers) {
        this.totalMembers = totalMembers;
        this.todayVisitors = todayVisitors;
        this.cumulativeVisitors = cumulativeVisitors;
        this.newMembers = newMembers;
        this.activeMembers = activeMembers;
    }

    public long getTotalMembers() {
        return totalMembers;
    }

    public void setTotalMembers(long totalMembers) {
        this.totalMembers = totalMembers;
    }

    public long getTodayVisitors() {
        return todayVisitors;
    }

    public void setTodayVisitors(long todayVisitors) {
        this.todayVisitors = todayVisitors;
    }

    public long getCumulativeVisitors() {
        return cumulativeVisitors;
    }

    public void setCumulativeVisitors(long cumulativeVisitors) {
        this.cumulativeVisitors = cumulativeVisitors;
    }

    public long getNewMembers() {
        return newMembers;
    }

    public void setNewMembers(long newMembers) {
        this.newMembers = newMembers;
    }

    public long getActiveMembers() {
        return activeMembers;
    }

    public void setActiveMembers(long activeMembers) {
        this.activeMembers = activeMembers;
    }

    @Override
    public String toString() {
        return "UserKpiDTO{" +
                "totalMembers=" + totalMembers +
                ", todayVisitors=" + todayVisitors +
                ", cumulativeVisitors=" + cumulativeVisitors +
                ", newMembers=" + newMembers +
                ", activeMembers=" + activeMembers +
                '}';
    }
}
