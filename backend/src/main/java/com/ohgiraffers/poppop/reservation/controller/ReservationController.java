package com.ohgiraffers.poppop.reservation.controller;

import com.ohgiraffers.poppop.reservation.model.dto.ReservationDetailsDTO;
import com.ohgiraffers.poppop.reservation.model.service.ReservationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;


@Tag(name="User 계층 예약 관련 API")
@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Value("${poppop.frontend.url}")
    private String frontendUrl;

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {

        this.reservationService = reservationService;
    }

    /*  // 기존 예약 생성 메소드 (이제 사용되지 않음)
    @PostMapping
    public ResponseEntity<?> insertReservation(@RequestBody ReservationDetailsDTO dto,
                                               @AuthenticationPrincipal UserDetails userDetails,
                                               HttpServletRequest request) {
        // ...
    }
    */

    @PostMapping("/prepare")
    public ResponseEntity<?> prepareReservation(@RequestBody ReservationDetailsDTO dto, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        String memberId = userDetails.getUsername();
        dto.setMemberId(memberId);

        try {
            Map<String, Object> paymentInfo = reservationService.prepareReservation(dto);
            return ResponseEntity.ok(paymentInfo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping
    public Map<String, Integer> selectAvailableCount(@RequestParam int popupNo, @RequestParam String reservationDate, @RequestParam String reservationTime) {
        int availableCount = reservationService.selectAvailableCount(popupNo, reservationDate, reservationTime);

        Map<String, Integer> result = new HashMap<>();
        result.put("availableCount", availableCount);

        return result;
    }

    @GetMapping("/toss-success")
    public ResponseEntity<?> handleTossSuccess(
            @RequestParam String paymentKey,
            @RequestParam String orderId,
            @RequestParam Integer amount,
            HttpServletRequest request
    ) {
        String successUrl = frontendUrl + "/payment-result?success=true";
        String failUrl = frontendUrl + "/payment-result?success=false";

        HttpSession session = request.getSession();
        String sessionId = session.getId();

        try {
            boolean isSuccess = reservationService.confirmTossPayment(paymentKey, orderId, amount, sessionId);
            if(isSuccess) {
                return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(successUrl)).build();
            } else {
                return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(failUrl)).build();
            }
        } catch (Exception e) {
            String errorMessage = URLEncoder.encode(e.getMessage(), StandardCharsets.UTF_8);
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(failUrl + "&message=" + errorMessage)).build();
        }
    }

    @PostMapping("/{reservationNo}/cancel")
    public ResponseEntity<?> cancelPaidReservation(
            @PathVariable int reservationNo,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        String memberId = userDetails.getUsername();

        try {
            reservationService.cancelPaidReservation(reservationNo, memberId);
            return ResponseEntity.ok("예약이 성공적으로 취소되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/pending/{orderId}")
    public ResponseEntity<Void> cancelPendingReservation(@PathVariable String orderId) {
        reservationService.deletePendingReservation(orderId);
        return ResponseEntity.ok().build();
    }
}
