package com.ohgiraffers.poppop.reservation.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentConfirmationRequestDTO {
    private String paymentKey;
    private String orderId;
    private Integer amount;
}
