package com.ohgiraffers.poppop.mypage.controller;

import com.ohgiraffers.poppop.jwt.security.JwtTokenProvider;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationDetailsDTO;
import com.ohgiraffers.poppop.reservation.model.service.ReservationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@Controller
public class MyPageController {

    private final ReservationService reservationService;
    private final JwtTokenProvider jwtTokenProvider;

    public MyPageController(ReservationService reservationService, JwtTokenProvider jwtTokenProvider) {
        this.reservationService = reservationService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/myreservation")
    public ResponseEntity<?> getMyReservations(@AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("로그인이 필요합니다.");
        }

        String memberId = userDetails.getUsername();

        List<ReservationDetailsDTO> reservations =
                reservationService.getReservationsByMemberId(memberId);

        return ResponseEntity.ok(reservations);
    }

    @PutMapping("/myreservation/{reservationNo}/cancel")
    public ResponseEntity<?> cancelReservation(@PathVariable int reservationNo, @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("로그인이 필요합니다.");
        }

        String memberId = userDetails.getUsername();


        boolean result = reservationService.cancelReservation(reservationNo, memberId);

        if (result) {
            return ResponseEntity.ok("예약이 취소되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("예약을 취소할 수 없습니다.");
        }
    }
}