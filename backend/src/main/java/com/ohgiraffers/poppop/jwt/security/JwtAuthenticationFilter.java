package com.ohgiraffers.poppop.jwt.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    // UserDetailsService도 필요합니다. (토큰에서 사용자 정보를 가져올 때)
    private final UserDetailsService userDetailsService;

    // 생성자를 통해 토큰 제공자와 UserDetailsService를 주입받습니다.
    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider, UserDetailsService userDetailsService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // 1. 요청 헤더에서 JWT 토큰을 추출
        String jwt = resolveToken(request);

        // 2. 토큰 유효성 검사 및 인증 처리
        if (jwt != null && jwtTokenProvider.validateToken(jwt)) {

            // 토큰에서 사용자 아이디 추출
            String userId = jwtTokenProvider.getUsername(jwt);

            // UserDetailsService를 통해 UserDetails 로드
            UserDetails userDetails = userDetailsService.loadUserByUsername(userId);

            // SecurityContext에 인증 객체 저장
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null, // 비밀번호는 이미 검증되었으므로 null
                    userDetails.getAuthorities()
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // 다음 필터로 요청 전달
        filterChain.doFilter(request, response);
    }

    // HTTP 요청 헤더에서 토큰을 추출하는 헬퍼 메서드 (Bearer Scheme)
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
