package com.ohgiraffers.poppop.reservation.model.service;

import com.ohgiraffers.poppop.reservation.model.dao.ReservationMapper;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationDetailsDTO;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationSummaryDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationMapper reservationMapper;

    private static final int max_count = 100;

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

        reservationMapper.insertReservation(dto);
    }

    public List<ReservationDetailsDTO> getReservationsByMemberId(String memberId) {
        return reservationMapper.selectReservationByMemberId(memberId);
    }

    public boolean cancelReservation(int reservationNo, String memberId) {
        int result = reservationMapper.cancelReservation(reservationNo, memberId);
        return result > 0;
    }


    public List<ReservationDetailsDTO> selectAllReservationsByManager(String managerId) {
        return reservationMapper.selectAllReservationsByManager(managerId);

    public int selectAvailableCount(int popupNo, String reservationDate, String reservationTime) {

        Integer reserved = reservationMapper.selectReservedCount(popupNo, reservationDate, reservationTime);
        if (reserved == null) reserved = 0;

        int result = max_count - reserved;
        return Math.max(result, 0);
    }
}
