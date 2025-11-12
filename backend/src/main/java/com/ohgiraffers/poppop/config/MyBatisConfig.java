package com.ohgiraffers.poppop.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = "com.ohgiraffers.poppop")
public class MyBatisConfig {
}
