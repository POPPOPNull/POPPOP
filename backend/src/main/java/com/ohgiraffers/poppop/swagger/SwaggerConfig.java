package com.ohgiraffers.poppop.swagger;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("bearer-key",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList("bearer-key"))
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title("POPPOP API 명세서")
//                .description("POPPOP Application API documentation")
                .version("1.0.0");
    }



    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public")
                .pathsToMatch("/api/**","/auth/**","/popup-stores/**","/favorite/**",
                        "/myinfo/**","/myreservation/**","/behavior/**","/admin/**",
                        "/reservations/**","/manager/**",
                        "/review/**","/myreview/**","/manager/dashboard/**","/kakao/**")
                .build();
    }
}
