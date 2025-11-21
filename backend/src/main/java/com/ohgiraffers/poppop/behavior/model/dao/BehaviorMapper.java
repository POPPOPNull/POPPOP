package com.ohgiraffers.poppop.behavior.model.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface BehaviorMapper {
    void insertLogByReview(int popupNo, String sessionId);

    void insertLogByFavorite(int popupNo, String sessionId);

    void logDataByClick(String popupNo, String sessionId);

    void logDataBySelect(ArrayList<Integer> popupNoList, String sessionId);
}
