package com.ohgiraffers.poppop.behavior.controller;

import com.ohgiraffers.poppop.behavior.model.service.BehaviorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Tag(name="사용자 행동 데이터 관련 API")
@RestController
@RequestMapping("/behavior")
public class BehaviorController {

    private final BehaviorService behaviorService;

    public BehaviorController(BehaviorService behaviorService) {
        this.behaviorService = behaviorService;
    }

    // 상세페이지 조회 수 수집
    @Operation(summary = "상세페이지 조회 수 수집",description = "팝업스토어 상세 페이지 조회(클릭) 수를 수집하는 api")
    @PostMapping("/click")
    public void logDataByClick(@RequestParam String popupNo, HttpServletRequest request){
        HttpSession session = request.getSession();
        String sessionId = session.getId();

        behaviorService.logDataByClick(popupNo,sessionId);
    }

    // 노출 수 수집
    @Operation(summary = "노출 수 수집",description = "팝업스토어 요약 컴포넌트가 페이지에 렌더 된 수를 수집하는 api")
    @PostMapping("/select/{popupNoList}")
    public void logDataBySelect(@PathVariable ArrayList<Integer> popupNoList, HttpServletRequest request){
        HttpSession session = request.getSession();
        String sessionId = session.getId();
//        for(int popupNo : popupNoList){
//            System.out.println("popupNo = " + popupNo);
//        }

        behaviorService.logDataBySelect(popupNoList,sessionId);
    }

    // 검색키워드
    @Operation(summary = "검색 키워드 수집",description = "팝업스토어 검색 조회 시 입력한 검색 키워드를 수집하는 api")
    @PostMapping("/searchWord")
    public void logSearchWord(@RequestParam String searchWord, HttpServletRequest request){
        HttpSession session = request.getSession();
        String sessionId = session.getId();

        behaviorService.logSearchWord(searchWord,sessionId);
    }

    // 조회 수 조회
    @Operation(summary = "상세페이지 조회 수 조회",description = "팝업스토어 상세 페이지 조회(클릭)수를 조회하는 api")
    @GetMapping("/click/{eventValue}")
    public int countViews(@PathVariable String eventValue){
        System.out.println("eventValue = " + eventValue);
        return behaviorService.countViews(eventValue);

    }
    // 찜수 조회
    @Operation(summary = "관심목록 수 조회",description = "팝업스토어가 관심목록에 추가된 수를 조회하는 api")
    @GetMapping("/favorite/{eventValue}")
    public int countFavorite(@PathVariable String eventValue){
        return behaviorService.countFavorite(eventValue);
    }


}
