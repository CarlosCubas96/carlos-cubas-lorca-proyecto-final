package com.proyect.api.bicirent.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.proyect.api.bicirent.models.*;
import com.proyect.api.bicirent.repository.*;

import java.time.LocalDate;
import java.util.*;

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
	private final TagRepository tagRepository;

	@Value("${demo.user.password}")
	private String userPassword;

	@Value("${demo.admin.password}")
	private String adminPassword;

	public InitializationData(UserRepository userRepository, RoleRepository roleRepository,
			PostRepository postRepository, BicycleRepository bicycleRepository, CategoryRepository categoryRepository,
			RentalRepository rentalRepository, TagRepository tagRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.postRepository = postRepository;
		this.bicycleRepository = bicycleRepository;
		this.categoryRepository = categoryRepository;
		this.rentalRepository = rentalRepository;
		this.tagRepository = tagRepository;
	}

	@Override
	public void run(String... args) throws Exception {
		initializeRoles();
		initializeUsers();
		initializeCategories();
		initializeTags();
		initializeBicyclesAndPosts();
		initializeRentals();
	}

	private void initializeRoles() {
		if (roleRepository.count() == 0) {
			roleRepository.save(new Role(ERole.ROLE_USER));
			roleRepository.save(new Role(ERole.ROLE_ADMIN));
		}
	}

	private void initializeUsers() {
		Role userRole = roleRepository.findByName(ERole.ROLE_USER)
				.orElseThrow(() -> new IllegalStateException("User role not found."));
		Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
				.orElseThrow(() -> new IllegalStateException("Admin role not found."));

		createUser("admin1", "Carlos", "Cubas", "carloscubaf12@gmail.com", adminPassword, adminRole);
		createUser("user1", "Pablo", "Calvo", "pabloc90@gmail.com", userPassword, userRole);
		createUser("admin2", "Alba", "Jimenez", "albaj14@gmail.com", adminPassword, adminRole);

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

	private void initializeCategories() {
		if (categoryRepository.count() == 0) {
			categoryRepository.save(new Category("Montaña", CategoryType.MONTAÑA));
			categoryRepository.save(new Category("Trabajo", CategoryType.TRABAJO));
			categoryRepository.save(new Category("Viajes", CategoryType.VIAJES));
			categoryRepository.save(new Category("Paseo", CategoryType.PASEO));
			categoryRepository.save(new Category("Reparto", CategoryType.REPARTO));
		}
	}

	private void initializeTags() {
		if (tagRepository.count() == 0) {
			tagRepository.save(new Tag("rápida"));
			tagRepository.save(new Tag("ligera"));
			tagRepository.save(new Tag("resistente"));
			tagRepository.save(new Tag("confortable"));
			tagRepository.save(new Tag("elegante"));
		}
	}

	private void initializeBicyclesAndPosts() {
		User admin = userRepository.findByUsername("admin1")
				.orElseThrow(() -> new IllegalStateException("Admin user 'admin1' not found."));

		List<Category> categories = categoryRepository.findAll();
		List<Tag> tags = tagRepository.findAll();

		for (int i = 0; i < 10; i++) {
			Category randomCategory = categories.get(i % categories.size());

			Post post = new Post("Bicicleta " + (i + 1), "Descripción de la bicicleta " + (i + 1),
					PostStatus.DISPONIBLE, LocalDate.now(), "Detalles adicionales de la bicicleta " + (i + 1), admin,
					randomCategory);

			// Asociar etiquetas aleatorias a la publicación
			Set<Tag> postTags = new HashSet<>();
			postTags.add(tags.get(i % tags.size()));
			post.setTags(postTags);

			postRepository.save(post);

			String randomImageUrl = "https://picsum.photos/200/300";

			Bicycle bicycle = new Bicycle("Marca " + (i + 1), post, "Modelo " + (i + 1), 10.0 + i, admin,
					randomCategory, randomImageUrl);
			bicycleRepository.save(bicycle);
		}
	}

	private void initializeRentals() {
		List<Bicycle> bicycles = bicycleRepository.findAll();
		List<User> users = userRepository.findAll();

		for (int i = 0; i < 10; i++) {
			Bicycle bicycle = bicycles.get(i % bicycles.size());
			User landlord = bicycle.getOwner();
			User tenant = users.get((i + 1) % users.size());

			Rental rental = new Rental(landlord, tenant, bicycle, LocalDate.now().minusDays(i + 1),
					LocalDate.now().plusDays(i + 1), RentalStatus.values()[i % RentalStatus.values().length]);
			rentalRepository.save(rental);
		}
	}
}
