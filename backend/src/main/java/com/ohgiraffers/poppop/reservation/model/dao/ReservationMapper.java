package com.ohgiraffers.poppop.reservation.model.dao;

import com.ohgiraffers.poppop.reservation.model.dto.ReservationDetailsDTO;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationSummaryDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReservationMapper {

    List<ReservationDetailsDTO> selectAllReservation();

    List<ReservationSummaryDTO> selectReservationSummary();

    List<ReservationDetailsDTO> selectReservationDetailsByPopup(int popupNo);

    int deleteReservationDetails(int reservationNo);
}
