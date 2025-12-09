package com.ohgiraffers.poppop.manager.model.dto;

public class ManagerDashboardSummaryDTO {


    private int todayReservationCount;   // 오늘 예약 수
    private int totalReservationCount;   // 누적 예약 수

    private int totalFavoriteCount;      // 누적 관심 수

    private int totalReviewCount;        // 전체 리뷰 수

    public int getTodayReservationCount() {
        return todayReservationCount;
    }

    public void setTodayReservationCount(int todayReservationCount) {
        this.todayReservationCount = todayReservationCount;
    }

    public int getTotalReservationCount() {
        return totalReservationCount;
    }

    public void setTotalReservationCount(int totalReservationCount) {
        this.totalReservationCount = totalReservationCount;
    }


    public int getTotalFavoriteCount() {
        return totalFavoriteCount;
    }

    public void setTotalFavoriteCount(int totalFavoriteCount) {
        this.totalFavoriteCount = totalFavoriteCount;
    }

    public int getTotalReviewCount() {
        return totalReviewCount;
    }

    public void setTotalReviewCount(int totalReviewCount) {
        this.totalReviewCount = totalReviewCount;
    }

    @Override
    public String toString() {
        return "ManagerDashboardSummaryDTO{" +
                "todayReservationCount=" + todayReservationCount +
                ", totalReservationCount=" + totalReservationCount +
                ", totalFavoriteCount=" + totalFavoriteCount +
                ", totalReviewCount=" + totalReviewCount +
                '}';
    }
}


