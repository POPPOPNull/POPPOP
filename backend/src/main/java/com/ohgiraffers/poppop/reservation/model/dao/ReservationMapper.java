package com.ohgiraffers.poppop.reservation.model.dao;

import com.ohgiraffers.poppop.reservation.model.dto.ReservationDetailsDTO;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationSummaryDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Mapper
public interface ReservationMapper {

    List<ReservationDetailsDTO> selectAllReservation();

    List<ReservationSummaryDTO> selectReservationSummary();

    List<ReservationDetailsDTO> selectReservationDetailsByPopup(int popupNo);

    int deleteReservationDetails(int reservationNo);

    void insertPendingReservation(ReservationDetailsDTO dto);

    void insertReservation(ReservationDetailsDTO dto);

    List<ReservationDetailsDTO> selectReservationByMemberId(@Param("memberId") String memberId);

    int cancelReservation(@Param("reservationNo") int reservationNo,
                          @Param("memberId") String memberId);

    List<ReservationDetailsDTO> selectAllReservationsByManager(@Param("managerId") String managerId);


    Integer selectReservedCount(@Param("popupNo") int popupNo,
                                @Param("reservationDate") String reservationDate,
                                @Param("reservationTime")  String reservationTime);

    int getAlreadyReservedCount(String memberId, int popupNo, LocalDate reservationDate, LocalTime reservationTime);

    Integer findAmountByOrderId(@Param("orderId") String orderId);

    void updateReservationAsPaid(@Param("orderId") String orderId, @Param("paymentKey") String paymentKey);

    String findPaymentKey(@Param("reservationNo") int reservationNo, @Param("memberId") String memberId);

    int deletePendingReservationByOrderId(String orderId);

    int deleteOldPendingReservation(@Param("cutoffTime") java.time.LocalDateTime cutoffTime);
}
