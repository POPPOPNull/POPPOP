package com.ohgiraffers.poppop.favorite.model.dao;


import com.ohgiraffers.poppop.favorite.model.dto.FavoriteDTO;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FavoriteMapper {

    void insertFavoritePopup(int popupNo, String memberId);


    void deleteFavorite(int popupNo, String id);

    List<Integer> selectFavoritePopupNo(String id);
}
