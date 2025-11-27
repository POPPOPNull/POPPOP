package com.ohgiraffers.poppop.manager.model.dao;

import com.ohgiraffers.poppop.manager.model.dto.ReservationTrendDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ManagerDashboardMapper {

    int selectTodayReservationCount(@Param("managerId") String managerId,
                                    @Param("popupNo") int popupNo);

    int selectTotalReservationCount(@Param("managerId") String managerId,
                                    @Param("popupNo") int popupNo);

    int selectTotalFavoriteCount(@Param("managerId") String managerId,
                                 @Param("popupNo") int popupNo);

    int selectTotalReviewCount(@Param("managerId") String managerId,
                               @Param("popupNo") int popupNo);

    //1행 최근 7일 예약
    List<ReservationTrendDTO> selectReservationTrend(@Param("popupNo") int popupNo);
}

