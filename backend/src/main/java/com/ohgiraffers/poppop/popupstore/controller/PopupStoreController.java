package com.ohgiraffers.poppop.popupstore.controller;

import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import com.ohgiraffers.poppop.popupstore.model.service.PopupStoreService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.*;

@Tag(name="User 계층 팝업스토어 관련 API")
@RestController
@RequestMapping("/popup-stores")
public class PopupStoreController {

    private final PopupStoreService popupStoreService;

    public PopupStoreController(PopupStoreService popupStoreService){
        this.popupStoreService = popupStoreService;
    }



    // 팝업스토어 전체조회 (하단)
    @GetMapping("/lower")
    public ResponseEntity<List<PopupStoreDTO>> selectAllPopupStore(){
        return ResponseEntity
                .ok(new ArrayList<>(popupStoreService.selectAllPopupStore()));
    }

//    // 사용자 선호도 기반 팝업스토어 조회 (상단)
//    @GetMapping("/users/{id}/popup-store/upper")
//    public ResponseEntity<?> selectPopupStoreByUserPreferenceAndPagePlacement(@PathVariable String id){
//
//        return ResponseEntity
//                .created(URI.create(""))
//                .build();
//    }
//
//    // 사용자 선호도 기반 팝업스토어 조회 (하단)
//    @GetMapping("/users/{id}/popup-store/lower")
//    public ResponseEntity<?> selectAllPopupStoreByUserPreference(@PathVariable String id){
//
//        return ResponseEntity
//                .created(URI.create(""))
//                .build();
//    }

    // 팝업스토어 검색조회
    @GetMapping("/search")
    public ResponseEntity<List<PopupStoreDTO>> selectPopupStoreBySearchKeyword(@RequestParam String searchWord){
        System.out.println("searchWord = " + searchWord);
        System.out.println(popupStoreService.selectPopupStoreByKeyword(searchWord));


        return  ResponseEntity.ok(popupStoreService.selectPopupStoreByKeyword(searchWord));
    }

    // 팝업스토어 상세조회
    @GetMapping("/{popupNo}")
    public ResponseEntity<PopupStoreDTO> selectPopupStoreDetails(@PathVariable("popupNo") int popupNo){

        return ResponseEntity
                .ok(popupStoreService.selectPopupStoreDetails(popupNo));
    }
    // 오늘 및 검색어 기준  팝업스토어 조회
    @GetMapping("")
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

    @GetMapping("/favorite")
    public ResponseEntity<List<PopupStoreDTO>> selectFavoritePopupStoreById(@AuthenticationPrincipal UserDetails userDetails){

        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        String id = userDetails.getUsername();


        return ResponseEntity.ok(popupStoreService.selectFavoritePopupStoreById(id));
    }
    //찜한 팝업스토어 번호 가져오기



    // 팝업스토어 랜덤조회
    @GetMapping("/random/{random}")
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

    // 팝업스토어 카테고리 집계
    @GetMapping("/category")
    public ResponseEntity<List<String>> selectAllCategory(){

        List<String> categoryList = popupStoreService.selectAllCategory();
//        System.out.println("categoryList = " + categoryList);

        return ResponseEntity.ok(categoryList);
    }

    // 카테고리별 팝업스토어 조회
    @GetMapping("/category/{category}")
    public ResponseEntity<List<PopupStoreDTO>> selectPopupStoreByCategory(@PathVariable(required = false) String category){

        List<PopupStoreDTO> popupList = popupStoreService.selectPopupStoreByCategory(category);
        ArrayList<Integer> popupNo = new ArrayList<>();
        for(PopupStoreDTO popup : popupList){
            popupNo.add(popup.getNo());
            System.out.println(popup.getNo());
        }
        // 팝업번호들
        System.out.println(popupNo);

        ArrayList<Integer> popups = new ArrayList<>();
        for(int i =0; i<7;i++){
            int random = (int)(Math.random()*popupNo.size());
            int popup = popupNo.get(random);
            popups.add(popup);
        }
        // 카테고리팝업에 default로 보여질 7개의 팝업번호 : popups
        System.out.println("popups = " + popups);

        return ResponseEntity.ok(popupList);
    }

    // 날짜별 팝업스토어 조회
    @GetMapping("/date/{date}")
    public ResponseEntity<List<PopupStoreDTO>> selectPopupByDate(@PathVariable String date){
        System.out.println(date);
        return ResponseEntity.ok(popupStoreService.selectPopupByDate(date));
    }
}
