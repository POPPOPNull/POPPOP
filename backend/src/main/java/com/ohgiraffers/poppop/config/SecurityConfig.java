package com.ohgiraffers.poppop.config;

import com.ohgiraffers.poppop.jwt.security.JwtAuthenticationFilter;
import com.ohgiraffers.poppop.jwt.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Locale;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


        private final JwtTokenProvider jwtTokenProvider;

        @Autowired
        public SecurityConfig(JwtTokenProvider jwtTokenProvider) {
                this.jwtTokenProvider = jwtTokenProvider;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                       UserDetailsService userDetailsService) throws Exception {

                http
                        // 기본 인증/폼 로그인/CSRF 비활성화 (JWT 방식)
                        .httpBasic(AbstractHttpConfigurer::disable)
                        .csrf(AbstractHttpConfigurer::disable)
                        .formLogin(AbstractHttpConfigurer::disable)

                        // 세션 사용 X
                        .sessionManagement(session -> session
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                        .authorizeHttpRequests(auth -> auth
                                // 1. 문제가 되는 toss-success 경로를 가장 먼저, 단독으로 permitAll() 처리
                                .requestMatchers("/reservations/toss-success").permitAll()

                                // 2. 나머지 permitAll 경로들
                                .requestMatchers(
                                        "/auth/login",
                                        "/auth/admin/login",
                                        "/auth/user/join",
                                        "/auth/manager/join",
                                        "/auth/refresh",
                                        "/auth/idcheck",
                                        "/", "/index.html",
                                        "/css/**", "/js/**", "/images/**",
                                        "/maps",
                                        "/popup-stores/search",
                                        "/popup-stores/**",
                                        "/behavior/**",
                                        "/api/chatbot/**",
                                        "/favorite/**",
                                        "/v3/api-docs/**",
                                        "/review/*",
                                        "/api/**",
                                        "/swagger-ui/**",
                                        "/swagger-ui.html")
                                .permitAll()

                                .requestMatchers("/manager/mypopup").permitAll()

                                .requestMatchers("/admin/**").hasRole("ADMIN")
                                .requestMatchers("/manager/**").hasRole("MANAGER")
                                .requestMatchers("/user/**", "/review/insert/*").hasRole("USER")

                                // 나머지는 전부 인증 필요
                                .anyRequest().authenticated())
                        // .authorizeHttpRequests(auth -> auth
                        // .anyRequest().permitAll()
                        // )
                        .cors(cors -> {
                        });

                http.addFilterBefore(
                        new JwtAuthenticationFilter(jwtTokenProvider, userDetailsService),
                        UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
                return configuration.getAuthenticationManager();
        }
}


