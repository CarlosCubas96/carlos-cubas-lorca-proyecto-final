package com.proyect.api.bicirent.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.github.javafaker.Faker;

import com.proyect.api.bicirent.models.Bicycle;
import com.proyect.api.bicirent.models.Category;
import com.proyect.api.bicirent.models.CategoryType;
import com.proyect.api.bicirent.models.ERole;
import com.proyect.api.bicirent.models.Post;
import com.proyect.api.bicirent.models.PostStatus;
import com.proyect.api.bicirent.models.Rental;
import com.proyect.api.bicirent.models.RentalStatus;
import com.proyect.api.bicirent.models.Role;
import com.proyect.api.bicirent.models.User;
import com.proyect.api.bicirent.repository.UserRepository;
import com.proyect.api.bicirent.repository.BicycleRepository;
import com.proyect.api.bicirent.repository.CategoryRepository;
import com.proyect.api.bicirent.repository.PostRepository;
import com.proyect.api.bicirent.repository.RentalRepository;
import com.proyect.api.bicirent.repository.RoleRepository;

import java.time.LocalDate;
import java.util.Locale;
import java.util.Optional;

@Profile("custom-profile")
@Component
public class InitializationData implements CommandLineRunner {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	private final PostRepository postRepository;
	private final BicycleRepository bicycleRepository;
	private final CategoryRepository categoryRepository;
	private final RentalRepository rentalRepository;

	private final Faker faker = new Faker(new Locale("es"));

	@Value("${demo.user.password}")
	private String userPassword;

	@Value("${demo.admin.password}")
	private String adminPassword;

	public InitializationData(UserRepository userRepository, RoleRepository roleRepository,
			PostRepository postRepository, BicycleRepository bicycleRepository, CategoryRepository categoryRepository,
			RentalRepository rentalRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.postRepository = postRepository;
		this.bicycleRepository = bicycleRepository;
		this.categoryRepository = categoryRepository;
		this.rentalRepository = rentalRepository;
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

		initializeBicyclesAndPosts();

		initializeRentals();
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

	private void initializeBicyclesAndPosts() {
		User admin = userRepository.findByUsername("admin").orElseThrow();

		Category category = new Category("Ocio", CategoryType.OCIO);
		categoryRepository.save(category);

		for (int i = 0; i < 30; i++) {
			Post post = new Post(faker.book().title(), faker.lorem().sentence(), PostStatus.AVAILABLE, LocalDate.now(),
					faker.lorem().paragraph(), admin, category);
			postRepository.save(post);

			Bicycle bicycle = new Bicycle(faker.company().name(), post, faker.commerce().productName(),
					faker.number().randomDouble(2, 10, 100), admin, category);
			bicycleRepository.save(bicycle);

			Rental rental = new Rental(admin, admin, bicycle,
					LocalDate.now().minusDays(faker.number().numberBetween(1, 30)),
					LocalDate.now().plusDays(faker.number().numberBetween(1, 15)),
					RentalStatus.values()[faker.number().numberBetween(0, RentalStatus.values().length)]);
			rentalRepository.save(rental);

		}

	}

	private void initializeRentals() {
		User admin = userRepository.findByUsername("admin").orElseThrow();
		Bicycle bike = bicycleRepository.findByOwner(admin).stream().findFirst().orElseThrow();

		Rental rental = new Rental(admin, admin, bike, LocalDate.now(), LocalDate.now().plusDays(2),
				RentalStatus.COMPLETED);

		rentalRepository.save(rental);
	}
}
