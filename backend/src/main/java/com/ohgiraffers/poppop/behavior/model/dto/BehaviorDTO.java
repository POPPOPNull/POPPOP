package com.ohgiraffers.poppop.behavior.model.dto;

import java.sql.Time;

public class BehaviorDTO {

    private int no;
    private String sessionId;
    private String eventType;
    private String eventValue;
    private String timeStamp;

    public BehaviorDTO(){};

    public BehaviorDTO(int no, String sessionId, String eventType, String eventValue, String timeStamp) {
        this.no = no;
        this.sessionId = sessionId;
        this.eventType = eventType;
        this.eventValue = eventValue;
        this.timeStamp = timeStamp;
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getEventValue() {
        return eventValue;
    }

    public void setEventValue(String eventValue) {
        this.eventValue = eventValue;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    @Override
    public String toString() {
        return "BehaviorDTO{" +
                "no=" + no +
                ", sessionId='" + sessionId + '\'' +
                ", eventType='" + eventType + '\'' +
                ", eventValue='" + eventValue + '\'' +
                ", timeStamp='" + timeStamp + '\'' +
                '}';
    }
}
