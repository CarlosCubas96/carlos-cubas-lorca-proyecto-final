package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.response.RentalResponse;
import com.proyect.api.bicirent.models.Rental;
import com.proyect.api.bicirent.repository.RentalRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RentalServiceImpl implements RentalServiceI {

	private final RentalRepository rentalRepository;

	public RentalServiceImpl(RentalRepository rentalRepository) {
		this.rentalRepository = rentalRepository;
	}

	@Override
	public Page<RentalResponse> getAllRentals(String searchTerm, Pageable pageable) {
		Page<Rental> rentalsPage;
		if (searchTerm == null || searchTerm.isEmpty()) {
			rentalsPage = rentalRepository.findAll(pageable);
		} else {
			rentalsPage = rentalRepository.findByRentedBicycle_BrandModelContaining(searchTerm, pageable);
		}
		return rentalsPage.map(this::mapToRentalResponse);
	}

	private RentalResponse mapToRentalResponse(Rental rental) {

		return new RentalResponse(rental.getId(), rental.getLandlord().getUsername(),
				rental.getRentedBicycle().getBrandModel(), rental.getStartDate(), rental.getEndDate(),
				rental.getRentedBicycle().getRentalPrice());
	}

	@Override
	public Optional<Rental> getRentalById(Long id) {
		return rentalRepository.findById(id);
	}

	@Override
	public Rental createRental(Rental rental) {
		return rentalRepository.save(rental);
	}

	@Override
	public Rental updateRental(Long id, Rental rental) {
		if (!rentalRepository.existsById(id)) {
			throw new IllegalArgumentException("Rental with id " + id + " not found");
		}
		rental.setId(id);
		return rentalRepository.save(rental);
	}

	@Override
	public void deleteRental(Long id) {
		if (!rentalRepository.existsById(id)) {
			throw new IllegalArgumentException("Rental with id " + id + " not found");
		}
		rentalRepository.deleteById(id);
	}

}
