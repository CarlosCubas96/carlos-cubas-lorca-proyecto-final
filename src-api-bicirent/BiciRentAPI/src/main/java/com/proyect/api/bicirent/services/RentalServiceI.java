package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.response.RentalResponse;
import com.proyect.api.bicirent.models.Rental;
import com.proyect.api.bicirent.models.RentalStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface RentalServiceI {

	Page<RentalResponse> getAllRentals(String searchTerm, Pageable pageable);

	Optional<Rental> getRentalById(Long id);

	Rental reserveBicycle (Rental rental);

	Rental updateRental(Long id, Rental rental);

	void deleteRental(Long id);

	List<RentalStatus> getAllRentalStatuses();

	Page<RentalResponse> getRentalsByLandlordId(Long id, Pageable pageable);

	Page<RentalResponse> getRentalsByLandlordIdAndStatus(Long landlordId, RentalStatus status, Pageable pageable);

}
