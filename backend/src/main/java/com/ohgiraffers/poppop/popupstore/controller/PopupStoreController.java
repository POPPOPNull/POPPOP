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
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Controller
public class PopupStoreController {

    private final PopupStoreService popupStoreService;

    public PopupStoreController(PopupStoreService popupStoreService){
        this.popupStoreService = popupStoreService;
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
    // 오늘 및 검색어 기준  팝업스토어 조회
    @GetMapping("/popup-stores")
    public ResponseEntity<List<PopupStoreDTO>> selectPopupStoreToday(
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String status,
            @RequestParam(required = false) String searchWord){
        System.out.println("startDate = " + startDate);
        System.out.println("endDate = " + endDate);
        System.out.println("status = " + status);
        System.out.println("searchWord = " + searchWord);
        List<PopupStoreDTO> list = popupStoreService.selectPopupStoreToday(startDate,endDate,status,searchWord);
        for(PopupStoreDTO a : list){
            System.out.println(a.getStartDate());
        }


        return ResponseEntity.ok(popupStoreService.selectPopupStoreToday(startDate,endDate,status,searchWord));
    }

    // 찜목록 조회
    @GetMapping("/popup-stores/favorite/{id}")
    public ResponseEntity<List<PopupStoreDTO>> selectFavoritePopupStoreById(@PathVariable String id){
        return ResponseEntity.ok(popupStoreService.selectFavoritePopupStoreById(id));
    }

    // 팝업스토어 랜덤조회
    @GetMapping("popup-stores/random/{random}")
    public ResponseEntity<List<PopupStoreDTO>> selectPopupStoreRandomly(@PathVariable ArrayList<Integer> random){
//        List<PopupStoreDTO> list = new ArrayList<>(popupStoreService.selectAllPopupStore());
//
////        for(int i = 0; i<7; i++ ){
////           int randomNo = (int)(Math.random()*list.size())+1;
////            random.add(randomNo);
////        }
////        System.out.println(random);




        return ResponseEntity.ok(popupStoreService.selectPopupStoreRandomly(random));
    }
    // 내 위치랑 가까운 팝업스토어 조회
//    @GetMapping("/popup-stores/maps")
//    public ResponseEntity<List<PopupStoreDTO>> selectPopupStoreNear(
//            @RequestParam("lat") double lat,
//            @RequestParam("lng") double lng,
//            @RequestParam(value="limit", defaultValue = "7") int limit) {
//
//        if (limit <= 0 || limit > 50) limit = 7;
//        List<PopupStoreDTO> nearest = popupStoreService.selectPopupStoreNear(lat, lng, limit);
//        return ResponseEntity.ok(nearest);
//    }
}
