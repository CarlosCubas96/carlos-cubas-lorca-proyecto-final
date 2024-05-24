package com.proyect.api.bicirent.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;
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

	private final Faker faker = new Faker(new Locale("es"));

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

		// Asegurarte de que todas las categorías estén presentes en la lista
		List<Category> categories = categoryRepository.findAll();
		if (categories.isEmpty()) {
			for (CategoryType categoryType : CategoryType.values()) {
				Category newCategory = new Category(categoryType.name(), categoryType);
				Category savedCategory = categoryRepository.save(newCategory);
				categories.add(savedCategory);
			}
		}

		// Crear y guardar etiquetas
		List<String> tagNames = Arrays.asList("rápida", "ligera", "resistente", "confortable", "elegante");
		List<Tag> tags = new ArrayList<>();
		for (String tagName : tagNames) {
			Tag tag = new Tag(tagName);
			tags.add(tagRepository.save(tag));
		}

		for (int i = 0; i < 50; i++) {
			int randomIndex = faker.number().numberBetween(0, categories.size());
			Category randomCategory = categories.get(randomIndex);

			Post post = new Post(faker.book().title(), faker.lorem().sentence(),
					PostStatus.values()[faker.number().numberBetween(0, PostStatus.values().length)], LocalDate.now(),
					faker.lorem().paragraph(), admin, randomCategory);

			// Asociar etiquetas aleatorias a la publicación
			Set<Tag> postTags = new HashSet<>();
			int numberOfTags = faker.number().numberBetween(1, tags.size());
			Collections.shuffle(tags);
			for (int j = 0; j < numberOfTags; j++) {
				postTags.add(tags.get(j));
			}
			post.setTags(postTags);

			postRepository.save(post);

			String randomImageUrl = "https://picsum.photos/200/300";

			Bicycle bicycle = new Bicycle(faker.company().name(), post, faker.commerce().productName(),
					faker.number().randomDouble(2, 10, 100), admin, randomCategory, randomImageUrl);
			bicycleRepository.save(bicycle);

			Rental rental = new Rental(admin, admin, bicycle,
					LocalDate.now().minusDays(faker.number().numberBetween(1, 30)),
					LocalDate.now().plusDays(faker.number().numberBetween(1, 15)),
					RentalStatus.values()[faker.number().numberBetween(0, RentalStatus.values().length)]);
			rentalRepository.save(rental);
		}
	}
}
