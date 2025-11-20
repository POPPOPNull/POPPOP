package com.ohgiraffers.poppop.admin.model.dto;

import java.time.LocalDate;

public class DailyVisitorDTO {

    private LocalDate visitDate;
    private long totalVisitors;
    private long memberVisitors;
    private long nonMemberVisitors;

    public DailyVisitorDTO() {}

    public DailyVisitorDTO(LocalDate visitDate, long totalVisitors, long memberVisitors, long nonMemberVisitors) {
        this.visitDate = visitDate;
        this.totalVisitors = totalVisitors;
        this.memberVisitors = memberVisitors;
        this.nonMemberVisitors = nonMemberVisitors;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public long getTotalVisitors() {
        return totalVisitors;
    }

    public void setTotalVisitors(long totalVisitors) {
        this.totalVisitors = totalVisitors;
    }

    public long getMemberVisitors() {
        return memberVisitors;
    }

    public void setMemberVisitors(long memberVisitors) {
        this.memberVisitors = memberVisitors;
    }

    public long getNonMemberVisitors() {
        return nonMemberVisitors;
    }

    public void setNonMemberVisitors(long nonMemberVisitors) {
        this.nonMemberVisitors = nonMemberVisitors;
    }

    @Override
    public String toString() {
        return "DailyVisitorDTO{" +
                "visitDate=" + visitDate +
                ", totalVisitors=" + totalVisitors +
                ", memberVisitors=" + memberVisitors +
                ", nonMemberVisitors=" + nonMemberVisitors +
                '}';
    }
}
