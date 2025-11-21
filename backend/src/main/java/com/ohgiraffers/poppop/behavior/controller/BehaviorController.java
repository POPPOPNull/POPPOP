package com.ohgiraffers.poppop.behavior.controller;

import com.ohgiraffers.poppop.behavior.model.service.BehaviorService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@RequestMapping("/behavior")
public class BehaviorController {

    private final BehaviorService behaviorService;

    public BehaviorController(BehaviorService behaviorService) {
        this.behaviorService = behaviorService;
    }

    @PostMapping("/click")
    public void logDataByClick(@RequestParam String popupNo, HttpServletRequest request){
        HttpSession session = request.getSession();
        String sessionId = session.getId();

        behaviorService.logDataByClick(popupNo,sessionId);
    }

    @PostMapping("/select/{popupNoList}")
    public void logDataBySelect(@PathVariable ArrayList<Integer> popupNoList, HttpServletRequest request){
        HttpSession session = request.getSession();
        String sessionId = session.getId();
        for(int popupNo : popupNoList){
            System.out.println("popupNo = " + popupNo);
        }

        behaviorService.logDataBySelect(popupNoList,sessionId);
    }
}
