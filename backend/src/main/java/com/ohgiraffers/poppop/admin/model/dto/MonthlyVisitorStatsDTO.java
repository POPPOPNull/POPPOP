package com.ohgiraffers.poppop.admin.model.dto;

// 월별 회원가입률 DTO
public class MonthlyVisitorStatsDTO {

    private int visitYear;
    private int visitMonth;
    private int visitorCount;
    private int signupCount;

    public MonthlyVisitorStatsDTO() {}

    public MonthlyVisitorStatsDTO(int visitYear, int visitMonth, int visitorCount, int signupCount) {
        this.visitYear = visitYear;
        this.visitMonth = visitMonth;
        this.visitorCount = visitorCount;
        this.signupCount = signupCount;
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

    public int getVisitorCount() {
        return visitorCount;
    }

    public void setVisitorCount(int visitorCount) {
        this.visitorCount = visitorCount;
    }

    public int getSignupCount() {
        return signupCount;
    }

    public void setSignupCount(int signupCount) {
        this.signupCount = signupCount;
    }

    @Override
    public String toString() {
        return "MonthlyVisitorStatsDTO{" +
                "visitYear=" + visitYear +
                ", visitMonth=" + visitMonth +
                ", visitorCount=" + visitorCount +
                ", signupCount=" + signupCount +
                '}';
    }
}
