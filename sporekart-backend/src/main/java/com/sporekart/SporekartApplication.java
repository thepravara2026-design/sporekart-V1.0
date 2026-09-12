package com.sporekart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SporekartApplication {

    public static void main(String[] args) {
        SpringApplication.run(SporekartApplication.class, args);
    }
}
