package com.ohgiraffers.poppop.jwt.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtTokenProvider {

    private final Key secretKey;

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKeyString) {

        this.secretKey = new SecretKeySpec(
                secretKeyString.getBytes(StandardCharsets.UTF_8), // 키 문자열을 바이트 배열로 변환
                SignatureAlgorithm.HS256.getJcaName() // 사용할 서명 알고리즘 이름 지정 (HMACSHA256)
        );
    }

    private long accessTokenValidity = 1000 * 30;

    public String createToken(String principalId, String principalType, String role) {

        Claims claims = Jwts.claims(); // setSubject 대신에 클레임에 Id와 타입
        claims.put("id", principalId);
        claims.put("type", principalType);
        claims.put("role", role);

        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenValidity);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(secretKey,SignatureAlgorithm.HS256)
                .compact();
    }

    public Authentication getAuthentication(String token) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        String id = claims.get("id", String.class);
        String role = claims.get("role", String.class); // 토큰 생성 시 claims.put("role", role)로 설정한 역할

        // 2. 권한 정보 생성
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

        // 3. UserDetails 객체 생성 (사용자 정보 역할)
        // 여기서는 ID와 권한 정보만 가지는 임시 UserDetails 객체를 사용
        UserDetails principal = new User(id, "", authorities);

        // 4. Authentication 객체 반환
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public String getUsername(String token) {
        // 1. 토큰 파서를 빌드 (validateToken 및 getAuthentication에서 사용된 키와 동일)
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                // 2. 토큰을 파싱하고 Claim 본문(Payload)을 가져옴
                .parseClaimsJws(token)
                .getBody();

        return claims.get("id", String.class);
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        // "Bearer "로 시작하는 토큰 형식을 검사
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // "Bearer " (7글자) 이후의 문자열을 반환
        }
        return null;
    }

    public boolean validateToken(String token) {
        try {
            // 토큰 파싱 시 유효하지 않다면 예외 발생
            Jwts.parserBuilder()
                    .setSigningKey(secretKey) // secretKey를 사용하여 검증
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            // 잘못된 JWT 서명
            System.out.println("Invalid JWT signature.");
        } catch (ExpiredJwtException e) {
            // 만료된 JWT 토큰
            System.out.println("만료된 JWT token.");
        } catch (UnsupportedJwtException e) {
            // 지원되지 않는 JWT 토큰
            System.out.println("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            // JWT 토큰이 잘못됨
            System.out.println("JWT claims string is empty.");
        }
        return false;
    }
}
