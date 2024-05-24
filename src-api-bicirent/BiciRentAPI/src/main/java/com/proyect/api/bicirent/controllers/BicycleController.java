package com.proyect.api.bicirent.controllers;

import com.proyect.api.bicirent.dto.response.BicycleResponse;
import com.proyect.api.bicirent.models.Bicycle;
import com.proyect.api.bicirent.models.Category;
import com.proyect.api.bicirent.services.BicycleServiceImpl;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/bicycles")
public class BicycleController {

	private static final String UPLOAD_FOLDER = System.getProperty("user.home") + "/Desktop/images/";

	private final BicycleServiceImpl bicycleServiceImpl;

	public BicycleController(BicycleServiceImpl bicycleServiceImpl) {
		this.bicycleServiceImpl = bicycleServiceImpl;
		;
	}

	@GetMapping
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Page<BicycleResponse>> getAllBicycles(@RequestParam(required = false) String searchTerm,
			@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "6") int pageSize) {
		Page<BicycleResponse> bicyclesPage = bicycleServiceImpl.getAllBicycles(searchTerm,
				PageRequest.of(pageNumber, pageSize));
		if (bicyclesPage.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(bicyclesPage, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Bicycle> getBicycleById(@PathVariable("id") Long id) {
		return bicycleServiceImpl.getBicycleById(id).map(bicycle -> new ResponseEntity<>(bicycle, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PostMapping
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Bicycle> createBicycle(@RequestBody Bicycle bicycle) {
		Bicycle createdBicycle = bicycleServiceImpl.createBicycle(bicycle);
		return new ResponseEntity<>(createdBicycle, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Bicycle> updateBicycle(@PathVariable("id") Long id, @RequestBody Bicycle bicycle) {
		Bicycle updatedBicycle = bicycleServiceImpl.updateBicycle(id, bicycle);
		return updatedBicycle != null ? new ResponseEntity<>(updatedBicycle, HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<HttpStatus> deleteBicycle(@PathVariable("id") Long id) {
		bicycleServiceImpl.deleteBicycle(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/categories")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<Category>> getAllCategories() {
		List<Category> categories = bicycleServiceImpl.getAllCategories();
		if (categories.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}

	@GetMapping("/images/{imageName}")
	public ResponseEntity<byte[]> getImageByName(@PathVariable String imageName) {
		try {
			Path filePath = Paths.get(UPLOAD_FOLDER, imageName);
			byte[] imageBytes = Files.readAllBytes(filePath);

			org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
			headers.setContentType(org.springframework.http.MediaType.IMAGE_JPEG);

			return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.notFound().build();
		}
	}

}
