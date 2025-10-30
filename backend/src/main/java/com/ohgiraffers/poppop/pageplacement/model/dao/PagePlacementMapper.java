package com.ohgiraffers.poppop.pageplacement.model.dao;

import com.ohgiraffers.poppop.pageplacement.model.dto.PagePlacementDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface PagePlacementMapper {
    List<PagePlacementDTO> selectTopPagePlacement();

    void updateTopPagePlacement(ArrayList<Integer> randomPopupNo);
}
