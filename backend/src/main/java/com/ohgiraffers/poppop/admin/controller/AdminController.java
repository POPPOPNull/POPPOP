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
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users-count")
    public ResponseEntity<Map<String, Long>> usersCount(){

        long count = adminService.countUsers();

        return ResponseEntity.ok(Collections.singletonMap("usersCount", count));
    }
}
