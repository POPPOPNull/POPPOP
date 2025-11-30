package com.ohgiraffers.poppop.behavior.model.dao;

import com.ohgiraffers.poppop.reservation.model.dto.ReservationDetailsDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface BehaviorMapper {
    void insertLogByReview(int popupNo, String sessionId);

    void insertLogByFavorite(int popupNo, String sessionId);

    void logDataByClick(String popupNo, String sessionId);

    void logDataBySelect(ArrayList<Integer> popupNoList, String sessionId);

    int countViews(String eventValue);

    int countFavorite(String eventValue);

    void insertLogByReservation(@Param("popupNo") int popupNo, String sessionId);

    void logSearchWord(String searchWord, String sessionId);
}
