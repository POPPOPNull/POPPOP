package com.ohgiraffers.poppop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${poppop.frontend.url}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {


        registry.addMapping("/**")
                .allowedOrigins(frontendUrl,"http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
        registry.addMapping("/popup-stores/**")
                .allowedOrigins(frontendUrl,"http://localhost:5173")
                .allowedMethods("GET","POST","PUT","DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
        registry.addMapping("/admin/**")
                .allowedOrigins(frontendUrl,"http://localhost:5173")
                .allowedMethods("GET","POST","PUT","DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
        registry.addMapping("/review/**")
                .allowedOrigins(frontendUrl,"http://localhost:5173")
                .allowedMethods("GET","POST","PUT","DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
        registry.addMapping("/favorite/**")
                .allowedOrigins(frontendUrl,"http://localhost:5173")
                .allowedMethods("GET","POST","PUT","DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
        registry.addMapping("/behavior/**")
                .allowedOrigins(frontendUrl,"http://localhost:5173")
                .allowedMethods("GET","POST","PUT","DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
