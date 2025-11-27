package com.ohgiraffers.poppop.reservation.controller;

import com.ohgiraffers.poppop.reservation.model.dto.ReservationDetailsDTO;
import com.ohgiraffers.poppop.reservation.model.service.ReservationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {

        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<?> insertReservation(@RequestBody ReservationDetailsDTO dto,
                                               @AuthenticationPrincipal UserDetails userDetails,
                                               HttpServletRequest request) {

        HttpSession session = request.getSession();
        String sessionId = session.getId();
        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String memberId = userDetails.getUsername();

        dto.setMemberId(memberId);

        reservationService.insertReservation(dto, sessionId);

        return ResponseEntity.ok("예약이 완료되었습니다.");
    }

    @GetMapping
    public Map<String, Integer> selectAvailableCount(@RequestParam int popupNo, @RequestParam String reservationDate, @RequestParam String reservationTime) {
        int availableCount = reservationService.selectAvailableCount(popupNo, reservationDate, reservationTime);

        Map<String, Integer> result = new HashMap<>();
        result.put("availableCount", availableCount);

        return result;
    }
}
