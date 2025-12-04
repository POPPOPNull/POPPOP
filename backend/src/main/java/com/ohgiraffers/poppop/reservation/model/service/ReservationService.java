package com.ohgiraffers.poppop.reservation.model.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ohgiraffers.poppop.behavior.model.dao.BehaviorMapper;
import com.ohgiraffers.poppop.reservation.model.dao.ReservationMapper;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationDetailsDTO;
import com.ohgiraffers.poppop.reservation.model.dto.ReservationSummaryDTO;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
public class ReservationService {

    private final ReservationMapper reservationMapper;
    private final BehaviorMapper behaviorMapper;
    private final WebClient webClient;

    @Value("${toss.secret_key}")
    private String tossSecretKey;

    private static final int max_count = 100;
    private static final int TICKET_PRICE = 1000; // 티켓 가격 (임시)
    private static final Logger log = LoggerFactory.getLogger(ReservationService.class);

    public ReservationService(ReservationMapper reservationMapper, BehaviorMapper behaviorMapper, WebClient.Builder webClientBuilder) {
        this.reservationMapper = reservationMapper;
        this.behaviorMapper = behaviorMapper;
        this.webClient = webClientBuilder.baseUrl("https://api.tosspayments.com").build();
    }

    /*  // 기존 예약 생성 메소드 (이제 prepareReservation -> confirmTossPayment 흐름으로 대체됨)
    @Transactional
    public void insertReservation (ReservationDetailsDTO dto, String sessionId) {

        int reserved = reservationMapper.getAlreadyReservedCount(
                dto.getMemberId(),
                dto.getPopupNo(),
                dto.getReservationDate(),
                dto.getReservationTime()
        );

        int limitPerson = 2;

        if (reserved + dto.getReservationPersonnel() > limitPerson) {
            throw new IllegalArgumentException(
                    "해당 회차는 1인당 최대 " + limitPerson + "매까지 예약 가능합니다."
            );
        }

        reservationMapper.insertReservation(dto);
        behaviorMapper.insertLogByReservation(dto.getPopupNo(), sessionId);
    }
    */

    @Transactional
    public Map<String, Object> prepareReservation(ReservationDetailsDTO dto) {
        System.out.println("--- 결제 준비 로직 시작 ---");
        System.out.println("전달받은 DTO: " + dto);

        // 기존 예약 가능 인원 검증 로직 재사용
        int reserved = reservationMapper.getAlreadyReservedCount(
                dto.getMemberId(), dto.getPopupNo(), dto.getReservationDate(), dto.getReservationTime()
        );
        int limitPerson = 2;
        if (reserved + dto.getReservationPersonnel() > limitPerson) {
            throw new IllegalArgumentException("해당 회차는 1인당 최대 " + limitPerson + "매까지 예약 가능합니다.");
        }

        // 1. 고유한 주문번호 생성
        String orderId = "pop_" + dto.getPopupNo() + "_" + UUID.randomUUID();
        int amount = TICKET_PRICE * dto.getReservationPersonnel();
        System.out.println("생성된 orderId: " + orderId);
        System.out.println("계산된 amount: " + amount);


        // 2. DTO에 주문번호, 금액 정보 설정
        dto.setOrderId(orderId);
        dto.setReservationAmount(amount);
        // reservation_status는 Mapper에서 '결제대기'로 고정

        // 3. '결제대기' 상태로 DB에 예약 정보 저장
        System.out.println("--- DB에 '결제대기' 예약 정보 저장 시도 ---");
        reservationMapper.insertPendingReservation(dto);
        System.out.println("--- DB 저장 성공 ---");
        // behaviorMapper.insertLogByReservation(dto.getPopupNo(), sessionId); // sessionId가 없으므로 일단 제외

        // 4. 프론트엔드에 전달할 결제 정보 생성
        Map<String, Object> paymentInfo = new HashMap<>();
        paymentInfo.put("orderId", orderId);
        paymentInfo.put("amount", amount);
        paymentInfo.put("orderName", "팝팝 스토어 예약 (" + dto.getReservationPersonnel() + "명)"); // 예시 주문명

        System.out.println("프론트로 전달할 정보: " + paymentInfo);
        System.out.println("--- 결제 준비 로직 종료 ---");
        return paymentInfo;
    }


    @Transactional
    public boolean confirmTossPayment(String paymentKey, String orderId, Integer amount) {
        System.out.println("--- 결제 승인 로직 시작 ---");
        System.out.println("paymentKey = " + paymentKey);
        System.out.println("orderId = " + orderId);
        System.out.println("amount (from Toss) = " + amount);

        // 1. DB에서 주문 정보 조회 및 금액 검증
        Integer expectedAmount = reservationMapper.findAmountByOrderId(orderId);
        System.out.println("expectedAmount (from DB) = " + expectedAmount);

        if (expectedAmount == null || !Objects.equals(expectedAmount, amount)) {
            // 금액이 일치하지 않으면 위변조 시도일 수 있으므로 결제 승인 거부
            System.err.println("!!! 금액 검증 실패: DB 금액과 토스 전달 금액이 일치하지 않음 !!!");
            throw new RuntimeException("결제 정보가 일치하지 않습니다.");
        }

        // 2. 토스페이먼츠 결제 승인 API 호출
        System.out.println("--- 토스페이먼츠 승인 API 호출 시작 ---");
        String credentials = Base64.getEncoder().encodeToString((tossSecretKey + ":").getBytes(StandardCharsets.UTF_8));

        TossPaymentResult response = webClient.post()
                .uri("/v1/payments/" + paymentKey)
                .header(HttpHeaders.AUTHORIZATION, "Basic " + credentials)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .bodyValue("{\"orderId\":\"" + orderId + "\",\"amount\":" + amount + "}")
                .retrieve()
                .bodyToMono(TossPaymentResult.class)
                .block();

        if (response != null && "DONE".equals(response.getStatus())) {
            // 3. 결제 승인 성공 시, DB 예약 상태 업데이트
            reservationMapper.updateReservationAsPaid(orderId, paymentKey);
            return true;
        } else {
            throw new RuntimeException("토스페이먼츠 결제 승인에 실패했습니다. 상태: " + (response != null ? response.getStatus() : "null"));
        }
    }


