package com.ohgiraffers.poppop.pageplacement.model.service;

import com.ohgiraffers.poppop.pageplacement.model.dao.PagePlacementMapper;
import com.ohgiraffers.poppop.pageplacement.model.dto.PagePlacementDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PagePlacementService {

    private final PagePlacementMapper pagePlacementMapper;

    public PagePlacementService(PagePlacementMapper pagePlacementMapper) {
        this.pagePlacementMapper = pagePlacementMapper;
    }

    public List<PagePlacementDTO> selectTopPagePlacement() {
        return pagePlacementMapper.selectTopPagePlacement();
    }

    public void updateTopPagePlacement(ArrayList<Integer> randomPopupNo) {
        pagePlacementMapper.updateTopPagePlacement(randomPopupNo);
    }
}
