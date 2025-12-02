package com.ohgiraffers.poppop.chatbot.model.service;

import com.ohgiraffers.poppop.chatbot.model.dto.ChatbotRequestDTO;
import com.ohgiraffers.poppop.chatbot.model.dto.ChatbotResponseDTO;
import com.ohgiraffers.poppop.popupstore.model.dto.PopupStoreDTO;
import com.ohgiraffers.poppop.popupstore.model.service.PopupStoreService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ChatbotService {

    private final PopupStoreService popupStoreService;

    public ChatbotService(PopupStoreService popupStoreService) {
        this.popupStoreService = popupStoreService;
    }

    /**
     * 사용자 메시지를 분석하고 적절한 응답 반환
     */
    public ChatbotResponseDTO processMessage(ChatbotRequestDTO request) {
        String message = request.getMessage().toLowerCase().trim();

        // 인사말 처리
        if (isGreeting(message)) {
            return createTextResponse("안녕하세요! 팝업스토어 검색을 도와드릴게요. 😊\n\n" +
                    "• 지역으로 검색: '강남 팝업', '홍대 팝업스토어'\n" +
                    "• 카테고리로 검색: '패션 팝업', '뷰티 팝업'\n" +
                    "• 추천 받기: '추천해줘', '인기 팝업'\n\n" +
                    "무엇을 도와드릴까요?");
        }

        // 추천 요청 처리
        if (isRecommendationRequest(message)) {
            return getRecommendations();
        }

        // 카테고리 검색 처리
        String category = extractCategory(message);
        if (category != null) {
            return searchByCategory(category);
        }

        // 지역 검색 처리
        String location = extractLocation(message);
        if (location != null) {
            return searchByLocation(location);
        }

        // 키워드 검색 처리
        if (isSearchRequest(message)) {
            String keyword = extractSearchKeyword(message);
            return searchByKeyword(keyword);
        }

        // 도움말 요청
        if (isHelpRequest(message)) {
            return createTextResponse("다음과 같이 검색하실 수 있어요:\n\n" +
                    "📍 지역 검색: '강남', '홍대', '명동' 등\n" +
                    "🏷️ 카테고리: '패션', '뷰티', '음식', 'K-POP' 등\n" +
                    "⭐ 추천: '추천해줘', '인기 팝업'\n" +
                    "🔍 키워드: 브랜드명이나 팝업스토어 이름");
        }

        // 기본 응답
        return createTextResponse("죄송해요, 잘 이해하지 못했어요. 😅\n\n" +
                "지역, 카테고리, 또는 키워드로 검색해보세요!\n" +
                "예: '강남 팝업', '패션 팝업', '추천해줘'");
    }

    /**
     * 인기 팝업스토어 추천
     */
    private ChatbotResponseDTO getRecommendations() {
        List<PopupStoreDTO> allPopups = popupStoreService.selectAllPopupStore();

        if (allPopups == null || allPopups.isEmpty()) {
            return createTextResponse("현재 진행 중인 팝업스토어가 없어요. 😢");
        }

        // 승인된 팝업만 필터링하고 클릭수 기준으로 정렬
        List<PopupStoreDTO> recommendations = allPopups.stream()
                .filter(popup -> "승인".equals(popup.getApprovalStatus()))
                .sorted((p1, p2) -> Integer.compare(p2.getClickCount(), p1.getClickCount()))
                .limit(5)
                .collect(Collectors.toList());

        if (recommendations.isEmpty()) {
            return createTextResponse("현재 추천할 수 있는 팝업스토어가 없어요. 😢");
        }

        ChatbotResponseDTO response = new ChatbotResponseDTO(
                "인기 팝업스토어를 추천해드릴게요! ⭐",
                "popup_list",
                recommendations);
        return response;
    }

    /**
     * 카테고리로 검색
     */
    private ChatbotResponseDTO searchByCategory(String category) {
        List<PopupStoreDTO> results = popupStoreService.selectPopupStoreByCategory(category);

        if (results == null || results.isEmpty()) {
            return createTextResponse("'" + category + "' 카테고리의 팝업스토어를 찾지 못했어요. 😢\n" +
                    "다른 카테고리로 검색해보세요!");
        }

        // 승인된 팝업만 필터링
        results = results.stream()
                .filter(popup -> "승인".equals(popup.getApprovalStatus()))
                .limit(10)
                .collect(Collectors.toList());

        ChatbotResponseDTO response = new ChatbotResponseDTO(
                "'" + category + "' 카테고리 팝업스토어를 찾았어요! 🎉",
                "popup_list",
                results);
        return response;
    }

    /**
     * 지역으로 검색
     */
    private ChatbotResponseDTO searchByLocation(String location) {
        List<PopupStoreDTO> allPopups = popupStoreService.selectAllPopupStore();

        if (allPopups == null || allPopups.isEmpty()) {
            return createTextResponse("현재 진행 중인 팝업스토어가 없어요. 😢");
        }

        // 지역명이 포함된 팝업 필터링
        List<PopupStoreDTO> results = allPopups.stream()
                .filter(popup -> "승인".equals(popup.getApprovalStatus()))
                .filter(popup -> popup.getLocation() != null &&
                        popup.getLocation().toLowerCase().contains(location.toLowerCase()))
                .limit(10)
                .collect(Collectors.toList());

        if (results.isEmpty()) {
            return createTextResponse("'" + location + "' 지역의 팝업스토어를 찾지 못했어요. 😢\n" +
                    "다른 지역으로 검색해보세요!");
        }

        ChatbotResponseDTO response = new ChatbotResponseDTO(
                "'" + location + "' 지역의 팝업스토어를 찾았어요! 📍",
                "popup_list",
                results);
        return response;
    }

    /**
     * 키워드로 검색
     */
    private ChatbotResponseDTO searchByKeyword(String keyword) {
        List<PopupStoreDTO> results = popupStoreService.selectPopupStoreByKeyword(keyword);

        if (results == null || results.isEmpty()) {
            return createTextResponse("'" + keyword + "'에 대한 검색 결과가 없어요. 😢\n" +
                    "다른 키워드로 검색해보세요!");
        }

        // 승인된 팝업만 필터링
        results = results.stream()
                .filter(popup -> "승인".equals(popup.getApprovalStatus()))
                .limit(10)
                .collect(Collectors.toList());

        ChatbotResponseDTO response = new ChatbotResponseDTO(
                "'" + keyword + "'에 대한 검색 결과예요! 🔍",
                "popup_list",
                results);
        return response;
    }

    // ========== 의도 파악 헬퍼 메서드 ==========

    private boolean isGreeting(String message) {
        String[] greetings = { "안녕", "hi", "hello", "헬로", "하이", "시작" };
        return Arrays.stream(greetings).anyMatch(message::contains);
    }

    private boolean isRecommendationRequest(String message) {
        String[] keywords = { "추천", "인기", "best", "베스트", "hot", "핫한", "뭐가 좋아", "뭐 볼까" };
        return Arrays.stream(keywords).anyMatch(message::contains);
    }

    private boolean isSearchRequest(String message) {
        String[] keywords = { "찾아", "검색", "알려", "보여", "있어" };
        return Arrays.stream(keywords).anyMatch(message::contains);
    }

    private boolean isHelpRequest(String message) {
        String[] keywords = { "도움", "help", "헬프", "사용법", "어떻게" };
        return Arrays.stream(keywords).anyMatch(message::contains);
    }

    private String extractCategory(String message) {
        Map<String, String[]> categoryKeywords = new HashMap<>();
        categoryKeywords.put("패션", new String[] { "패션", "fashion", "의류", "옷" });
        categoryKeywords.put("뷰티", new String[] { "뷰티", "beauty", "화장품", "코스메틱" });
        categoryKeywords.put("음식", new String[] { "음식", "food", "푸드", "먹거리", "맛집" });
        categoryKeywords.put("K-POP", new String[] { "kpop", "k-pop", "케이팝", "아이돌" });
        categoryKeywords.put("전시", new String[] { "전시", "exhibition", "아트", "art" });
        categoryKeywords.put("캐릭터", new String[] { "캐릭터", "character", "피규어" });

        for (Map.Entry<String, String[]> entry : categoryKeywords.entrySet()) {
            for (String keyword : entry.getValue()) {
                if (message.contains(keyword)) {
                    return entry.getKey();
                }
            }
        }
        return null;
    }

    private String extractLocation(String message) {
        String[] locations = {
                "강남", "홍대", "명동", "이태원", "신촌", "건대", "잠실", "여의도",
                "압구정", "청담", "성수", "망원", "연남", "한남", "삼청", "북촌",
                "서울", "부산", "대구", "인천", "광주", "대전", "울산", "제주"
        };

        for (String location : locations) {
            if (message.contains(location)) {
                return location;
            }
        }
        return null;
    }

    private String extractSearchKeyword(String message) {
        // 불필요한 단어 제거
        String[] stopWords = { "찾아", "검색", "알려", "보여", "줘", "주세요", "해줘", "팝업", "스토어" };
        String keyword = message;

        for (String stopWord : stopWords) {
            keyword = keyword.replace(stopWord, "");
        }

        return keyword.trim();
    }

    private ChatbotResponseDTO createTextResponse(String message) {
        return new ChatbotResponseDTO(message, "text");
    }
}
