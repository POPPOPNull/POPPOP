package com.ohgiraffers.poppop.popupstore.model.dao;

import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface PopupStoreMapper {
    void selectPopupStoreDetails();

    void selectPopupStoreByPagePlacement();

    List<PopupStoreDTO> selectAllPopupStore();
}
