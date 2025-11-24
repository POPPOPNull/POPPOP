package com.ohgiraffers.poppop.popupstore.model.dao;

import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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

}
