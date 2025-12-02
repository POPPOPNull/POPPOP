package com.ohgiraffers.poppop.chatbot.model.dto;

import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import java.util.List;

public class ChatbotResponseDTO {

    private String message;
    private String actionType; // "text", "popup_list", "category_list"
    private List<PopupStoreDTO> popupStores;
    private List<String> suggestions;

    public ChatbotResponseDTO() {
    }

    public ChatbotResponseDTO(String message, String actionType) {
        this.message = message;
        this.actionType = actionType;
    }

    public ChatbotResponseDTO(String message, String actionType, List<PopupStoreDTO> popupStores) {
        this.message = message;
        this.actionType = actionType;
        this.popupStores = popupStores;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public List<PopupStoreDTO> getPopupStores() {
        return popupStores;
    }

    public void setPopupStores(List<PopupStoreDTO> popupStores) {
        this.popupStores = popupStores;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }

    @Override
    public String toString() {
        return "ChatbotResponseDTO{" +
                "message='" + message + '\'' +
                ", actionType='" + actionType + '\'' +
                ", popupStores=" + popupStores +
                ", suggestions=" + suggestions +
                '}';
    }
}
