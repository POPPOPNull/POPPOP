package com.ohgiraffers.poppop.chatbot.controller;

import com.ohgiraffers.poppop.chatbot.model.dto.ChatbotRequestDTO;
import com.ohgiraffers.poppop.chatbot.model.dto.ChatbotResponseDTO;
import com.ohgiraffers.poppop.chatbot.model.service.ChatbotService;
import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import com.ohgiraffers.poppop.popupstore.model.service.PopupStoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@Tag(name = "Spring Boot Swagger 연동 (user)")
@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;
    private final PopupStoreService popupStoreService;

    public ChatbotController(ChatbotService chatbotService, PopupStoreService popupStoreService) {
        this.chatbotService = chatbotService;
        this.popupStoreService = popupStoreService;
    }

    /**
     * 챗봇 메시지 처리
     */
    @Operation(summary = "챗봇 메시지 처리",description = "챗봇 메시지를 처리한다")
    @PostMapping("/message")
    public ResponseEntity<ChatbotResponseDTO> sendMessage(
            @RequestBody ChatbotRequestDTO request,
            @AuthenticationPrincipal UserDetails userDetails) {

        // 사용자 ID 설정 (로그인한 경우)
        if (userDetails != null) {
            request.setUserId(userDetails.getUsername());
        }

        ChatbotResponseDTO response = chatbotService.processMessage(request);
        return ResponseEntity.ok(response);
    }

    /**
     * 추천 팝업스토어 목록 조회
     */
    @GetMapping("/suggestions")
    public ResponseEntity<List<PopupStoreDTO>> getSuggestions() {
        List<PopupStoreDTO> allPopups = popupStoreService.selectAllPopupStore();

        // 승인된 팝업만 필터링하고 클릭수 기준으로 정렬
        List<PopupStoreDTO> suggestions = allPopups.stream()
                .filter(popup -> "승인".equals(popup.getApprovalStatus()))
                .sorted((p1, p2) -> Integer.compare(p2.getClickCount(), p1.getClickCount()))
                .limit(5)
                .collect(Collectors.toList());

        return ResponseEntity.ok(suggestions);
    }
}
