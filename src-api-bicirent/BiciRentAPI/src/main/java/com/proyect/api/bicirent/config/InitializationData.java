package com.proyect.api.bicirent.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.proyect.api.bicirent.models.ERole;
import com.proyect.api.bicirent.models.Role;
import com.proyect.api.bicirent.models.User;
import com.proyect.api.bicirent.repository.UserRepository;
import com.proyect.api.bicirent.repository.RoleRepository;

import java.util.Optional;

@Profile("custom-profile")
@Component
public class InitializationData implements CommandLineRunner {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;

	@Value("${demo.user.password}")
	private String userPassword;

	@Value("${demo.admin.password}")
	private String adminPassword;

	public InitializationData(UserRepository userRepository, RoleRepository roleRepository,
			PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public void run(String... args) throws Exception {

		// Verificar si hay roles existentes
		if (roleRepository.count() == 0) {
			// Crear roles si no existen
			Role userRole = roleRepository.save(new Role(ERole.ROLE_USER));
			Role adminRole = roleRepository.save(new Role(ERole.ROLE_ADMIN));

			// Crear usuarios
			createUser("user", "Carlos", "Cubas", "carloscubaf12@gmail.com", userPassword, userRole);
			createUser("admin", "Pablo", "Jimenez", "pabloj32@gmail.com", adminPassword, adminRole);

			// Agregar 20 usuarios más de ejemplo
			for (int i = 1; i <= 20; i++) {
				createUser("user" + i, "FirstName" + i, "LastName" + i, "user" + i + "@example.com", userPassword,
						userRole);
			}
		}
	}

	private void createUser(String username, String firstname, String lastname, String email, String password,
			Role role) {
		Optional<User> existingUser = userRepository.findByUsername(username);
		if (existingUser.isEmpty()) {
			User user = new User();
			user.setUsername(username);
			user.setFirstname(firstname);
			user.setLastname(lastname);
			user.setEmail(email);
			user.setPassword(passwordEncoder.encode(password));
			user.getRoles().add(role);
			userRepository.save(user);
		}
	}
}