    // 토스페이먼츠 응답을 받기 위한 DTO (내부 클래스)
    @Data
    private static class TossPaymentResult {
        private String status;
        private String orderId;
        @JsonProperty("totalAmount")
        private Integer totalAmount;
    }

    // --- 아래는 기존에 있던 메소드들 ---
    public List<ReservationDetailsDTO> selectAllReservation() { return reservationMapper.selectAllReservation(); }
    public List<ReservationSummaryDTO> selectReservationSummary() { return reservationMapper.selectReservationSummary(); }
    public List<ReservationDetailsDTO> selectReservationDetailsByPopup(int popupNo) { return reservationMapper.selectReservationDetailsByPopup(popupNo); }
    public void deleteReservationDetails(int reservationNo) {
        int result = reservationMapper.deleteReservationDetails(reservationNo);
        if (result == 0) { throw new IllegalArgumentException("해당 예약을 찾을 수 없어 취소에 실패했습니다."); }
    }
    public List<ReservationDetailsDTO> getReservationsByMemberId(String memberId) { return reservationMapper.selectReservationByMemberId(memberId); }
        public boolean cancelReservation(int reservationNo, String memberId) {
            int result = reservationMapper.cancelReservation(reservationNo, memberId);
            return result > 0;
        }
    
        @Transactional
        public void cancelPaidReservation(int reservationNo, String memberId) {
            // 1. DB에서 취소할 예약의 paymentKey를 조회 (본인 예약이 맞는지 확인 포함)
            String paymentKey = reservationMapper.findPaymentKey(reservationNo, memberId);
    
            if (paymentKey == null || paymentKey.isBlank()) {
                throw new IllegalArgumentException("취소할 결제 정보가 없거나 권한이 없습니다.");
            }
    
            // 2. 토스페이먼츠 결제 취소 API 호출
            String credentials = Base64.getEncoder().encodeToString((tossSecretKey + ":").getBytes(StandardCharsets.UTF_8));
    
            try {
                webClient.post()
                        .uri("/v1/payments/" + paymentKey + "/cancel")
                        .header(HttpHeaders.AUTHORIZATION, "Basic " + credentials)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .bodyValue("{\"cancelReason\":\"고객의 변심\"}") // 취소 사유
                        .retrieve()
                        .bodyToMono(Void.class) // 성공 시 응답 본문은 무시
                        .block();
            } catch (Exception e) {
                // WebClient에서 에러 발생 시 (예: 4xx, 5xx 응답)
                // 이미 취소된 건을 다시 취소 요청하는 경우 등
                throw new RuntimeException("결제 취소에 실패했습니다. 관리자에게 문의해주세요.", e);
            }
    
    
            // 3. 토스페이먼츠 취소 성공 시, 우리 DB의 예약 상태를 '예약취소'로 변경
            int result = reservationMapper.cancelReservation(reservationNo, memberId);
            if (result == 0) {
                // 이 경우는 거의 발생하지 않지만, 데이터 일관성을 위한 방어 코드
                throw new IllegalStateException("DB 예약 상태 변경에 실패했습니다.");
            }
        }
    
    
        public List<ReservationDetailsDTO> selectAllReservationsByManager(String managerId) { return reservationMapper.selectAllReservationsByManager(managerId); }
    public int selectAvailableCount(int popupNo, String reservationDate, String reservationTime) {
        Integer reserved = reservationMapper.selectReservedCount(popupNo, reservationDate, reservationTime);
        if (reserved == null) reserved = 0;
        int result = max_count - reserved;
        return Math.max(result, 0);
    }

    @Transactional
    public void deletePendingReservation(String orderId) {
        reservationMapper.deletePendingReservationByOrderId(orderId);
    }

    @Scheduled(fixedRate = 3600000)
    @Transactional
    public void cleanupPendingReservations() {
        LocalDateTime cutoffTime = LocalDateTime.now().minusHours(1);
        log.info("오래된 '결제대기' 예약 정리를 시작합니다. 기준 시간 : " + cutoffTime);
        int deletedCount = reservationMapper.deleteOldPendingReservation(cutoffTime);
        if (deletedCount > 0) {
            log.info(deletedCount + "개의 오래된 '결제대기' 예약을 삭제했습니다.");
        } else {
            log.info("삭제할 오래된 '결제대기' 예약이 없습니다.");
        }
    }


}
