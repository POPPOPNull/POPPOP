package com.ohgiraffers.poppop.review.model.service;

import com.ohgiraffers.poppop.review.model.dao.ReviewMapper;
import com.ohgiraffers.poppop.review.model.dto.ReviewDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewMapper reviewMapper;

    public ReviewService(ReviewMapper reviewMapper) {
        this.reviewMapper = reviewMapper;
    }

    public List<ReviewDTO> selectReviewByPopupStore(int popupNo) {
        return reviewMapper.selectReviewByPopupStore(popupNo);
    }

    public List<ReviewDTO> selectAllReviews() {
        return reviewMapper.selectAllReviews();
    }

    public void insertReview(String content,int popupNo, String id) {
        reviewMapper.insertReview(content,popupNo,id);
    }
}
