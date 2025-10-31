package com.ohgiraffers.poppop.popupstore.controller;

import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import com.ohgiraffers.poppop.popupstore.model.service.PopupStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class PopupStoreController {

    private final PopupStoreService popupStoreService;

    public PopupStoreController(PopupStoreService popupStoreService){
        this.popupStoreService = popupStoreService;
    }

    // page placement에 따른 팝업스토어 조회 (상단)
    @GetMapping("/popup-stores/upper")
    public ResponseEntity<?> selectPopupStoreByPagePlacement(){

        popupStoreService.selectPopupStoreByPagePlacement();

        return ResponseEntity
                .created(URI.create(""))
                .build();
    }

    // 팝업스토어 전체조회 (하단)
    @GetMapping("/popup-stores/lower")
    public ResponseEntity<List<PopupStoreDTO>> selectAllPopupStore(){
        return ResponseEntity
                .ok(new ArrayList<>(popupStoreService.selectAllPopupStore()));
    }

    // 사용자 선호도 기반 팝업스토어 조회 (상단)
    @GetMapping("/users/{id}/popup-store/upper")
    public ResponseEntity<?> selectPopupStoreByUserPreferenceAndPagePlacement(@PathVariable String id){

        return ResponseEntity
                .created(URI.create(""))
                .build();
    }

    // 사용자 선호도 기반 팝업스토어 조회 (하단)
    @GetMapping("/users/{id}/popup-store/lower")
    public ResponseEntity<?> selectAllPopupStoreByUserPreference(@PathVariable String id){

        return ResponseEntity
                .created(URI.create(""))
                .build();
    }

    // 팝업스토어 검색조회
    @GetMapping("/popup-stores/search")
    public ResponseEntity<List<PopupStoreDTO>> selectPopupStoreBySearchKeyword(@RequestParam String searchWord){
        System.out.println("searchWord = " + searchWord);
        System.out.println(popupStoreService.selectPopupStoreByKeyword(searchWord));


        return  ResponseEntity.ok(popupStoreService.selectPopupStoreByKeyword(searchWord));
    }

    // 팝업스토어 상세조회
    @GetMapping("/popup-stores/{popupNo}")
    public ResponseEntity<PopupStoreDTO> selectPopupStoreDetails(@PathVariable("popupNo") int popupNo){

        return ResponseEntity
                .ok(popupStoreService.selectPopupStoreDetails(popupNo));
    }
    // 오늘 기준 팝업스토어 조회
    @GetMapping("/popup-stores")
    public ResponseEntity<List<PopupStoreDTO>> selectPopupStoreToday(@RequestParam String startDate,@RequestParam String endDate, @RequestParam String status){
        System.out.println("startDate = " + startDate);
        System.out.println("endDate = " + endDate);
        System.out.println("status = " + status);


        return ResponseEntity.ok(popupStoreService.selectPopupStoreToday(startDate,endDate,status));
    }

}
