package com.ohgiraffers.poppop.reservation.model.dao;

import com.ohgiraffers.poppop.reservation.model.dto.ReservationDTO;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationSummaryDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReservationMapper {

    List<ReservationDTO> selectAllReservation();

    List<ReservationSummaryDTO> selectReservationSummary();

    List<ReservationDTO> selectReservationDetailsByPopup(int popupNo);

    int deleteReservationDetails(int reservationNo);
}
