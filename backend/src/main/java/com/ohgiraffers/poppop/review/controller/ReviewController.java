package com.ohgiraffers.poppop.review.controller;

import com.ohgiraffers.poppop.review.model.dto.ReviewDTO;
import com.ohgiraffers.poppop.review.model.service.ReviewService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
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

    public ResponseEntity<ReviewDTO> insertReview(@RequestParam String content, @RequestParam int popupNo, @AuthenticationPrincipal UserDetails userDetails, HttpServletRequest request){

        HttpSession session = request.getSession();
        String sessionId = session.getId();
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        String id = userDetails.getUsername();
        System.out.println("content = " + content);
        System.out.println("id = " + id);
        System.out.println("popupNo = " + popupNo);

        reviewService.insertReview(content,popupNo,id,sessionId);


        return ResponseEntity.created(URI.create("")).build();
    }

    @GetMapping("/myreview")
    public ResponseEntity<List<ReviewDTO>> selectReviewById(
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }

        String memberId = userDetails.getUsername();

        return ResponseEntity.ok(reviewService.selectReviewById(memberId));
    }

    @DeleteMapping("/myreview")
    public ResponseEntity<List<?>> deleteReviewById(@RequestParam int reviewNo, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        String memberId = userDetails.getUsername();

        reviewService.deleteReviewById(reviewNo, memberId);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/myreview/{reviewNo}")
    public ResponseEntity<?> updateReviewById(@PathVariable int reviewNo,
                                              @RequestBody Map<String, String> body,
                                              @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("로그인이 필요합니다.");
        }

        String memberId = userDetails.getUsername();
        String content = body.get("content");

        try {
            ReviewDTO updated = reviewService.updateReviewById(reviewNo, memberId, content);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
