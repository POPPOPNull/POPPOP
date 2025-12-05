package com.ohgiraffers.poppop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class PoppopApplication {

    public static void main(String[] args) {
        SpringApplication.run(PoppopApplication.class, args);
    }

}
