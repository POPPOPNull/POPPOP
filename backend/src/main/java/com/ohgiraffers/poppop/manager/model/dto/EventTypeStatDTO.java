package com.ohgiraffers.poppop.manager.model.dto;

public class EventTypeStatDTO {

    private String eventType;
    private int count;

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "EventTypeStatDTO{" +
                "eventType='" + eventType + '\'' +
                ", count=" + count +
                '}';
    }
}
