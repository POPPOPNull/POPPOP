package com.ohgiraffers.poppop.admin.model.dto;

// 연별 회원가입률 DTO
public class YearlyVisitorStatsDTO {

    private int visitYear;
    private int visitorCount;
    private int signupCount;

    public YearlyVisitorStatsDTO() {}

    public YearlyVisitorStatsDTO(int visitYear, int visitorCount, int signupCount) {
        this.visitYear = visitYear;
        this.visitorCount = visitorCount;
        this.signupCount = signupCount;
    }

    public int getVisitYear() {
        return visitYear;
    }

    public void setVisitYear(int visitYear) {
        this.visitYear = visitYear;
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
        return "YearlyVisitorStatsDTO{" +
                "visitYear=" + visitYear +
                ", visitorCount=" + visitorCount +
                ", signupCount=" + signupCount +
                '}';
    }
}
