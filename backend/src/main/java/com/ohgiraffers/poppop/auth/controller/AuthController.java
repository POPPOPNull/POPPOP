package com.ohgiraffers.poppop.auth.controller;


import com.ohgiraffers.poppop.admin.model.dao.AdminMapper;
import com.ohgiraffers.poppop.admin.model.dto.AdminDTO;
import com.ohgiraffers.poppop.auth.model.dto.RefreshToken;
import com.ohgiraffers.poppop.auth.model.service.AuthService;
import com.ohgiraffers.poppop.auth.model.service.RefreshTokenService;
import com.ohgiraffers.poppop.jwt.dto.LoginSuccessInfo;
import com.ohgiraffers.poppop.jwt.dto.MemberJoinRequest;
import com.ohgiraffers.poppop.jwt.dto.LoginRequest;
import com.ohgiraffers.poppop.jwt.dto.TokenResponse;
import com.ohgiraffers.poppop.jwt.security.JwtTokenProvider;
import com.ohgiraffers.poppop.member.model.dao.MemberMapper;
import com.ohgiraffers.poppop.member.model.dto.MemberDTO;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;

    private final long refreshCookieMaxAge = 60L * 60 * 24 * 30;

    @Autowired
    public AuthController(AuthService authService,
                          JwtTokenProvider jwtTokenProvider,
                          RefreshTokenService refreshTokenService) {
        this.authService = authService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenService = refreshTokenService;
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
//    @PostMapping("/login")
//    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest dto) {
//        String token = authService.login(dto.getId(), dto.getPassword());
//        return ResponseEntity.ok(new TokenResponse(token));
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest dto, HttpServletResponse response) {
        try{
        // 1. AuthService를 통해 인증 및 성공 정보 획득
        LoginSuccessInfo info = authService.login(dto.getId(), dto.getPassword());

        // 2. Access Token 생성 (수정된 JwtTokenProvider 사용)
        String accessToken = jwtTokenProvider.createToken(
                info.getPrincipalId(),
                info.getPrincipalType(),
                info.getRole());

        // 3. Refresh Token 생성 및 DB 저장
        RefreshToken saved = refreshTokenService.createAndSave(info.getPrincipalId(), info.getPrincipalType());

        // 4. 쿠키 발급
        ResponseCookie cookie = ResponseCookie.from("refreshToken", saved.getToken())
                .httpOnly(true)
                // .secure(true)
                .path("/")
                .maxAge(refreshCookieMaxAge)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new TokenResponse(accessToken));

    } catch (RuntimeException e) {
            // 🔴 로그인 실패 (아이디/비번 틀림 등)
            return ResponseEntity.status(401).body(e.getMessage());
        } catch (Exception e) {
            // 🔴 그 외 예기치 않은 서버 내부 에러
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

//    // Admin 로그인
//    @PostMapping("/admin/login")
//    public ResponseEntity<TokenResponse> adminLogin(@RequestBody LoginRequest dto) {
//        String token = authService.adminLogin(dto.getId(), dto.getPassword());
//        return ResponseEntity.ok(new TokenResponse(token));
//    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest dto, HttpServletResponse response) {
        try{
        // 1. AuthService를 통해 인증 및 성공 정보 획득
        LoginSuccessInfo info = authService.adminLogin(dto.getId(), dto.getPassword());

        // 2. Access Token 생성 (수정된 JwtTokenProvider 사용)
        String accessToken = jwtTokenProvider.createToken(info.getPrincipalId(), info.getPrincipalType(), info.getRole());

        // 3. Refresh Token 생성 및 DB 저장
        RefreshToken saved = refreshTokenService.createAndSave(info.getPrincipalId(), info.getPrincipalType());

        // 4. 쿠키 발급
        ResponseCookie cookie = ResponseCookie.from("refreshToken", saved.getToken())
                .httpOnly(true)
                // .secure(true)
                .path("/")
                .maxAge(refreshCookieMaxAge)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new TokenResponse(accessToken));
    } catch (RuntimeException e) {
            // 🔴 로그인 실패 (아이디/비번 틀림 등)
            return ResponseEntity.status(401).body(e.getMessage());
        } catch (Exception e) {
            // 🔴 그 외 예기치 않은 서버 내부 에러
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    // refresh endpoint
    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(@CookieValue(name = "refreshToken", required = false) String refreshToken, HttpServletResponse response) {
        if (refreshToken == null) {
            return ResponseEntity.status(401).body("Refresh token missing");
        }

        RefreshToken stored = refreshTokenService.findByToken(refreshToken);
        if (stored == null) {
            return ResponseEntity.status(401).body("Invalid refresh token");
        }
        if (refreshTokenService.isExpired(stored)) {
            // 만료된 토큰은 DB에서 삭제
            refreshTokenService.deleteByToken(stored.getToken());
            return ResponseEntity.status(401).body("Refresh token expired");
        }

        // 1. DB에서 가져온 정보로 사용자 role 확인
        String role = authService.findRoleById(stored.getPrincipalId());
        if (role == null) {
            return ResponseEntity.status(401).body("User not found");
        }

        // 2. 새로운 Access Token 생성 (가장 중요한 부분: DB의 Principal 정보 사용)
        String newAccess = jwtTokenProvider.createToken(
                stored.getPrincipalId(),
                stored.getPrincipalType(),
                role
        );

        // 3. Refresh Token Rotation: 새 refresh 발급 및 DB 업데이트/재저장 (보안 강화)
        // 기존 토큰 삭제 및 새로운 토큰 생성 및 저장
        refreshTokenService.deleteByToken(stored.getToken());
        RefreshToken rotated = refreshTokenService.createAndSave(stored.getPrincipalId(), stored.getPrincipalType());

        // 4. 새 Refresh Token으로 쿠키 업데이트
        ResponseCookie cookie = ResponseCookie.from("refreshToken", rotated.getToken())
                .httpOnly(true)
                // .secure(true)
                .path("/")
                .maxAge(refreshCookieMaxAge)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new TokenResponse(newAccess));

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(name = "refreshToken", required = false) String refreshToken) {
        if (refreshToken != null) {
            refreshTokenService.deleteByToken(refreshToken);
        }
        ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logged out");
    }

}
