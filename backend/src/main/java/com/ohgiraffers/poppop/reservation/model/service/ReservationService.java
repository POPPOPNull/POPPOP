package com.ohgiraffers.poppop.reservation.model.service;

import com.ohgiraffers.poppop.reservation.model.dao.ReservationMapper;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationDetailsDTO;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationSummaryDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    public void insertReservation (ReservationDetailsDTO dto){

        System.out.println("memberId = " + dto.getMemberId());
        System.out.println("popupNo = " + dto.getPopupNo());
        System.out.println("인원 = " + dto.getReservationPersonnel());
        System.out.println("예약날짜 = " + dto.getReservationDate());
        System.out.println("예약시간 = " + dto.getReservationTime());

        reservationMapper.insertReservation(dto);
    }
}
