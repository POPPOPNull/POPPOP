package com.ohgiraffers.poppop.behavior.model.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BehaviorMapper {
    void insertLogByReview(int popupNo, String sessionId);

    void insertLogByFavorite(int popupNo, String sessionId);
}
