package com.ohgiraffers.poppop.manager.model.service;

import com.ohgiraffers.poppop.manager.model.dao.ManagerDashboardMapper;
import com.ohgiraffers.poppop.manager.model.dto.ManagerDashboardSummaryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}

