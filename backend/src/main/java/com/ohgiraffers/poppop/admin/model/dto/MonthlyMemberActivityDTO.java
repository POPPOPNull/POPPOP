package com.ohgiraffers.poppop.admin.model.dto;

public class MonthlyMemberActivityDTO {

    private int visitYear;
    private int visitMonth;
    private long activeMembers;
    private long totalMembersAtEndOfMonth;

    public MonthlyMemberActivityDTO() {}

    public MonthlyMemberActivityDTO(int visitYear, int visitMonth, long activeMembers, long totalMembersAtEndOfMonth) {
        this.visitYear = visitYear;
        this.visitMonth = visitMonth;
        this.activeMembers = activeMembers;
        this.totalMembersAtEndOfMonth = totalMembersAtEndOfMonth;
    }

    public int getVisitYear() {
        return visitYear;
    }

    public void setVisitYear(int visitYear) {
        this.visitYear = visitYear;
    }

    public int getVisitMonth() {
        return visitMonth;
    }

    public void setVisitMonth(int visitMonth) {
        this.visitMonth = visitMonth;
    }

    public long getActiveMembers() {
        return activeMembers;
    }

    public void setActiveMembers(long activeMembers) {
        this.activeMembers = activeMembers;
    }

    public long getTotalMembersAtEndOfMonth() {
        return totalMembersAtEndOfMonth;
    }

    public void setTotalMembersAtEndOfMonth(long totalMembersAtEndOfMonth) {
        this.totalMembersAtEndOfMonth = totalMembersAtEndOfMonth;
    }

    @Override
    public String toString() {
        return "MonthlyMemberActivityDTO{" +
                "visitYear=" + visitYear +
                ", visitMonth=" + visitMonth +
                ", activeMembers=" + activeMembers +
                ", totalMembersAtEndOfMonth=" + totalMembersAtEndOfMonth +
                '}';
    }
}
