package com.proyect.api.bicirent.security.jwt;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

	private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		logger.error("Error de autenticación: {}", authException.getMessage());

		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

		final Map<String, Object> body = new HashMap<>();
		body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
		body.put("error", "No autorizado");

		// Traducción del mensaje según el tipo de excepción
		String mensajeTraducido = "";
		String mensajeOriginal = authException.getMessage();

		if (mensajeOriginal.contains("Bad credentials")) {
			mensajeTraducido = "Credenciales inválidas";
		} else if (mensajeOriginal.contains("Access denied")) {
			mensajeTraducido = "Acceso denegado";
		} else if (mensajeOriginal.contains("Session expired")) {
			mensajeTraducido = "Sesión caducada";
		} else if (mensajeOriginal.contains("User blocked")) {
			mensajeTraducido = "Usuario bloqueado";
		} else {
			mensajeTraducido = "Error de autenticación";
		}

		body.put("message", mensajeTraducido);
		body.put("path", request.getServletPath());

		final ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(response.getOutputStream(), body);
	}
}
