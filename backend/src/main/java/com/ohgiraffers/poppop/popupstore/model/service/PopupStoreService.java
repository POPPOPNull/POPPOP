package com.ohgiraffers.poppop.popupstore.model.service;

import com.ohgiraffers.poppop.popupstore.model.dao.PopupStoreMapper;
import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PopupStoreService {


    private final PopupStoreMapper popupStoreMapper;

    public PopupStoreService(PopupStoreMapper popupStoreMapper){
        this.popupStoreMapper = popupStoreMapper;
    }

    public void selectPopupStoreByPagePlacement() {
        popupStoreMapper.selectPopupStoreByPagePlacement();

    }

    public List<PopupStoreDTO> selectAllPopupStore() {
        return popupStoreMapper.selectAllPopupStore();
    }

    public PopupStoreDTO selectPopupStoreDetails(int popupNo) {
        return popupStoreMapper.selectPopupStoreDetails(popupNo);
    }
}
