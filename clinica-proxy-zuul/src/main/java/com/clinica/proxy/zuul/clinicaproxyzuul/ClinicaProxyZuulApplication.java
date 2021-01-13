package com.clinica.proxy.zuul.clinicaproxyzuul;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;


@EnableZuulProxy
@SpringBootApplication
public class ClinicaProxyZuulApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClinicaProxyZuulApplication.class, args);
    }


}
