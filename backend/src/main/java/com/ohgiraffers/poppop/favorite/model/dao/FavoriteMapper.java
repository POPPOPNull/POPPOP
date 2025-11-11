package com.ohgiraffers.poppop.favorite.model.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FavoriteMapper {

    void insertFavoritePopup(int popupNo, String memberId);

    void deleteFavorite(int popupNo, String id);
}
