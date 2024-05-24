package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.response.BicycleResponse;
import com.proyect.api.bicirent.models.Bicycle;
import com.proyect.api.bicirent.models.Category;
import com.proyect.api.bicirent.repository.BicycleRepository;
import com.proyect.api.bicirent.repository.CategoryRepository;

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

	public BicycleServiceImpl(BicycleRepository bicycleRepository, CategoryRepository categoryRepository,
			ResourceLoader resourceLoader) {
		this.bicycleRepository = bicycleRepository;
		this.categoryRepository = categoryRepository;
		this.resourceLoader = resourceLoader;
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
		return bicycleRepository.save(bicycle);
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

}
