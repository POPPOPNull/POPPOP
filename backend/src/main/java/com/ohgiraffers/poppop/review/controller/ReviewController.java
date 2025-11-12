package com.ohgiraffers.poppop.review.controller;

import com.ohgiraffers.poppop.review.model.dto.ReviewDTO;
import com.ohgiraffers.poppop.review.model.service.ReviewService;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
=======
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
>>>>>>> JWT/master

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // 팝업스토어 상세 내부 리뷰 조회
    @GetMapping("/review/{popupNo}")
    public ResponseEntity<List<ReviewDTO>> selectReviewByPopupStore(@PathVariable int popupNo){


        return ResponseEntity.ok(reviewService.selectReviewByPopupStore(popupNo));
    }

    // 팝업스토어 리뷰 등록
    @PostMapping("/review/insert")
<<<<<<< HEAD
    public ResponseEntity<ReviewDTO> insertReview(@RequestBody ReviewDTO review){

        System.out.println("review = " + review);

        reviewService.insertReview(review);
=======
    public ResponseEntity<ReviewDTO> insertReview(@RequestParam String content, @RequestParam int popupNo, @AuthenticationPrincipal UserDetails userDetails){

        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        String id = userDetails.getUsername();
        System.out.println("content = " + content);
        System.out.println("id = " + id);
        System.out.println("popupNo = " + popupNo);

        reviewService.insertReview(content,popupNo,id);
>>>>>>> JWT/master

        return ResponseEntity.created(URI.create("")).build();
    }
}
