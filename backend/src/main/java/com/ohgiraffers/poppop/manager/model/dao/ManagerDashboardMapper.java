package com.ohgiraffers.poppop.manager.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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
}

