package com.ohgiraffers.poppop.auth.controller;

import com.ohgiraffers.poppop.auth.model.service.AuthService;
import com.ohgiraffers.poppop.jwt.dto.MemberJoinRequest;
import com.ohgiraffers.poppop.jwt.dto.LoginRequest;
import com.ohgiraffers.poppop.jwt.dto.TokenResponse;
import com.ohgiraffers.poppop.member.model.dto.MemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Manager 회원가입 - role을 MANAGER로
    @PostMapping("/manager/join")
    public ResponseEntity<Void> managerJoin(@RequestBody MemberJoinRequest dto) {

        MemberDTO member = new MemberDTO();
        member.setId(dto.getId());
        member.setPassword(dto.getPassword());
        member.setName(dto.getName());
        member.setPhone(dto.getPhone());
        member.setEmail(dto.getEmail());
        member.setBusinessNo(dto.getBusinessNo());
//        member.setGender(dto.getGender());
        member.setBirthDate(dto.getBirthdate());

        member.setRole("MANAGER");
        authService.joinMember(member);
        return ResponseEntity.ok().build();
    }

    // User 회원가입 - role을 USER로
    @PostMapping("/user/join")
    public ResponseEntity<Void> userJoin(@RequestBody MemberJoinRequest dto) {

        MemberDTO member = new MemberDTO();
        member.setId(dto.getId());
        member.setPassword(dto.getPassword());
        member.setName(dto.getName());
        member.setPhone(dto.getPhone());
        member.setRole(dto.getRole());
        member.setEmail(dto.getEmail());
//        member.setGender(dto.getGender());
        member.setBirthDate(dto.getBirthdate());

        member.setRole("USER");
        authService.joinMember(member);
        return ResponseEntity.ok().build();
    }

    // Manager/User 공통 로그인
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest dto) {
        String token = authService.login(dto.getId(), dto.getPassword());
        return ResponseEntity.ok(new TokenResponse(token));
    }

    // Admin 로그인
    @PostMapping("/admin/login")
    public ResponseEntity<TokenResponse> adminLogin(@RequestBody LoginRequest dto) {
        String token = authService.adminLogin(dto.getId(), dto.getPassword());
        return ResponseEntity.ok(new TokenResponse(token));
    }

}

