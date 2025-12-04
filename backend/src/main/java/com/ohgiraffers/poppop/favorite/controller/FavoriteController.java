package com.ohgiraffers.poppop.favorite.controller;

import com.ohgiraffers.poppop.favorite.model.dto.FavoriteDTO;
import com.ohgiraffers.poppop.favorite.model.service.FavoriteService;
import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
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

@RestController
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    // 찜목록 추가
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
