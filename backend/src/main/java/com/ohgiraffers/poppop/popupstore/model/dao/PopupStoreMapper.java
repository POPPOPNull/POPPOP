package com.ohgiraffers.poppop.popupstore.model.dao;

import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface PopupStoreMapper {
    PopupStoreDTO selectPopupStoreDetails(int popupNo);

    void selectPopupStoreByPagePlacement();

    List<PopupStoreDTO> selectAllPopupStore();

    List<PopupStoreDTO> selectPopupStoreToday(String startDate, String endDate, String status);

    List<PopupStoreDTO> selectPopupStoreByKeyword(String searchWord);

    List<PopupStoreDTO> selectFavoritePopupStoreById(String id);

    List<PopupStoreDTO> selectPopupStoreRandomly(ArrayList<Integer> random);

//    List<PopupStoreDTO> selectPopupStoreNear(double lat, double lng, int limit);
}
