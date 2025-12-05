package com.ohgiraffers.poppop.admin.controller;


import com.ohgiraffers.poppop.admin.model.dto.*;
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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Tag(name = "Admin 계층 관련 API")
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
    @Operation(summary = "전체 user 조회", description = "전체 회원(user)을 조회하는 api")
    @GetMapping("/members")
    public ResponseEntity<List<MemberDTO>> selectAllMembers() {
        return ResponseEntity.ok(adminService.selectAllMembers());
    }

    // 전체 리뷰 조회
    @Operation(summary = "전체 리뷰 조회", description = "전체 리뷰을 조회하는 api")
    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewDTO>> selectAllReviews() {
        return ResponseEntity.ok(reviewService.selectAllReviews());
    }

    // 전체 예약(user) 조회
    @Operation(summary = "전체 예약 조회", description = "전체 예약을 조회하는 api")
    @GetMapping("/reservation")
    public ResponseEntity<List<ReservationDetailsDTO>> selectAllReservation() {
        return ResponseEntity.ok(reservationService.selectAllReservation());
    }

    // 전체 회원(manager) 조회
    @Operation(summary = "전체 manager 조회", description = "전체 회원(manager)을 조회하는 api")
    @GetMapping("/manager-members")
    public ResponseEntity<List<MemberDTO>> selectAllManagers() {
        return ResponseEntity.ok(adminService.selectAllManagers());
    }

    // 전체 팝업 스토어 조회
    @Operation(summary = "전체 팝업 스토어 조회", description = "전체 팝업 스토어를 조회하는 api")
    @GetMapping("/manager-popup")
    public ResponseEntity<List<PopupStoreDTO>> selectAllPopupStoreAdmin() {
        return ResponseEntity.ok(popupStoreService.selectAllPopupStoreAdmin());
    }

    // 팝업 스토어 상세 조회
    @Operation(summary = "상세 팝업 스토어 조회", description = "팝업 스토어 상세정보를 조회하는 api")
    @GetMapping("/manager-popup/{popupNo}")
    public ResponseEntity<PopupStoreDTO> selectPopupStoreDetails(@PathVariable int popupNo) {
        return ResponseEntity.ok(popupStoreService.selectPopupStoreDetails(popupNo));
    }

    // 팝업 스토어 승인 처리
    @Operation(summary = "팝업스토어 등록 승인", description = "등록 요청한 팝업스토어 승인하는 api")
    @PutMapping("/manager-popup/{popupNo}/approve")
    public ResponseEntity<Void> approvePopup(@PathVariable int popupNo) {
        popupStoreService.approvePopup(popupNo);
        return ResponseEntity.ok().build();
    }

    // 팝업 스토어 반려 처리
    @Operation(summary = "팝업스토어 등록 반려", description = "등록 요청한 팝업스토어 반려하는 api")
    @PutMapping("/manager-popup/{popupNo}/reject")
    public ResponseEntity<Void> rejectPopup(@PathVariable int popupNo, @RequestBody Map<String, String> payload) {
        String rejectionReason = payload.get("rejectionReason");
        popupStoreService.rejectPopup(popupNo, rejectionReason);
        return ResponseEntity.ok().build();
    }

    // 팝업별 예약 조회(집계)
    @Operation(summary = "팝업스토어 예약 조회", description = "팝업스토어의 예약을 조회하는 api")
    @GetMapping("/manager-reservation")
    public ResponseEntity<List<ReservationSummaryDTO>> selectReservationSummary() {
        return ResponseEntity.ok(reservationService.selectReservationSummary());
    }

    // 팝업 스토어 별 예약 내역 조회
    @Operation(summary = "팝업스토어 별 예약 조회", description = "팝업스토어 별 예약을 조회하는 api")
    @GetMapping("/manager-reservation/{popupNo}")
    public ResponseEntity<List<ReservationDetailsDTO>> selectReservationDetailsByPopup(@PathVariable int popupNo) {
        return ResponseEntity.ok(reservationService.selectReservationDetailsByPopup(popupNo));
    }

    // 예약 취소
    @Operation(summary = "팝업스토어 예약 취소", description = "팝업스토어의 예약을 취소하는 api")
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
    @Operation(summary = "User 대시보드 KPI 데이터 조회", description = "User 대시보드 KPI 데이터를 조회하는 api")
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
    @Operation(summary = "Admin 전용 페이지 접속 확인", description = "Admin 전용 페이지 접속을 확인하는 api")
    @GetMapping("/admin/main")
    public ResponseEntity<String> adminMain() {
        // JWT의 ROLE이 'ADMIN'인 경우에만 접근 가능 (SecurityConfig에서 설정)
        return ResponseEntity.ok("Admin 메인페이지");

    }

    // User 대시보드 꺾은 선 차트 방문자 수(전체, 회원, 비회원) 조회
    @Operation(summary = "User 대시보드 방문자 수 조회", description = "User 대시보드 방문자수를 꺾은 선 차트로 조회하는 api")
    @GetMapping("/kpi/daily-visitor-stats")
    public ResponseEntity<List<DailyVisitorDTO>> selectDailyVisitorStats() {
        return ResponseEntity.ok(kpiService.selectDailyVisitorStats());
    }

    // User 대시보드 파이 차트 사용자 행동 유형별 비율 조회
    @Operation(summary = "User 대시보드 사용자 행동 유형별 비율 조회", description = "User 대시보드 사용자 행동 유형별 비율을 파이 차트로 조회하는 api")
    @GetMapping("/event-ratio")
    public ResponseEntity<List<Map<String, Object>>> selectEventTypeRatioByMonth(
            @RequestParam(value = "month", required = false) String month) {

        String targetMonth = month;
        // month 파라미터가 없으면 현재 월을 기본 값으로 설정
        if (targetMonth == null || targetMonth.trim().isEmpty()) {
            targetMonth = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
        }

        return ResponseEntity.ok(kpiService.selectEventTypeRatioByMonth(targetMonth));
    }

    // User 대시보드 막대 차트 인기 검색 키워드 상위 10개 조회(월별)
    @Operation(summary = "User 대시보드 인기검색 키워드 조회", description = "User 대시보드 인기 검색 키워드 상위 10개 막대차트로 조회하는 api")
    @GetMapping("/kpi/top-search-keywords")
    public ResponseEntity<List<SearchKeywordDTO>> selectTop10SearchKeywordsByMonth(@RequestParam("month") String month) {
        return ResponseEntity.ok(kpiService.selectTop10SearchKeywordsByMonth(month));
    }

    // User 대시보드 막대 차트 인기 카테고리 조회(월별)
    @Operation(summary = "User 대시보드 인기 카테고리 조회", description = "User 대시보드 월별 인기 카테고리를 막대차트로 조회하는 api")
    @GetMapping("/kpi/popular-categories")
    public ResponseEntity<List<PopularCategoryDTO>> selectPopularCategoriesByMonth(@RequestParam("month") String month) {
        return ResponseEntity.ok(kpiService.selectPopularCategoriesByMonth(month));
    }

    // Manager 대시보드 KPI 데이터 조회
    @Operation(summary = "Manager 대시보드 KPI 데이터 조회", description = "Manager 대시보드 KPI 데이터를 조회하는 api")
    @GetMapping("/kpi/manager")
    public ResponseEntity<ManagerKpiDTO> selectManagerKpiData() {
        return ResponseEntity.ok(kpiService.selectManagerKpiData());
    }

    // Manager 대시보드 꺾은 선 차트 팝업 상태 집계 조회
    @Operation(summary = "Manager 대시보드 팝업 상태 조회", description = "Manager 대시보드 팝업스토어 상태 집계를 꺾은 선 차트로 조회하는 api")
    @GetMapping("/kpi/popup-status")
    public ResponseEntity<List<PopupStatusDTO>> selectPopupStatusByMonth() {
        return ResponseEntity.ok(kpiService.selectPopupStatusByMonth());
    }

    // Manager 대시보드 파이 차트 반려 사유 집계 조회
    @Operation(summary = "Manager 대시보드 반려 사유 조회", description = "Manager 대시보드 팝업스토어 등록 반려 사유 비율을 파이 차트로 조회하는 api")
    @GetMapping("/kpi/rejection-reasons")
    public ResponseEntity<List<RejectionReasonDTO>> selectRejectionReasonsByMonth(@RequestParam("month") String month) {
        return ResponseEntity.ok(kpiService.selectRejectionReasonsByMonth(month));
    }

    // Manager 대시보드 막대 차트 인기 팝업 조회
    @Operation(summary = "Manager 대시보드 인기 팝업 조회", description = "Manager 대시보드 인기 팝업스토어를 막대차트로 조회하는 api")
    @GetMapping("/kpi/popular-popups")
    public ResponseEntity<List<PopularPopupDTO>> selectPopularPopupByMonth(@RequestParam("yearMonth") String yearMonth) {
        return ResponseEntity.ok(kpiService.selectPopularPopupByMonth(yearMonth));
    }

    // Manager 대시보드 막대 차트 카테고리별 팝업 분포 조회
    @Operation(summary = "Manager 대시보드 카테고리 분포 조회", description = "Manager 대시보드 카테고리 별 팝업스토어를 막대 차트로 조회하는 api")
    @GetMapping("/kpi/category-distribution")
    public ResponseEntity<List<CategoryDistributionDTO>> selectCategoryDistributionByMonth(@RequestParam("yearMonth") String yearMonth) {
        return ResponseEntity.ok(kpiService.selectCategoryDistributionByMonth(yearMonth));
    }
}
