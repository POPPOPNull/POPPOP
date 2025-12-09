package com.ohgiraffers.poppop.manager.model.service;

import com.ohgiraffers.poppop.manager.model.dao.ManagerDashboardMapper;
import com.ohgiraffers.poppop.manager.model.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerDashboardService {

    private final ManagerDashboardMapper dashboardMapper;

    @Autowired
    public ManagerDashboardService(ManagerDashboardMapper dashboardMapper) {
        this.dashboardMapper = dashboardMapper;
    }

    public ManagerDashboardSummaryDTO getDashboardSummary(String managerId, int popupNo) {

        ManagerDashboardSummaryDTO dto = new ManagerDashboardSummaryDTO();

        dto.setTodayReservationCount(
                dashboardMapper.selectTodayReservationCount(managerId, popupNo)
        );

        dto.setTotalReservationCount(
                dashboardMapper.selectTotalReservationCount(managerId, popupNo)
        );

        dto.setTotalFavoriteCount(
                dashboardMapper.selectTotalFavoriteCount(managerId, popupNo)
        );

        dto.setTotalReviewCount(
                dashboardMapper.selectTotalReviewCount(managerId, popupNo)
        );

        return dto;
    }

    //1행 최근 7일 예약
    public List<ReservationTrendDTO> getReservationTrend(int popupNo) {
        return dashboardMapper.selectReservationTrend(popupNo);
    }

    // 2행 왼쪽 요일별 예약 패턴
    public List<WeekdayReservationDTO> getWeekdayReservations(int popupNo) {
        return dashboardMapper.selectWeekdayReservations(popupNo);
    }

    // 2행 오른쪽 성별 비율 조회
    public List<GenderReservationDTO> getGenderRatio(int popupNo) {
        return dashboardMapper.selectGenderRatio(popupNo);
    }

    //1행 오른쪽 사용자 행동
    public List<EventTypeStatDTO> getEventTypeStats(int popupNo) {
        return dashboardMapper.selectEventTypeStats(popupNo);
    }

    // === 매니저 전체 대시보드용 메서드 ===

    public List<ReservationTrendDTO> getManagerReservationTrend(String managerId) {
        return dashboardMapper.selectManagerReservationTrend(managerId);
    }

    public List<WeekdayReservationDTO> getManagerWeekdayReservations(String managerId) {
        return dashboardMapper.selectManagerWeekdayReservations(managerId);
    }

    public List<GenderReservationDTO> getManagerGenderRatio(String managerId) {
        return dashboardMapper.selectManagerGenderRatio(managerId);
    }

    public List<EventTypeStatDTO> getManagerEventTypeStats(String managerId) {
        return dashboardMapper.selectManagerEventTypeStats(managerId);
    }

    public DashboardOverallKpiDTO getOverallDashboardKpi() {
        return dashboardMapper.selectOverallDashboardKpi();
    }

    public int getManagerTodayReservationCount(String managerId) {
        return dashboardMapper.selectManagerTodayReservationCount(managerId);
    }
}

