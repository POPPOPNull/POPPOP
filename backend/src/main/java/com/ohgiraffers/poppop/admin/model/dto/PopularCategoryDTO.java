package com.ohgiraffers.poppop.admin.model.dto;

public class PopularCategoryDTO {

    private String categoryName;
    private int eventCount;

    public PopularCategoryDTO() {}

    public PopularCategoryDTO(String categoryName, int eventCount) {
        this.categoryName = categoryName;
        this.eventCount = eventCount;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public int getEventCount() {
        return eventCount;
    }

    public void setEventCount(int eventCount) {
        this.eventCount = eventCount;
    }

    @Override
    public String toString() {
        return "PopularCategoryDTO{" +
                "categoryName='" + categoryName + '\'' +
                ", eventCount=" + eventCount +
                '}';
    }
}
