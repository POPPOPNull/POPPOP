package com.ohgiraffers.poppop.favorite.controller;

import com.ohgiraffers.poppop.favorite.model.dto.FavoriteDTO;
import com.ohgiraffers.poppop.favorite.model.service.FavoriteService;
import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@Controller
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    // 찜목록 추가
    @PostMapping("/favorite")
    public ResponseEntity<?> insertFavoritePopup(@RequestParam int popupNo, @AuthenticationPrincipal UserDetails userDetails){

        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String memberId = userDetails.getUsername();

        System.out.println(popupNo);
        System.out.println(memberId);
        favoriteService.insetFavoritePopup(popupNo,memberId);

        return ResponseEntity.created(URI.create("/user")).build();
    }
}
