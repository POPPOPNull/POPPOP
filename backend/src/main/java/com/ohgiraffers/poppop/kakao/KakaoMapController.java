package com.ohgiraffers.poppop.kakao;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    public ResponseEntity<JsonNode> searchAddress(@RequestParam String query) throws Exception {
        String resultJson = kakaoMapService.searchAddress(query);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(resultJson); // JSON 문자열 → JsonNode

        return ResponseEntity.ok(jsonNode); // Spring이 자동으로 JSON으로 직렬화
    }
}
