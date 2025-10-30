package com.ohgiraffers.poppop.review.controller;

import com.ohgiraffers.poppop.review.model.dto.ReviewDTO;
import com.ohgiraffers.poppop.review.model.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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

        List<ReviewDTO> test = new ArrayList<>(reviewService.selectReviewByPopupStore(1));
        System.out.println("test = " + test);
        return ResponseEntity.ok(reviewService.selectReviewByPopupStore(popupNo));
    }
}
