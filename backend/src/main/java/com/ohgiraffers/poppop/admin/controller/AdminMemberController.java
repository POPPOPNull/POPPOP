package com.ohgiraffers.poppop.admin.controller;

import com.ohgiraffers.poppop.admin.model.service.AdminService;
import com.ohgiraffers.poppop.member.model.dto.MemberDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminMemberController {

    private final AdminService adminService;

    public AdminMemberController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/members")
    public ResponseEntity<List<MemberDTO>> selectAllMembers() {
        List<MemberDTO> memberList = adminService.findAllMembers();
        return ResponseEntity.ok(memberList);
    }
}
