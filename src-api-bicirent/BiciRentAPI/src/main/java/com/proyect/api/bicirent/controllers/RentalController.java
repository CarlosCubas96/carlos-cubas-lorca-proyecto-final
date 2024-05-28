package com.proyect.api.bicirent.controllers;

import com.proyect.api.bicirent.dto.response.RentalResponse;
import com.proyect.api.bicirent.models.Rental;
import com.proyect.api.bicirent.models.RentalStatus;
import com.proyect.api.bicirent.services.RentalServiceImpl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

	private final RentalServiceImpl rentalService;

	public RentalController(RentalServiceImpl rentalService) {
		this.rentalService = rentalService;
	}

	@GetMapping
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Page<RentalResponse>> getAllRentals(@RequestParam(required = false) String searchTerm,
			@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "6") int pageSize) {
		Page<RentalResponse> rentalsPage = rentalService.getAllRentals(searchTerm,
				PageRequest.of(pageNumber, pageSize));
		if (rentalsPage.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(rentalsPage, HttpStatus.OK);
	}

	@GetMapping("/statuses")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<RentalStatus>> getAllRentalStatuses() {
		List<RentalStatus> rentalStatuses = rentalService.getAllRentalStatuses();
		return new ResponseEntity<>(rentalStatuses, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Rental> getRentalById(@PathVariable("id") Long id) {
		return rentalService.getRentalById(id).map(rental -> new ResponseEntity<>(rental, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PostMapping
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Rental> createRental(@RequestBody Rental rental) {
		Rental createdRental = rentalService.createRental(rental);
		return new ResponseEntity<>(createdRental, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Rental> updateRental(@PathVariable("id") Long id, @RequestBody Rental rental) {
		Rental updatedRental = rentalService.updateRental(id, rental);
		return updatedRental != null ? new ResponseEntity<>(updatedRental, HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<HttpStatus> deleteRental(@PathVariable("id") Long id) {
		rentalService.deleteRental(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/landlord/{landlordId}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Page<RentalResponse>> getRentalsByLandlordId(@PathVariable Long landlordId,
			@RequestParam(required = false) String status, @RequestParam(defaultValue = "0") int pageNumber,
			@RequestParam(defaultValue = "4") int pageSize) {

		Page<RentalResponse> rentalsPage;

		if (status != null && !status.isEmpty()) {
			RentalStatus rentalStatus = RentalStatus.valueOf(status);
			rentalsPage = rentalService.getRentalsByLandlordIdAndStatus(landlordId, rentalStatus,
					PageRequest.of(pageNumber, pageSize));
		} else {
			rentalsPage = rentalService.getRentalsByLandlordId(landlordId, PageRequest.of(pageNumber, pageSize));
		}

		if (rentalsPage.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(rentalsPage, HttpStatus.OK);
	}

}
