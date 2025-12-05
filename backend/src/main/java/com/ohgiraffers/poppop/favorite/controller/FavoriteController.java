package com.ohgiraffers.poppop.favorite.controller;

import com.ohgiraffers.poppop.favorite.model.dto.FavoriteDTO;
import com.ohgiraffers.poppop.favorite.model.service.FavoriteService;
import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.net.URI;

import java.security.Principal;

import java.util.ArrayList;
import java.util.List;

@Tag(name="관심목록 관련 API")
@RestController
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    // 찜목록 추가
    @Operation(summary = "관심목록 추가",description = "팝업스토어를 관심목록에 추가하는 api")
    @PostMapping("/favorite")
    public ResponseEntity<?> insertFavoritePopup(@RequestParam int popupNo, @AuthenticationPrincipal UserDetails userDetails, HttpServletRequest request){
        HttpSession session = request.getSession();
        String sessionId = session.getId();

        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String memberId = userDetails.getUsername();

        System.out.println(popupNo);
        System.out.println(memberId);


        favoriteService.insetFavoritePopup(popupNo,memberId,sessionId);

        return ResponseEntity.created(URI.create("/user")).build();
    }

    // 찜목록 삭제
    @Operation(summary = "관심목록 제거",description = "팝업스토어를 관심목록에서 제거하는 api")
    @DeleteMapping("/favorite")
    public ResponseEntity<?> deleteFavoritePopup(@RequestParam int popupNo, @AuthenticationPrincipal UserDetails userDetails){

        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String id = userDetails.getUsername();



        favoriteService.deleteFavorite(popupNo,id);

        return ResponseEntity.created(URI.create("/user")).build();
    }

    //찜 번호 가져오기
    @Operation(summary = "관심 팝업스토어 번호 조회",description = "관심목록 내에 있는 팝업스토어의 번호를 조회하는 api")
    @GetMapping("/favorite/no")
    public ResponseEntity<List<Integer>> selectFavoritePopupNo(@AuthenticationPrincipal UserDetails userDetails){
        if (userDetails == null) {
            return ResponseEntity.status(401).body(new ArrayList<>());
        }
        String id = userDetails.getUsername();

        List<Integer> list = favoriteService.selectFavoritePopupNo(id);
        for(Integer no : list){
            System.out.println("찜한 팝업번호"+no);
        }
        System.out.println(list);

        return ResponseEntity.ok(list);
    }

}
