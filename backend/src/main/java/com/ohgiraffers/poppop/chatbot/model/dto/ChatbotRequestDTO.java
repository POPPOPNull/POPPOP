package com.ohgiraffers.poppop.chatbot.model.dto;

public class ChatbotRequestDTO {

    private String message;
    private String userId;

    public ChatbotRequestDTO() {
    }

    public ChatbotRequestDTO(String message, String userId) {
        this.message = message;
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "ChatbotRequestDTO{" +
                "message='" + message + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
