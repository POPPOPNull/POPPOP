package com.ohgiraffers.poppop.review.model.dao;

import com.ohgiraffers.poppop.review.model.dto.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReviewMapper {
    List<ReviewDTO> selectReviewByPopupStore(int popupNo);

    List<ReviewDTO> selectAllReviews();


    void insertReview(String content, int popupNo, String id);

    List<ReviewDTO> selectReviewById(String memberId);

    void deleteReviewById(int reviewNo, String memberId);

    ReviewDTO selectReviewByNo(@Param("reviewNo") int reviewNo);

    int updateReviewById(@Param("reviewNo")int reviewNo, @Param("memberId")String memberId, @Param("content")String content);
}
