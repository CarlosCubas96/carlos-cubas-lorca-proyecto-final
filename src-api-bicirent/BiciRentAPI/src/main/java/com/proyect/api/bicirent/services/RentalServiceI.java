package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.response.RentalResponse;
import com.proyect.api.bicirent.models.Rental;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

public interface RentalServiceI {

	Page<RentalResponse> getAllRentals(String searchTerm, Pageable pageable);

	Optional<Rental> getRentalById(Long id);

	Rental createRental(Rental rental);

	Rental updateRental(Long id, Rental rental);

	void deleteRental(Long id);
}
