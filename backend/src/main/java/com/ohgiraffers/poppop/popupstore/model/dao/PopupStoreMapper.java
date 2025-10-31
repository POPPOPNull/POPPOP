package com.ohgiraffers.poppop.popupstore.model.dao;

import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Date;
import java.util.List;

@Mapper
public interface PopupStoreMapper {
    PopupStoreDTO selectPopupStoreDetails(int popupNo);

    void selectPopupStoreByPagePlacement();

    List<PopupStoreDTO> selectAllPopupStore();

    List<PopupStoreDTO> selectPopupStoreToday(String startDate, String endDate, String status);

    List<PopupStoreDTO> selectPopupStoreByKeyword(String searchWord);
}
