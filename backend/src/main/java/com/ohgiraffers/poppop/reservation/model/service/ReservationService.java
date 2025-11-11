package com.ohgiraffers.poppop.reservation.model.service;

import com.ohgiraffers.poppop.reservation.model.dao.ReservationMapper;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationDetailsDTO;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationSummaryDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    private final ReservationMapper reservationMapper;

    public ReservationService(ReservationMapper reservationMapper) {
        this.reservationMapper = reservationMapper;
    }

    public List<ReservationDetailsDTO> selectAllReservation() {
        return reservationMapper.selectAllReservation();
    }

    public List<ReservationSummaryDTO> selectReservationSummary() {
        return reservationMapper.selectReservationSummary();
    }

    public List<ReservationDetailsDTO> selectReservationDetailsByPopup(int popupNo) {
        return reservationMapper.selectReservationDetailsByPopup(popupNo);
    }

    public void deleteReservationDetails(int reservationNo) {
        int result = reservationMapper.deleteReservationDetails(reservationNo);

        if (result == 0) {
            throw new IllegalArgumentException("해당 예약을 찾을 수 없어 취소에 실패했습니다.");
        }
    }
}
