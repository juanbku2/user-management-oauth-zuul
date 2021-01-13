package com.clinica.oauth2.clinicaoauth2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication

public class ClinicaOauth2Application {

    public static void main(String[] args) {
        SpringApplication.run(ClinicaOauth2Application.class, args);
    }

}
