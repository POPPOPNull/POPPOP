package com.ohgiraffers.poppop.manager.model.service;

import com.ohgiraffers.poppop.manager.model.dao.ManagerDashboardMapper;
import com.ohgiraffers.poppop.manager.model.dto.GenderReservationDTO;
import com.ohgiraffers.poppop.manager.model.dto.ManagerDashboardSummaryDTO;
import com.ohgiraffers.poppop.manager.model.dto.ReservationTrendDTO;
import com.ohgiraffers.poppop.manager.model.dto.WeekdayReservationDTO;
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
}

