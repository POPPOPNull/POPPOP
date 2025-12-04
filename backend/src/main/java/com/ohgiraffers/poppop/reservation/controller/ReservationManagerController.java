package com.ohgiraffers.poppop.reservation.controller;

import com.ohgiraffers.poppop.reservation.model.dto.ReservationDetailsDTO;
import com.ohgiraffers.poppop.reservation.model.service.ReservationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Tag(name="Manager 계층 예약 관련 API")
@RestController
@RequestMapping("/manager")
public class ReservationManagerController {

    private final ReservationService reservationService;

    public ReservationManagerController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }


     //GET /manager/reservations
    @GetMapping("/reservations")
    public ResponseEntity<List<ReservationDetailsDTO>> selectAllReservationsByManager(
            @AuthenticationPrincipal UserDetails userDetails) {

        String managerId = userDetails.getUsername();

        List<ReservationDetailsDTO> list =
                reservationService.selectAllReservationsByManager(managerId);

        return ResponseEntity.ok(list);
    }


     //GET /manager/reservations/{popupNo}
    @GetMapping("/reservations/{popupNo}")
    public ResponseEntity<List<ReservationDetailsDTO>> selectReservationsByPopup(
            @PathVariable int popupNo) {

        List<ReservationDetailsDTO> list =
                reservationService.selectReservationDetailsByPopup(popupNo);

        return ResponseEntity.ok(list);
    }
}
