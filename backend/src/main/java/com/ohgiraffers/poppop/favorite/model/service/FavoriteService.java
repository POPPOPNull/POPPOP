package com.ohgiraffers.poppop.favorite.model.service;

import com.ohgiraffers.poppop.behavior.model.dao.BehaviorMapper;
import com.ohgiraffers.poppop.favorite.model.dao.FavoriteMapper;

import com.ohgiraffers.poppop.favorite.model.dto.FavoriteDTO;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FavoriteService {
    private final FavoriteMapper favoriteMapper;
    private final BehaviorMapper behaviorMapper;


    public FavoriteService(FavoriteMapper favoriteMapper,BehaviorMapper behaviorMapper) {
        this.favoriteMapper = favoriteMapper;
        this.behaviorMapper = behaviorMapper;
    }


    @Transactional
    public void insetFavoritePopup(int popupNo, String memberId,String sessionId) {
        favoriteMapper.insertFavoritePopup(popupNo,memberId);
        behaviorMapper.insertLogByFavorite(popupNo,sessionId);
    }


    public void deleteFavorite(int popupNo, String id) {
        favoriteMapper.deleteFavorite(popupNo,id);
    }

    public List<Integer> selectFavoritePopupNo(String id) {
        return favoriteMapper.selectFavoritePopupNo(id);
    }
}
