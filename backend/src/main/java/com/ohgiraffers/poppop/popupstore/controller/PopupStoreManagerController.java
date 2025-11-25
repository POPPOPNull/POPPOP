package com.ohgiraffers.poppop.popupstore.controller;

import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import com.ohgiraffers.poppop.popupstore.model.service.PopupStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/manager")
public class PopupStoreManagerController {

    private final PopupStoreService popupStoreService;

    @Autowired
    public PopupStoreManagerController(PopupStoreService popupStoreService) {
        this.popupStoreService = popupStoreService;
    }

    //팝업 등록 POST /manager/popup-stores
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

    //나의 팝업스토어 목록 조회  →  GET /manager/mypopup
    @GetMapping("/mypopup")
    public ResponseEntity<List<PopupStoreDTO>> getMyPopupList(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String managerId = userDetails.getUsername();
        List<PopupStoreDTO> list = popupStoreService.getMyPopupList(managerId);

        return ResponseEntity.ok(list);   // list가 비어 있어도 그냥 [] 로 나감
    }

    @GetMapping("/mypopup/{popupNo}")
    public ResponseEntity<?> getMyPopupDetail(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable int popupNo
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("로그인이 필요합니다.");
        }

        String managerId = userDetails.getUsername();
        PopupStoreDTO dto = popupStoreService.getMyPopupDetail(managerId, popupNo);

        if (dto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("해당 팝업을 찾을 수 없습니다.");
        }

        return ResponseEntity.ok(dto);
    }
}

