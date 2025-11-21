package com.ohgiraffers.poppop.behavior.model.service;

import com.ohgiraffers.poppop.behavior.model.dao.BehaviorMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BehaviorService {

    private final BehaviorMapper behaviorMapper;

    public BehaviorService(BehaviorMapper behaviorMapper) {
        this.behaviorMapper = behaviorMapper;
    }

    public void logDataByClick(String popupNo, String sessionId) {
        behaviorMapper.logDataByClick(popupNo,sessionId);
    }

    public void logDataBySelect(ArrayList<Integer> popupNoList, String sessionId) {
        behaviorMapper.logDataBySelect(popupNoList,sessionId);
    }
}
