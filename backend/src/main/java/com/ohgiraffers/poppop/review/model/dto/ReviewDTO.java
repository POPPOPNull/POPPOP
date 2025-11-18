package com.ohgiraffers.poppop.review.model.dto;

public class ReviewDTO {

    private int reviewNo;
    private String content;
    private int popupNo;
    private String memberId;
    private String reviewDate;
    private String popupName;

    public ReviewDTO (){}

    public ReviewDTO(int reviewNo, String content, int popupNo, String memberId, String reviewDate, String popupName) {

        this.reviewNo = reviewNo;
        this.content = content;
        this.popupNo = popupNo;
        this.memberId = memberId;
        this.reviewDate = reviewDate;
        this.popupName = popupName;

    }

    public int getReviewNo() {
        return reviewNo;
    }

    public void setReviewNo(int reviewNo) {
        this.reviewNo = reviewNo;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getPopupNo() {
        return popupNo;
    }

    public void setPopupNo(int popupNo) {
        this.popupNo = popupNo;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(String reviewDate) {
        this.reviewDate = reviewDate;

    }

    public String getPopupName() {
        return popupName;
    }

    public void setPopupName(String popupName) {
        this.popupName = popupName;
    }

    @Override
    public String toString() {
        return "ReviewDTO{" +
                "reviewNo=" + reviewNo +
                ", content='" + content + '\'' +
                ", popupNo=" + popupNo +
                ", memberId='" + memberId + '\'' +
                ", reviewDate='" + reviewDate + '\'' +
                ", popupName='" + popupName + '\'' +
                '}';
    }
}
