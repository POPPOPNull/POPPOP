package com.ohgiraffers.poppop.kakao;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kakao")
public class KakaoMapController {

    private final KakaoMapService kakaoMapService;

    public KakaoMapController(KakaoMapService kakaoMapService) {
        this.kakaoMapService = kakaoMapService;
    }

    @GetMapping("/address")
    public ResponseEntity<String> searchAddress(@RequestParam String query) {
        String resultJson = kakaoMapService.searchAddress(query);
        return ResponseEntity.ok(resultJson);
    }
}
