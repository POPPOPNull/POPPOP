package com.ohgiraffers.poppop.auth.model.service;

import com.ohgiraffers.poppop.auth.model.dao.RefreshTokenMapper;
import com.ohgiraffers.poppop.auth.model.dto.RefreshToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenMapper refreshTokenMapper;

    private final long refreshValiditySeconds = 60L * 60 * 24 * 30;

    public RefreshTokenService(RefreshTokenMapper refreshTokenMapper) {
        this.refreshTokenMapper = refreshTokenMapper;
    }

    @Transactional
    public RefreshToken createAndSave(String principalId, String principalType) {
        // 토큰 생성
        String token = UUID.randomUUID().toString() + "-" + UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusSeconds(refreshValiditySeconds);

        // 기존 토큰 제거
        refreshTokenMapper.deleteByPrincipal(principalId, principalType);

        RefreshToken r = new RefreshToken();
        r.setPrincipalId(principalId);
        r.setPrincipalType(principalType);
        r.setToken(token);
        r.setExpiryDate(expiry);

        refreshTokenMapper.insertRefreshToken(r);
        return r;
    }

    public RefreshToken findByToken(String token) {
        return refreshTokenMapper.findByToken(token);
    }

    @Transactional
    public void deleteByToken(String token) {
        refreshTokenMapper.deleteByToken(token);
    }

    @Transactional
    public void deleteByPrincipal(String principalId, String principalType) {
        refreshTokenMapper.deleteByPrincipal(principalId, principalType);
    }

    public boolean isExpired(RefreshToken refreshToken) {

        System.out.println("expiryDate = " + refreshToken.getExpiryDate());
        System.out.println("now        = " + LocalDateTime.now());
        System.out.println("isExpired? = " + refreshToken.getExpiryDate().isBefore(LocalDateTime.now()));

        return refreshToken.getExpiryDate().isBefore(LocalDateTime.now());
    }
}
