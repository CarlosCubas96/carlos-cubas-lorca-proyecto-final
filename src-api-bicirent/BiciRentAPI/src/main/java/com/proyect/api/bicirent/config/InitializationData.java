package com.proyect.api.bicirent.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.proyect.api.bicirent.models.*;
import com.proyect.api.bicirent.repository.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

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

	@Value("${api.images.url}")
	private String apiImagesUrl;

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
		if (!dataAlreadyInitialized()) {
			initializeRoles();
			initializeUsers();
			initializeCategories();
			initializeTags();
			initializeBicyclesAndPosts();
			initializeRentals();
		}
	}

	private boolean dataAlreadyInitialized() {
		return userRepository.count() > 0 || roleRepository.count() > 0 || categoryRepository.count() > 0
				|| tagRepository.count() > 0 || postRepository.count() > 0 || bicycleRepository.count() > 0
				|| rentalRepository.count() > 0;
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

		createUser("admin", "Carlos", "Cubas", "carloscubaf12@gmail.com", adminPassword, adminRole);
		createUser("pabloc90", "Pablo", "Calvo", "pabloc90@gmail.com", userPassword, userRole);
		createUser("alba14", "Alba", "Jimenez", "albaj14@gmail.com", adminPassword, adminRole);
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
			tagRepository.save(new Tag("Aventura"));
			tagRepository.save(new Tag("Ciudad"));
			tagRepository.save(new Tag("Eléctrica"));
			tagRepository.save(new Tag("Deporte"));
			tagRepository.save(new Tag("'Niños'"));
			tagRepository.save(new Tag("Vintage"));
			tagRepository.save(new Tag("Compartida"));
		}
	}

	private void initializeBicyclesAndPosts() {

		User user1 = userRepository.findByUsername("pabloc90")
				.orElseThrow(() -> new IllegalStateException("User user 'pabloc90' not found."));

		User user2 = userRepository.findByUsername("alba14")
				.orElseThrow(() -> new IllegalStateException("User 'alba14' not found."));

		List<Category> categories = categoryRepository.findAll();
		List<Tag> tags = tagRepository.findAll();

		// Primer post y bicicleta adicionales
		Post post1 = new Post("Bicicleta vintage única en venta",
				"Bicicleta restaurada con detalles vintage, perfecta para coleccionistas", getRandomStatus(),
				LocalDate.now().minusDays(12), "Restaurada con piezas originales y cuidadosamente mantenida", user1,
				categories.get(0));
		Set<Tag> post1Tags = new HashSet<>();
		post1Tags.add(tags.get(10)); // Vintage
		post1.setTags(post1Tags);
		postRepository.save(post1);

		String imageUrl1 = apiImagesUrl + "imageBike1";
		Bicycle bicycle1 = new Bicycle("Marca RetroRide", post1, "Modelo Vintage 1950", 18.00, user1, categories.get(0),
				imageUrl1);
		bicycleRepository.save(bicycle1);

		// Segundo post y bicicleta adicionales
		Post post2 = new Post("Bicicleta deportiva de alto rendimiento",
				"Bicicleta diseñada para competiciones, ligera y aerodinámica", getRandomStatus(),
				LocalDate.now().minusDays(18), "Ideal para atletas y amantes del ciclismo de velocidad", user1,
				categories.get(3));
		Set<Tag> post2Tags = new HashSet<>();
		post2Tags.add(tags.get(8)); // Deporte
		post2.setTags(post2Tags);
		postRepository.save(post2);

		String imageUrl2 = apiImagesUrl + "imageBike2";
		Bicycle bicycle2 = new Bicycle("Marca SpeedX", post2, "Modelo SpeedMaster 5000", 16.00, user1,
				categories.get(3), imageUrl2);
		bicycleRepository.save(bicycle2);

		// Tercer post y bicicleta adicionales
		Post post3 = new Post("Bicicleta para niños en oferta",
				"Bicicleta infantil en varios colores brillantes, perfecta para aprender a andar en bici",
				getRandomStatus(), LocalDate.now().minusDays(25),
				"Con ruedas de apoyo y diseño ergonómico para la seguridad y comodidad de los niños", user1,
				categories.get(4));
		Set<Tag> post3Tags = new HashSet<>();
		post3Tags.add(tags.get(9)); // 'Niños'
		post3.setTags(post3Tags);
		postRepository.save(post3);

		String imageUrl3 = apiImagesUrl + "imageBike3";
		Bicycle bicycle3 = new Bicycle("Marca KidsRide", post3, "Modelo BabyCycle 300", 8.00, user1, categories.get(4),
				imageUrl3);
		bicycleRepository.save(bicycle3);

		// Cuarto post y bicicleta adicionales
		Post post4 = new Post("Bicicleta eléctrica plegable",
				"Bicicleta eléctrica compacta y plegable, ideal para la movilidad urbana", getRandomStatus(),
				LocalDate.now().minusDays(30),
				"Fácil de transportar y almacenar, con autonomía suficiente para trayectos diarios", user2,
				categories.get(2));
		Set<Tag> post4Tags = new HashSet<>();
		post4Tags.add(tags.get(7)); // Eléctrica
		post4Tags.add(tags.get(6)); // Ciudad
		post4.setTags(post4Tags);
		postRepository.save(post4);

		String imageUrl4 = apiImagesUrl + "imageBike4";
		Bicycle bicycle4 = new Bicycle("Marca UrbanElectro", post4, "Modelo FlexiVolt 800", 14.00, user2,
				categories.get(2), imageUrl4);
		bicycleRepository.save(bicycle4);

		// Quinto post y bicicleta adicionales
		Post post5 = new Post("Bicicleta de montaña extrema",
				"Bicicleta todoterreno para los amantes de las aventuras extremas", getRandomStatus(),
				LocalDate.now().minusDays(35),
				"Con suspensión total y diseño robusto, lista para terrenos difíciles y descensos rápidos", user2,
				categories.get(0));
		Set<Tag> post5Tags = new HashSet<>();
		post5Tags.add(tags.get(5)); // Aventura
		post5Tags.add(tags.get(1)); // Ligera
		post5.setTags(post5Tags);
		postRepository.save(post5);

		String imageUrl5 = apiImagesUrl + "imageBike5";
		Bicycle bicycle5 = new Bicycle("Marca ExtremeRide", post5, "Modelo TrailBlazer 1200", 20.00, user2,
				categories.get(0), imageUrl5);
		bicycleRepository.save(bicycle5);

		// Sexto post y bicicleta adicionales
		Post post6 = new Post("Bicicleta urbana para todos los días",
				"Bicicleta versátil y resistente, ideal para el uso diario en la ciudad", getRandomStatus(),
				LocalDate.now().minusDays(40),
				"Diseño moderno y funcional, perfecta para desplazamientos cortos y largos", user1, categories.get(3));
		Set<Tag> post6Tags = new HashSet<>();
		post6Tags.add(tags.get(6)); // Ciudad
		post6.setTags(post6Tags);
		postRepository.save(post6);

		String imageUrl6 = apiImagesUrl + "imageBike6";
		Bicycle bicycle6 = new Bicycle("Marca UrbanCommuter", post6, "Modelo CityCommute 400", 12.00, user1,
				categories.get(3), imageUrl6);
		bicycleRepository.save(bicycle6);

		// Séptimo post y bicicleta adicionales
		Post post7 = new Post("Bicicleta de carreras profesional",
				"Bicicleta diseñada para competiciones de alta velocidad y rendimiento", getRandomStatus(),
				LocalDate.now().minusDays(45),
				"Construcción ligera y aerodinámica, para alcanzar velocidades máximas en carretera", user2,
				categories.get(3));
		Set<Tag> post7Tags = new HashSet<>();
		post7Tags.add(tags.get(8)); // Deporte
		post7.setTags(post7Tags);
		postRepository.save(post7);

		String imageUrl7 = apiImagesUrl + "imageBike7";
		Bicycle bicycle7 = new Bicycle("Marca ProRider", post7, "Modelo SpeedPro 6000", 18.00, user2, categories.get(3),
				imageUrl7);
		bicycleRepository.save(bicycle7);

		// Octavo post y bicicleta adicionales
		Post post8 = new Post("Bicicleta eléctrica de lujo",
				"Bicicleta eléctrica premium con diseño exclusivo y tecnología de vanguardia", getRandomStatus(),
				LocalDate.now().minusDays(50),
				"Para quienes buscan estilo y confort en cada trayecto, con funciones avanzadas", user2,
				categories.get(2));
		Set<Tag> post8Tags = new HashSet<>();
		post8Tags.add(tags.get(7)); // Eléctrica
		post8.setTags(post8Tags);
		postRepository.save(post8);

		String imageUrl8 = apiImagesUrl + "imageBike8";
		Bicycle bicycle8 = new Bicycle("Marca LuxuryRide", post8, "Modelo Elegance 1000", 22.00, user2,
				categories.get(2), imageUrl8);
		bicycleRepository.save(bicycle8);

		// Noveno post y bicicleta adicionales
		Post post9 = new Post("Bicicleta plegable para viajes",
				"Bicicleta plegable y ligera, ideal para aventuras y viajes alrededor del mundo", getRandomStatus(),
				LocalDate.now().minusDays(55),
				"Compacta y fácil de transportar, con calidad y resistencia para cualquier terreno", user1,
				categories.get(2));
		Set<Tag> post9Tags = new HashSet<>();
		post9Tags.add(tags.get(11)); // Compartida
		post9.setTags(post9Tags);
		postRepository.save(post9);

		String imageUrl9 = apiImagesUrl + "imageBike9";
		Bicycle bicycle9 = new Bicycle("Marca TravelBike", post9, "Modelo GlobeTrotter 500", 16.00, user1,
				categories.get(2), imageUrl9);
		bicycleRepository.save(bicycle9);

		// Décimo post y bicicleta adicionales
		Post post10 = new Post("Bicicleta de reparto eléctrica",
				"Bicicleta diseñada para reparto de mercancías con asistencia eléctrica", getRandomStatus(),
				LocalDate.now().minusDays(60),
				"Con gran capacidad de carga y autonomía extendida, ideal para negocios de entrega", user1,
				categories.get(4));
		Set<Tag> post10Tags = new HashSet<>();
		post10Tags.add(tags.get(11)); // Compartida
		post10.setTags(post10Tags);
		postRepository.save(post10);

		String imageUrl10 = apiImagesUrl + "imageBike10";
		Bicycle bicycle10 = new Bicycle("Marca DeliveryEco", post10, "Modelo EcoCargo 800", 20.00, user1,
				categories.get(4), imageUrl10);
		bicycleRepository.save(bicycle10);
	}

	private PostStatus getRandomStatus() {
		Random random = new Random();
		int index = random.nextInt(PostStatus.values().length);
		return PostStatus.values()[index];
	}

	private void initializeRentals() {
		List<Bicycle> bicycles = bicycleRepository.findAll();
		List<User> users = userRepository.findAll();

		Random random = new Random();

		for (int i = 0; i < 10; i++) {
			Bicycle bicycle = bicycles.get(i % bicycles.size());
			User landlord = bicycle.getOwner();
			User tenant = users.get(random.nextInt(users.size()));

			// Fechas aleatorias
			LocalDate startDate = LocalDate.now().minusDays(random.nextInt(30));
			LocalDate endDate = startDate.plusDays(random.nextInt(10) + 1);

			// Estado aleatorio
			RentalStatus status = RentalStatus.values()[random.nextInt(RentalStatus.values().length)];

			Rental rental = new Rental(landlord, tenant, bicycle, startDate, endDate, status);
			rentalRepository.save(rental);
		}
	}
}
