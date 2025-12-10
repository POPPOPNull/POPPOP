package com.ohgiraffers.poppop.manager.model.dto;

public class DashboardOverallKpiDTO {

    // 전체 팝업스토어 수
    private int totalPopupCount;
    private int todayReservationCount;

    // 전체 예약 수
    private int totalReservationCount;

    // 전체 관심 수
    private int totalFavoriteCount;

    // 전체 리뷰 수
    private int totalReviewCount;

    public int getTotalPopupCount() {
        return totalPopupCount;
    }

    public int getTodayReservationCount() {
        return todayReservationCount;
    }

    public void setTodayReservationCount(int todayReservationCount) {
        this.todayReservationCount = todayReservationCount;
    }

    public void setTotalPopupCount(int totalPopupCount) {
        this.totalPopupCount = totalPopupCount;
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
}
