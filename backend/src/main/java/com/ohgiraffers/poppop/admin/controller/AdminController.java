package com.ohgiraffers.poppop.admin.controller;


import com.ohgiraffers.poppop.admin.model.dto.MonthlyMemberActivityDTO;
import com.ohgiraffers.poppop.admin.model.dto.MonthlyVisitorStatsDTO;
import com.ohgiraffers.poppop.admin.model.dto.UserKpiDTO;
import com.ohgiraffers.poppop.admin.model.dto.YearlyVisitorStatsDTO;
import com.ohgiraffers.poppop.admin.model.service.AdminService;
import com.ohgiraffers.poppop.admin.model.service.KpiService;

import com.ohgiraffers.poppop.admin.model.service.AdminService;
import com.ohgiraffers.poppop.auth.model.service.AuthService;
import com.ohgiraffers.poppop.jwt.dto.LoginRequest;
import com.ohgiraffers.poppop.jwt.dto.TokenResponse;

import com.ohgiraffers.poppop.member.model.dto.MemberDTO;
import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import com.ohgiraffers.poppop.popupstore.model.service.PopupStoreService;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationDetailsDTO;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationSummaryDTO;
import com.ohgiraffers.poppop.reservation.model.service.ReservationService;
import com.ohgiraffers.poppop.review.model.dto.ReviewDTO;
import com.ohgiraffers.poppop.review.model.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {


    private final AuthService authService;
    private final AdminService adminService;
    private final ReviewService reviewService;
    private final ReservationService reservationService;
    private final PopupStoreService popupStoreService;
    private final KpiService kpiService;



    public AdminController(AuthService authService,
                           AdminService adminService,
                           ReviewService reviewService,
                           ReservationService reservationService,
                           PopupStoreService popupStoreService,
                           KpiService kpiService) {
        this.authService = authService;
        this.adminService = adminService;
        this.reviewService = reviewService;
        this.reservationService = reservationService;
        this.popupStoreService = popupStoreService;
        this.kpiService = kpiService;

    }

    // 전체 회원(user) 조회
    @GetMapping("/members")
    public ResponseEntity<List<MemberDTO>> selectAllMembers() {
        return ResponseEntity.ok(adminService.selectAllMembers());
    }

    // 전체 리뷰 조회
    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewDTO>> selectAllReviews() {
        return ResponseEntity.ok(reviewService.selectAllReviews());
    }

    // 전체 예약(user) 조회
    @GetMapping("/reservation")
    public ResponseEntity<List<ReservationDetailsDTO>> selectAllReservation() {
        return ResponseEntity.ok(reservationService.selectAllReservation());
    }

    // 전체 회원(manager) 조회
    @GetMapping("/manager-members")
    public ResponseEntity<List<MemberDTO>> selectAllManagers() {
        return ResponseEntity.ok(adminService.selectAllManagers());
    }

    // 전체 팝업 스토어 조회
    @GetMapping("/manager-popup")
    public ResponseEntity<List<PopupStoreDTO>> selectAllPopupStore() {
        return ResponseEntity.ok(popupStoreService.selectAllPopupStore());
    }

    // 팝업 스토어 상세 조회
    @GetMapping("/manager-popup/{popupNo}")
    public ResponseEntity<PopupStoreDTO> selectPopupStoreDetails(@PathVariable int popupNo) {
        return ResponseEntity.ok(popupStoreService.selectPopupStoreDetails(popupNo));
    }

    // 팝업 스토어 승인 처리
    @PutMapping("/manager-popup/{popupNo}/approve")
    public ResponseEntity<Void> approvePopup(@PathVariable int popupNo) {
        popupStoreService.approvePopup(popupNo);
        return ResponseEntity.ok().build();
    }

    // 팝업 스토어 반려 처리
    @PutMapping("/manager-popup/{popupNo}/reject")
    public ResponseEntity<Void> rejectPopup(@PathVariable int popupNo, @RequestBody Map<String, String> payload) {
        String rejectionReason = payload.get("rejectionReason");
        popupStoreService.rejectPopup(popupNo, rejectionReason);
        return ResponseEntity.ok().build();
    }

    // 팝업별 예약 조회(집계)
    @GetMapping("/manager-reservation")
    public ResponseEntity<List<ReservationSummaryDTO>> selectReservationSummary() {
        return ResponseEntity.ok(reservationService.selectReservationSummary());
    }

    // 팝업 스토어 별 예약 내역 조회
    @GetMapping("/manager-reservation/{popupNo}")
    public ResponseEntity<List<ReservationDetailsDTO>> selectReservationDetailsByPopup(@PathVariable int popupNo) {
        return ResponseEntity.ok(reservationService.selectReservationDetailsByPopup(popupNo));
    }

    // 예약 취소
    @DeleteMapping("/reservation/{reservationNo}")
    public ResponseEntity<Void> deleteReservationDetails(@PathVariable int reservationNo) {
        try {
            reservationService.deleteReservationDetails(reservationNo);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // User 대시보드 KPI 데이터 조회
    @GetMapping("/kpi/user")
    public ResponseEntity<UserKpiDTO> selectUserKpiData() {
        return ResponseEntity.ok(kpiService.selectUserKpiData());
    }

    // Admin 전용 로그인 엔드포인트
//    @PostMapping("/admin/login")
//    public ResponseEntity<TokenResponse> adminLogin(@RequestBody LoginRequest dto) {
//        String token = authService.adminLogin(dto.getId(), dto.getPassword());
//        return ResponseEntity.ok(new TokenResponse(token));
//    }

    // Admin 전용 페이지 접속 확인 (JWT 인증 필요)
    @GetMapping("/admin/main")
    public ResponseEntity<String> adminMain() {
        // JWT의 ROLE이 'ADMIN'인 경우에만 접근 가능 (SecurityConfig에서 설정)
        return ResponseEntity.ok("Admin 메인페이지");

    }

    // User 대시보드 꺾은 선 차트 회원가입률 조회
    @GetMapping("/kpi/monthly-visitor-stats")
    public ResponseEntity<List<MonthlyVisitorStatsDTO>> selectMonthlyVisitorStats() {
        return ResponseEntity.ok(kpiService.selectMonthlyVisitorStats());
    }

    @GetMapping("/kpi/yearly-visitor-stats")
    public ResponseEntity<List<YearlyVisitorStatsDTO>> selectYearlyVisitorStats() {
        return ResponseEntity.ok(kpiService.selectYearlyVisitorStats());
    }

    // User 대시보드 꺾은 선 차트 활동회원 비율 조회
    @GetMapping("/kpi/monthly-member-activity")
    public ResponseEntity<List<MonthlyMemberActivityDTO>> selectMontlyMemberActivityStats() {
        return ResponseEntity.ok(kpiService.selectMonthlyMemberActivityStats());
    }
}
