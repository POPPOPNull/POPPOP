package com.ohgiraffers.poppop.behavior.controller;

import com.ohgiraffers.poppop.behavior.model.service.BehaviorService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/behavior")
public class BehaviorController {

    private final BehaviorService behaviorService;

    public BehaviorController(BehaviorService behaviorService) {
        this.behaviorService = behaviorService;
    }

    // 상세페이지 조회 수 수집
    @PostMapping("/click")
    public void logDataByClick(@RequestParam String popupNo, HttpServletRequest request){
        HttpSession session = request.getSession();
        String sessionId = session.getId();

        behaviorService.logDataByClick(popupNo,sessionId);
    }

    // 노출 수 수집
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
    @PostMapping("/searchWord")
    public void logSearchWord(@RequestParam String searchWord, HttpServletRequest request){
        HttpSession session = request.getSession();
        String sessionId = session.getId();

        behaviorService.logSearchWord(searchWord,sessionId);
    }

    // 조회 수 조회
    @GetMapping("/click/{eventValue}")
    public int countViews(@PathVariable String eventValue){
        System.out.println("eventValue = " + eventValue);
        return behaviorService.countViews(eventValue);

    }
    // 찜수 조회
    @GetMapping("/favorite/{eventValue}")
    public int countFavorite(@PathVariable String eventValue){
        return behaviorService.countFavorite(eventValue);
    }


}
