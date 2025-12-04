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


    public List<PopupStoreDTO> selectPopupStoreRandomlyByDate(ArrayList<Integer> random, Object date) {
        return popupStoreMapper.selectPopupStoreRandomlyByDate(random,date);
    }


    public List<PopupStoreDTO> selectPopupByDate(String date) {
        return popupStoreMapper.selectPopupByDate(date);
    }

//    public List<PopupStoreDTO> getMyPopupList(String managerId) {
//        return popupStoreMapper.selectMyPopupList(managerId);
//    }

    public List<PopupStoreDTO> getMyPopupList(String managerId) {
        List<PopupStoreDTO> list = popupStoreMapper.selectMyPopupList(managerId);
        if (list == null) {
            list = new ArrayList<>();
        }
        return list;
    }
    public PopupStoreDTO getMyPopupDetail(String managerId, int popupNo) {
        Map<String,Object> params = new HashMap<>();
        params.put("managerId", managerId);
        params.put("popupNo", popupNo);
        return popupStoreMapper.selectMyPopupDetail(params);
    }
    // 매니저 팝업 수정
    @Transactional
    public void updateMyPopup(int popupNo, String managerId, PopupStoreDTO dto) {
        dto.setNo(popupNo);      // WHERE popup_no = #{no}
        dto.setId(managerId);    // WHERE id = #{id}

        int result = popupStoreMapper.updateMyPopup(dto);
        if (result == 0) {
            throw new IllegalArgumentException("본인의 팝업만 수정할 수 있습니다.");
        }
    }

    // Admin 팝업 스토어 전체 조회
    public List<PopupStoreDTO> selectAllPopupStoreAdmin() {
        return popupStoreMapper.selectAllPopupStoreAdmin();
    }

}


