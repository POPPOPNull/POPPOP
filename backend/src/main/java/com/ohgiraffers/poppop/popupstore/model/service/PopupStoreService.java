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

//    public List<PopupStoreDTO> selectPopupStoreNear(double lat, double lng, int limit) {
//        return popupStoreMapper.selectPopupStoreNear(lat, lng, limit);
//    }

    public void selectPopupStoreByPagePlacement() {
        popupStoreMapper.selectPopupStoreByPagePlacement();

    }

    public List<PopupStoreDTO> selectAllPopupStore() {
        return popupStoreMapper.selectAllPopupStore();
    }

    public PopupStoreDTO selectPopupStoreDetails(int popupNo) {
        return popupStoreMapper.selectPopupStoreDetails(popupNo);
    }

    public List<PopupStoreDTO> selectPopupStoreToday(String startDate, String endDate, String status) {
        return popupStoreMapper.selectPopupStoreToday(startDate,endDate,status);
    }

    public List<PopupStoreDTO> selectPopupStoreByKeyword(String searchWord) {
        return popupStoreMapper.selectPopupStoreByKeyword(searchWord);
    }

    public List<PopupStoreDTO> selectFavoritePopupStoreById(String id) {
        return popupStoreMapper.selectFavoritePopupStoreById(id);
    }

    public List<PopupStoreDTO> selectPopupStoreRandomly(ArrayList<Integer> random) {
        return popupStoreMapper.selectPopupStoreRandomly(random);
    }
}
