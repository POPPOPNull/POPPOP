package com.ohgiraffers.poppop.favorite.controller;

import com.ohgiraffers.poppop.favorite.model.dto.FavoriteDTO;
import com.ohgiraffers.poppop.favorite.model.service.FavoriteService;
import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
=======
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
>>>>>>> JWT/master
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URI;
<<<<<<< HEAD
=======
import java.security.Principal;
>>>>>>> JWT/master
import java.util.List;

@Controller
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    // 찜목록 추가
    @PostMapping("/favorite")
<<<<<<< HEAD
    public ResponseEntity<?> insertFavoritePopup(@RequestParam int popupNo, @RequestParam String memberId){
        System.out.println(popupNo);
        System.out.println(memberId);
=======
    public ResponseEntity<?> insertFavoritePopup(@RequestParam int popupNo, @AuthenticationPrincipal UserDetails userDetails){

        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String memberId = userDetails.getUsername();

        System.out.println(popupNo);
        System.out.println(memberId);

>>>>>>> JWT/master
        favoriteService.insetFavoritePopup(popupNo,memberId);

        return ResponseEntity.created(URI.create("/user")).build();
    }
<<<<<<< HEAD

    // 찜목록 삭제
    @DeleteMapping("/favorite")
    public ResponseEntity<?> deleteFavoritePopup(@RequestParam int popupNo,@RequestParam String id){

        favoriteService.deleteFavorite(popupNo,id);

        return ResponseEntity.created(URI.create("/user")).build();
    }
=======
>>>>>>> JWT/master
}
