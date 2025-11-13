package com.ohgiraffers.poppop.popupstore.model.service;

import com.ohgiraffers.poppop.popupstore.model.dao.PopupStoreMapper;
import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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

    public List<PopupStoreDTO> selectPopupStoreToday(String startDate, String endDate, String status, String searchWord) {
        return popupStoreMapper.selectPopupStoreToday(startDate,endDate,status,searchWord);
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

    public List<String> selectAllCategory() {
        return popupStoreMapper.selectAllCategory();
    }

    public List<PopupStoreDTO> selectPopupStoreByCategory(String category) {
        return popupStoreMapper.selectPopupStoreByCategory(category);
    }

    public void approvePopup(int popupNo) {
        popupStoreMapper.approvePopup(popupNo);
    }

    public void rejectPopup(int popupNo, String rejectionReason) {
        Map<String, Object> params = new HashMap<>();
        params.put("popupNo", popupNo);
        params.put("rejectionReason", rejectionReason);
        popupStoreMapper.rejectPopup(params);
    }


    @Transactional
    public void requestPopupRegister(PopupStoreDTO dto, String managerId) {

        // 로그인한 매니저 ID
        dto.setId(managerId);

        dto.setApprovalStatus("대기");

        popupStoreMapper.insertPopupStore(dto);
    }


}
