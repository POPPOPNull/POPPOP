package com.ohgiraffers.poppop.admin.model.dto;

public class CategoryDistributionDTO {

    private String categoryName;
    private int popupCount;
    private double ratio;

    public CategoryDistributionDTO() {}

    public CategoryDistributionDTO(String categoryName, int popupCount, double ratio) {
        this.categoryName = categoryName;
        this.popupCount = popupCount;
        this.ratio = ratio;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public int getPopupCount() {
        return popupCount;
    }

    public void setPopupCount(int popupCount) {
        this.popupCount = popupCount;
    }

    public double getRatio() {
        return ratio;
    }

    public void setRatio(double ratio) {
        this.ratio = ratio;
    }

    @Override
    public String toString() {
        return "CategoryDistributionDTO{" +
                "categoryName='" + categoryName + '\'' +
                ", popupCount=" + popupCount +
                ", ratio=" + ratio +
                '}';
    }
}
