package com.ohgiraffers.poppop.popupstore.controller;

import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import com.ohgiraffers.poppop.popupstore.model.service.PopupStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/manager")
public class PopupStoreManagerController {

    private final PopupStoreService popupStoreService;

    @Autowired
    public PopupStoreManagerController(PopupStoreService popupStoreService) {
        this.popupStoreService = popupStoreService;
    }

    // 🟡 팝업 등록
    @PostMapping("/popup-stores")
    public ResponseEntity<?> requestPopupRegister(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody PopupStoreDTO dto) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("로그인이 필요합니다.");
        }

        // 로그인한 매니저 아이디 추출
        String managerId = userDetails.getUsername();

        // 서비스 호출
        popupStoreService.requestPopupRegister(dto, managerId);

        return ResponseEntity.ok("팝업 등록 요청 완료 (승인 대기)");
    }
}

