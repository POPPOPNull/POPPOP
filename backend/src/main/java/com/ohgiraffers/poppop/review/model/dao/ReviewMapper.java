package com.ohgiraffers.poppop.review.model.dao;

import com.ohgiraffers.poppop.review.model.dto.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {
    List<ReviewDTO> selectReviewByPopupStore(int popupNo);

    List<ReviewDTO> selectAllReviews();

<<<<<<< HEAD
    void insertReview(ReviewDTO review);
=======
    void insertReview(String content, int popupNo, String id);
>>>>>>> JWT/master
}
