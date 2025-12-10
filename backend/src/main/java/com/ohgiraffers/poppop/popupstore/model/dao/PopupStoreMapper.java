package com.ohgiraffers.poppop.popupstore.model.dao;

import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.http.ResponseEntity;

import java.util.*;

@Mapper
public interface PopupStoreMapper {
    PopupStoreDTO selectPopupStoreDetails(int popupNo);

    void selectPopupStoreByPagePlacement();

    List<PopupStoreDTO> selectAllPopupStore();

    List<PopupStoreDTO> selectPopupStoreToday(String startDate, String endDate, String status, String searchWord);

    List<PopupStoreDTO> selectPopupStoreByKeyword(String searchWord);

    List<PopupStoreDTO> selectFavoritePopupStoreById(String id);

    List<PopupStoreDTO> selectPopupStoreRandomly(ArrayList<Integer> random);

    List<String> selectAllCategory();

    List<PopupStoreDTO> selectPopupStoreByCategory(String category);

//    List<PopupStoreDTO> selectPopupStoreNear(double lat, double lng, int limit);

    int approvePopup(int popupNo);

    int rejectPopup(Map<String, Object> params);


    int insertPopupStore(PopupStoreDTO popupStoreDTO);

    List<PopupStoreDTO> selectPopupStoreRandomlyByDate(ArrayList<Integer> random, Object date);

    List<PopupStoreDTO> selectPopupByDate(String date);

    List<PopupStoreDTO> selectMyPopupList(String managerId);

    PopupStoreDTO selectMyPopupDetail(Map<String, Object> params);

    // 매니저 팝업 수정
    int updateMyPopup(PopupStoreDTO popupStoreDTO);

    List<PopupStoreDTO> selectAllPopupStoreAdmin();

    List<PopupStoreDTO> selectPopupByStatus(String status);

    List<Integer> selectAllOpenPopup();

    List<PopupStoreDTO> selectOpenPopupRandomly(Set<Integer> popupNo2);

    List<Integer> selectAllScheduledPopup();

    List<PopupStoreDTO> selectScheduledPopupRandomly(Set<Integer> popupNo2);
}
