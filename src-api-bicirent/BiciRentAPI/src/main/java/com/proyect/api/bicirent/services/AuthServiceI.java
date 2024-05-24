package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.request.SignupRequest;
import com.proyect.api.bicirent.dto.response.MessageResponse;
import com.proyect.api.bicirent.dto.request.SigninRequest;
import com.proyect.api.bicirent.dto.response.JwtResponse;

public interface AuthServiceI {
	
	
    MessageResponse registerUser(SignupRequest signUpRequest);
    JwtResponse authenticateUser(SigninRequest loginRequest);
}
