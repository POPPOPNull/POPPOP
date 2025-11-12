package com.ohgiraffers.poppop.favorite.model.service;

import com.ohgiraffers.poppop.favorite.model.dao.FavoriteMapper;
import com.ohgiraffers.poppop.favorite.model.dto.FavoriteDTO;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {
    private final FavoriteMapper favoriteMapper;

    public FavoriteService(FavoriteMapper favoriteMapper) {
        this.favoriteMapper = favoriteMapper;
    }



    public void insetFavoritePopup(int popupNo, String memberId) {
        favoriteMapper.insertFavoritePopup(popupNo,memberId);
    }
}
