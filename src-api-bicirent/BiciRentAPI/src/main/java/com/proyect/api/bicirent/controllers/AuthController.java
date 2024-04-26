package com.proyect.api.bicirent.controllers;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyect.api.bicirent.services.AuthServiceImpl;
import com.proyect.api.bicirent.dto.request.SigninRequest;
import com.proyect.api.bicirent.dto.request.SignupRequest;
import com.proyect.api.bicirent.dto.response.JwtResponse;
import com.proyect.api.bicirent.dto.response.MessageResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthServiceImpl authService;

	public AuthController(AuthServiceImpl authService) {
		this.authService = authService;
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody SigninRequest loginRequest) {
		try {
			JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
			return ResponseEntity.ok(jwtResponse);
		} catch (AuthenticationException e) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Incorrect username or password"));
		}
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		MessageResponse response = authService.registerUser(signUpRequest);
		return ResponseEntity.ok(response);
	}
}
