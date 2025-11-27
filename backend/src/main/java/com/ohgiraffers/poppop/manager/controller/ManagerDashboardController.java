package com.ohgiraffers.poppop.manager.controller;

import com.ohgiraffers.poppop.manager.model.dto.*;
import com.ohgiraffers.poppop.manager.model.service.ManagerDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/manager/dashboard")
public class ManagerDashboardController {

    private final ManagerDashboardService dashboardService;

    @Autowired
    public ManagerDashboardController(ManagerDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/{popupNo}")
    public ResponseEntity<ManagerDashboardSummaryDTO> getDashboardSummary(
            @PathVariable int popupNo,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        String managerId = userDetails.getUsername();

        ManagerDashboardSummaryDTO summary =
                dashboardService.getDashboardSummary(managerId, popupNo);

        return ResponseEntity.ok(summary);
    }

    //1행 최근 7일 예약
    @GetMapping("/{popupNo}/reservation-trend")
    public ResponseEntity<List<ReservationTrendDTO>> getReservationTrend(
            @PathVariable int popupNo
    ) {
        return ResponseEntity.ok(dashboardService.getReservationTrend(popupNo));
    }

    // 2행 왼쪽 요일별 예약 패턴
    @GetMapping("/{popupNo}/weekday-reservations")
    public ResponseEntity<List<WeekdayReservationDTO>> getWeekdayReservations(
            @PathVariable int popupNo
    ) {
        return ResponseEntity.ok(dashboardService.getWeekdayReservations(popupNo));
    }

    // 2행 오른쪽 예약자 성별 비율
    @GetMapping("/{popupNo}/gender-ratio")
    public ResponseEntity<List<GenderReservationDTO>> getGenderRatio(
            @PathVariable int popupNo
    ) {
        return ResponseEntity.ok(dashboardService.getGenderRatio(popupNo));
    }

    //1행 오른쪽 사용자 행동
    @GetMapping("/{popupNo}/event-type-stats")
    public ResponseEntity<List<EventTypeStatDTO>> getEventTypeStats(@PathVariable int popupNo) {
        return ResponseEntity.ok(dashboardService.getEventTypeStats(popupNo));
    }
}


