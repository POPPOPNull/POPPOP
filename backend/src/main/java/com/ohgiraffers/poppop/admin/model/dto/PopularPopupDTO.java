package com.ohgiraffers.poppop.admin.model.dto;

public class PopularPopupDTO {

    private String popupName;
    private int eventCount;

    public PopularPopupDTO() {}

    public PopularPopupDTO(String popupName, int eventCount) {
        this.popupName = popupName;
        this.eventCount = eventCount;
    }

    public String getPopupName() {
        return popupName;
    }

    public void setPopupName(String popupName) {
        this.popupName = popupName;
    }

    public int getEventCount() {
        return eventCount;
    }

    public void setEventCount(int eventCount) {
        this.eventCount = eventCount;
    }

    @Override
    public String toString() {
        return "PopularPopupDTO{" +
                "popupName='" + popupName + '\'' +
                ", eventCount=" + eventCount +
                '}';
    }
}
