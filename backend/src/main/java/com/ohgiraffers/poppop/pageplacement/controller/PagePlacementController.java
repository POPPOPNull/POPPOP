package com.ohgiraffers.poppop.pageplacement.controller;

import com.ohgiraffers.poppop.pageplacement.model.dto.PagePlacementDTO;
import com.ohgiraffers.poppop.pageplacement.model.service.PagePlacementService;
import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import com.ohgiraffers.poppop.popupstore.model.service.PopupStoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static com.fasterxml.jackson.databind.type.LogicalType.Collection;
@RequestMapping
@Controller
public class PagePlacementController {

    private final PagePlacementService pagePlacementService;
    private final PopupStoreService popupStoreService;

    public PagePlacementController(PagePlacementService pagePlacementService, PopupStoreService popupStoreService){
        this.pagePlacementService = pagePlacementService;
        this.popupStoreService = popupStoreService;
    }

    // 상단 팝업스토어 pageplacment 자동설정
    @PutMapping("/page-placement/top")
    public ResponseEntity<?> updateTopPagePlacement(ArrayList<Integer> randomPopupNo){

        List<PopupStoreDTO> popupStores = popupStoreService.selectAllPopupStore();
        int psNo = popupStores.size();
//        ArrayList<Integer> randomPopupNo = new ArrayList<>();

        for ( int i = 0; i<psNo;i++){
            randomPopupNo.add(i+1);
        }
        Collections.shuffle(Arrays.asList(randomPopupNo));

        System.out.println(randomPopupNo);


        pagePlacementService.updateTopPagePlacement(randomPopupNo);

        return ResponseEntity.created(URI.create("")).build();
    }

    // 상단 팝업스토어 pageplacement 가져오기
    @GetMapping("/page-placement/top")
    public ResponseEntity<List<PagePlacementDTO>> selectTopPagePlacement(){

        System.out.println("상단 placement");
        return ResponseEntity.ok(pagePlacementService.selectTopPagePlacement());
    }
}
