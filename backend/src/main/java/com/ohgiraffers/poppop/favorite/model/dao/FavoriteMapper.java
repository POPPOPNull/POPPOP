package com.ohgiraffers.poppop.favorite.model.dao;

import com.ohgiraffers.poppop.favorite.model.dto.FavoriteDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FavoriteMapper {

    void insertFavoritePopup(int popupNo, String memberId);
}
