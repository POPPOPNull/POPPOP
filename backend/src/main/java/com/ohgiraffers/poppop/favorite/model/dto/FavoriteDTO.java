package com.ohgiraffers.poppop.favorite.model.dto;

public class FavoriteDTO {

    private int favoriteNo;
    private int popupNo;
    private String memberId;

    public FavoriteDTO(){}

    public FavoriteDTO(int favoriteNo, int popupNo, String memberId) {
        this.favoriteNo = favoriteNo;
        this.popupNo = popupNo;
        this.memberId = memberId;
    }

    public int getFavoriteNo() {
        return favoriteNo;
    }

    public void setFavoriteNo(int favoriteNo) {
        this.favoriteNo = favoriteNo;
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

    @Override
    public String toString() {
        return "FavoriteDTO{" +
                "favoriteNo=" + favoriteNo +
                ", popupNo=" + popupNo +
                ", memberId='" + memberId + '\'' +
                '}';
    }
}
