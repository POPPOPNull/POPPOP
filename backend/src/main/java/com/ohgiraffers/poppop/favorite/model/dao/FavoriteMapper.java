package com.ohgiraffers.poppop.favorite.model.dao;

<<<<<<< HEAD
=======
import com.ohgiraffers.poppop.favorite.model.dto.FavoriteDTO;
>>>>>>> JWT/master
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FavoriteMapper {

    void insertFavoritePopup(int popupNo, String memberId);
<<<<<<< HEAD

    void deleteFavorite(int popupNo, String id);
=======
>>>>>>> JWT/master
}
