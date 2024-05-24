package com.proyect.api.bicirent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class BiciRentApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BiciRentApiApplication.class, args);
	}

}
