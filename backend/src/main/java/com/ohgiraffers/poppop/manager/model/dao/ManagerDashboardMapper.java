package com.ohgiraffers.poppop.manager.model.dao;

import com.ohgiraffers.poppop.manager.model.dto.EventTypeStatDTO;
import com.ohgiraffers.poppop.manager.model.dto.GenderReservationDTO;
import com.ohgiraffers.poppop.manager.model.dto.ReservationTrendDTO;
import com.ohgiraffers.poppop.manager.model.dto.WeekdayReservationDTO;
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

    // 2행 요일별 예약 패턴
    List<WeekdayReservationDTO> selectWeekdayReservations(@Param("popupNo") int popupNo);

    // 2행 예약자 성별 비율
    List<GenderReservationDTO> selectGenderRatio(@Param("popupNo") int popupNo);

    //1행 사용자 행동 타입
    List<EventTypeStatDTO> selectEventTypeStats(int popupNo);
}

