package com.ohgiraffers.poppop.review.model.service;

import com.ohgiraffers.poppop.behavior.model.dao.BehaviorMapper;
import com.ohgiraffers.poppop.review.model.dao.ReviewMapper;
import com.ohgiraffers.poppop.review.model.dto.ReviewDTO;
import com.ohgiraffers.poppop.sample.model.dto.UserDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewMapper reviewMapper;
    private final BehaviorMapper behaviorMapper;

    public ReviewService(ReviewMapper reviewMapper,BehaviorMapper behaviorMapper) {
        this.reviewMapper = reviewMapper;
        this.behaviorMapper = behaviorMapper;
    }

    public List<ReviewDTO> selectReviewByPopupStore(int popupNo) {
        return reviewMapper.selectReviewByPopupStore(popupNo);
    }

    public List<ReviewDTO> selectAllReviews() {
        return reviewMapper.selectAllReviews();
    }


    @Transactional
    public void insertReview(String content,int popupNo, String id,String sessionId) {
        reviewMapper.insertReview(content,popupNo,id);
        behaviorMapper.insertLogByReview(popupNo,sessionId);

    }

    public List<ReviewDTO> selectReviewById(String memberId) {
        return reviewMapper.selectReviewById(memberId);
    }

    public void deleteReviewById(int reviewNo, String memberId) {
        reviewMapper.deleteReviewById(reviewNo, memberId);
    }

    public ReviewDTO updateReviewById(int reviewNo, String memberId, String content) {

        if (content == null || content.isBlank()) {
            throw new IllegalArgumentException("리뷰 내용을 입력해 주세요.");
        }

        int updated = reviewMapper.updateReviewById(reviewNo, memberId, content);

        if (updated == 0) {
            throw new IllegalArgumentException("리뷰를 수정할 수 없습니다.");
        }

        return reviewMapper.selectReviewByNo(reviewNo);
    }
}
