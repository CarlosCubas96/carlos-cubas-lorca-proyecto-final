package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.response.BicycleResponse;
import com.proyect.api.bicirent.models.Bicycle;
import com.proyect.api.bicirent.models.Category;

import io.jsonwebtoken.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BicycleServiceI {

	Page<BicycleResponse> getAllBicycles(String searchTerm, Pageable pageable);

	Optional<Bicycle> getBicycleById(Long id);

	Bicycle createBicycle(Bicycle bicycle);

	Bicycle updateBicycle(Long id, Bicycle bicycle) throws IOException, IllegalStateException, java.io.IOException;

	void deleteBicycle(Long id);

	List<Category> getAllCategories();
}
