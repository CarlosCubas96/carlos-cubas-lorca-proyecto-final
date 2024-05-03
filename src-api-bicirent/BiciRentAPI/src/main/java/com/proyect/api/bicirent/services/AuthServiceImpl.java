package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.request.SigninRequest;
import com.proyect.api.bicirent.dto.request.SignupRequest;
import com.proyect.api.bicirent.dto.response.JwtResponse;
import com.proyect.api.bicirent.dto.response.MessageResponse;
import com.proyect.api.bicirent.models.ERole;
import com.proyect.api.bicirent.models.Role;
import com.proyect.api.bicirent.models.User;
import com.proyect.api.bicirent.repository.RoleRepository;
import com.proyect.api.bicirent.repository.UserRepository;
import com.proyect.api.bicirent.security.jwt.JwtUtils;
import com.proyect.api.bicirent.security.services.UserDetailsImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthServiceI {

	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;
	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder encoder;

	public AuthServiceImpl(AuthenticationManager authenticationManager, JwtUtils jwtUtils,
			UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder) {
		this.authenticationManager = authenticationManager;
		this.jwtUtils = jwtUtils;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.encoder = encoder;
	}

	@Override
	public MessageResponse registerUser(SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new MessageResponse(Messages.USERNAME_ALREADY_EXISTS);
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new MessageResponse(Messages.EMAIL_ALREADY_EXISTS);
		}

		User user = createUserFromSignupRequest(signUpRequest);
		userRepository.save(user);
		return new MessageResponse(Messages.USER_REGISTERED_SUCCESSFULLY);
	}

	private User createUserFromSignupRequest(SignupRequest signUpRequest) {
		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()), signUpRequest.getFirstname(), signUpRequest.getLastName());

		Set<Role> roles = signUpRequest.getRoles();

		if (roles == null || roles.isEmpty()) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException(Messages.ROLE_NOT_FOUND));
			user.setRoles(Set.of(userRole));
		} else {
			user.setRoles(roles);
		}
		return user;
	}

	@Override
	public JwtResponse authenticateUser(SigninRequest loginRequest) {
		Authentication authentication = authenticate(loginRequest.getUsername(), loginRequest.getPassword());

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = extractRolesFromUserDetails(userDetails);

		return new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles);
	}

	private Authentication authenticate(String username, String password) {
		return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
	}

	private List<String> extractRolesFromUserDetails(UserDetailsImpl userDetails) {
		return userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());
	}

	// Constantes para mensajes

	private static class Messages {
		static final String USERNAME_ALREADY_EXISTS = "¡El nombre de usuario ya está en uso!";
		static final String EMAIL_ALREADY_EXISTS = "¡El correo electrónico ya está en uso!";
		static final String USER_REGISTERED_SUCCESSFULLY = "¡Usuario registrado exitosamente!";
		static final String ROLE_NOT_FOUND = "Rol no encontrado.";
	}
}
