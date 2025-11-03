package com.ohgiraffers.poppop.reservation.model.service;

import com.ohgiraffers.poppop.reservation.model.dao.ReservationMapper;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationDTO;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationSummaryDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    private final ReservationMapper reservationMapper;

    public ReservationService(ReservationMapper reservationMapper) {
        this.reservationMapper = reservationMapper;
    }

    public List<ReservationDTO> selectAllReservation() {
        return reservationMapper.selectAllReservation();
    }

    public List<ReservationSummaryDTO> selectReservationSummary() {
        return reservationMapper.selectReservationSummary();
    }
}
