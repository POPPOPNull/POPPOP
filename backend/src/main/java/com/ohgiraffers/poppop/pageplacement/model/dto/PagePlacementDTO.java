package com.ohgiraffers.poppop.pageplacement.model.dto;

public class PagePlacementDTO {

    private String pagePosition;
    private int pageNo;
    private int popupNo;

    public PagePlacementDTO(){}

    public PagePlacementDTO(String pagePosition, int pageNo, int popupNo) {
        this.pagePosition = pagePosition;
        this.pageNo = pageNo;
        this.popupNo = popupNo;
    }

    public String getPagePosition() {
        return pagePosition;
    }

    public void setPagePosition(String pagePosition) {
        this.pagePosition = pagePosition;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getPopupNo() {
        return popupNo;
    }

    public void setPopupNo(int popupNo) {
        this.popupNo = popupNo;
    }

    @Override
    public String toString() {
        return "PagePlacementDTO{" +
                "pagePosition='" + pagePosition + '\'' +
                ", pageNo=" + pageNo +
                ", popupNo=" + popupNo +
                '}';
    }
}
