package com.ohgiraffers.poppop.favorite.controller;

import com.ohgiraffers.poppop.favorite.model.dto.FavoriteDTO;
import com.ohgiraffers.poppop.favorite.model.service.FavoriteService;
import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URI;
import java.util.List;

@Controller
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    // 찜목록 추가
    @PostMapping("/favorite")
    public ResponseEntity<?> insertFavoritePopup(@RequestParam int popupNo, @RequestParam String memberId){
        System.out.println(popupNo);
        System.out.println(memberId);
        favoriteService.insetFavoritePopup(popupNo,memberId);

        return ResponseEntity.created(URI.create("/user")).build();
    }

    // 찜목록 삭제
    @DeleteMapping("/favorite")
    public ResponseEntity<?> deleteFavoritePopup(@RequestParam int popupNo,@RequestParam String id){

        favoriteService.deleteFavorite(popupNo,id);

        return ResponseEntity.created(URI.create("/user")).build();
    }
}
