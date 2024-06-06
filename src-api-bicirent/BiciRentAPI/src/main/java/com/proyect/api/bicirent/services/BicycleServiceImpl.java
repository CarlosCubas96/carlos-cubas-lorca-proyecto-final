package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.response.BicycleResponse;
import com.proyect.api.bicirent.models.Bicycle;
import com.proyect.api.bicirent.models.Category;
import com.proyect.api.bicirent.models.Post;
import com.proyect.api.bicirent.models.User;
import com.proyect.api.bicirent.repository.BicycleRepository;
import com.proyect.api.bicirent.repository.CategoryRepository;
import com.proyect.api.bicirent.repository.PostRepository;
import com.proyect.api.bicirent.repository.UserRepository;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class BicycleServiceImpl implements BicycleServiceI {

	private final BicycleRepository bicycleRepository;
	private final CategoryRepository categoryRepository;
	private final ResourceLoader resourceLoader;
	private final PostRepository postRepository;
	private final UserRepository userRepository;

	public BicycleServiceImpl(BicycleRepository bicycleRepository, CategoryRepository categoryRepository,
			PostRepository postRepository, ResourceLoader resourceLoader, UserRepository userRepository) {
		this.bicycleRepository = bicycleRepository;
		this.categoryRepository = categoryRepository;
		this.resourceLoader = resourceLoader;
		this.postRepository = postRepository;
		this.userRepository = userRepository;
	}

	@Override
	public Page<BicycleResponse> getAllBicycles(String searchTerm, Pageable pageable) {
		Page<Bicycle> bicyclesPage;
		if (searchTerm == null || searchTerm.isEmpty()) {
			bicyclesPage = bicycleRepository.findAll(pageable);
		} else {
			bicyclesPage = bicycleRepository.findByBrandModelContaining(searchTerm, pageable);
		}
		return bicyclesPage.map(this::mapToBicycleResponse);
	}

	private BicycleResponse mapToBicycleResponse(Bicycle bicycle) {
		return new BicycleResponse(bicycle.getId(), bicycle.getOwner().getUsername(),
				bicycle.getPost() != null ? bicycle.getPost().getOwner().getUsername() : null, bicycle.getBrandModel(),
				bicycle.getRentalPrice(), bicycle.getCategory().getCategoryName());
	}

	@Override
	public Optional<Bicycle> getBicycleById(Long id) {
		return bicycleRepository.findById(id);
	}

	@Override
	public Bicycle createBicycle(Bicycle bicycle) {
		// Crear una nueva instancia de Bicycle
		Bicycle newBicycle = new Bicycle();

		// Establecer los campos simples
		newBicycle.setBrandModel(bicycle.getBrandModel());
		newBicycle.setDescription(bicycle.getDescription());
		newBicycle.setRentalPrice(bicycle.getRentalPrice());
		newBicycle.setBicycleImage(bicycle.getBicycleImage());

		// Verificar si la categoría existe y establecerla en la nueva bicicleta
		Category category = categoryRepository.findById(bicycle.getCategory().getId()).orElseThrow(
				() -> new IllegalArgumentException("Category with id " + bicycle.getCategory().getId() + " not found"));
		newBicycle.setCategory(category);

		// Verificar si el owner existe y establecerlo en la nueva bicicleta
		if (bicycle.getOwner() != null && bicycle.getOwner().getId() != null) {
			// Obtener el owner correspondiente de la base de datos
			User owner = userRepository.findById(bicycle.getOwner().getId()).orElseThrow(
					() -> new IllegalArgumentException("User with id " + bicycle.getOwner().getId() + " not found"));

			// Asignar el owner a la bicicleta
			newBicycle.setOwner(owner);
		} else {
			// Loguear un mensaje de advertencia indicando que el ID del owner es nulo
			System.out.println("Warning: Owner ID is null");
		}

		// Guardar la nueva bicicleta para obtener el ID
		newBicycle = bicycleRepository.save(newBicycle);

		// Asignar el post correspondiente si está disponible
		if (bicycle.getPost() != null && bicycle.getPost().getId() != null) {
			// Obtener el post correspondiente de la base de datos
			Post post = postRepository.findById(bicycle.getPost().getId()).orElseThrow(
					() -> new IllegalArgumentException("Post with id " + bicycle.getPost().getId() + " not found"));

			// Asignar el post a la bicicleta
			newBicycle.setPost(post);
		} else {
			// Loguear un mensaje de advertencia indicando que el ID del post es nulo
			System.out.println("Warning: Post ID is null");
		}

		// Guardar y devolver la nueva bicicleta con la referencia al post, si está
		// disponible
		return bicycleRepository.save(newBicycle);

	}

	@Override
	public Bicycle updateBicycle(Long id, Bicycle bicycle) {
		Bicycle existingBicycle = bicycleRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Bicycle with id " + id + " not found"));

		// Update fields
		existingBicycle.setBrandModel(bicycle.getBrandModel());
		existingBicycle.setDescription(bicycle.getDescription());
		existingBicycle.setRentalPrice(bicycle.getRentalPrice());
		existingBicycle.setOwner(bicycle.getOwner());
		existingBicycle.setPost(bicycle.getPost());

		// Update category
		Category newCategory = categoryRepository.findById(bicycle.getCategory().getId()).orElseThrow(
				() -> new IllegalArgumentException("Category with id " + bicycle.getCategory().getId() + " not found"));
		existingBicycle.setCategory(newCategory);
		existingBicycle.setBicycleImage(bicycle.getBicycleImage());

		return bicycleRepository.save(existingBicycle);
	}

	@Override
	public void deleteBicycle(Long id) {
		if (!bicycleRepository.existsById(id)) {
			throw new IllegalArgumentException("Bicycle with id " + id + " not found");
		}
		bicycleRepository.deleteById(id);
	}

	@Override
	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}

	@GetMapping("/images/{filename:.+}")
	public Resource getImage(@PathVariable String filename) {
		return resourceLoader.getResource("classpath:/static/images/" + filename);
	}
	
	@Override
	public Optional<Bicycle> getBicycleByPostId(Long postId) {
	    return bicycleRepository.findByPostId(postId);
	}


}
