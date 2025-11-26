package com.ohgiraffers.poppop.manager.controller;

import com.ohgiraffers.poppop.manager.model.dto.ManagerDashboardSummaryDTO;
import com.ohgiraffers.poppop.manager.model.service.ManagerDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
}


