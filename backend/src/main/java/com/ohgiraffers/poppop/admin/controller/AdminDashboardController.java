package com.ohgiraffers.poppop.admin.controller;

import com.ohgiraffers.poppop.admin.model.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminDashboardController {

    private final AdminService adminService;

    public AdminDashboardController(AdminService adminService) {
        this.adminService = adminService;
    }

    // admin user 대시보드 KPI 카드 데이터 요청
    @GetMapping("/users-count")
    public ResponseEntity<Map<String, Long>> usersCount(){

        long count = adminService.countUsers();

        return ResponseEntity.ok(Collections.singletonMap("usersCount", count));
    }

}
