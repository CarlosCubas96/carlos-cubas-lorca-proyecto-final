package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.response.RentalResponse;
import com.proyect.api.bicirent.models.Bicycle;
import com.proyect.api.bicirent.models.Rental;
import com.proyect.api.bicirent.models.RentalStatus;
import com.proyect.api.bicirent.models.User;
import com.proyect.api.bicirent.repository.BicycleRepository;
import com.proyect.api.bicirent.repository.RentalRepository;
import com.proyect.api.bicirent.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RentalServiceImpl implements RentalServiceI {

	private final RentalRepository rentalRepository;
	private final BicycleRepository bicycleRepository;
	private final UserRepository userRepository;

	public RentalServiceImpl(RentalRepository rentalRepository, BicycleRepository bicycleRepository,
			UserRepository userRepository) {
		this.rentalRepository = rentalRepository;
		this.bicycleRepository = bicycleRepository;
		this.userRepository = userRepository;
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

	private RentalResponse mapToRentalResponse2(Rental rental) {
		return new RentalResponse(rental.getId(), rental.getEndDate(), rental.getRentedBicycle().getRentalPrice(),
				rental.getRentedBicycle().getDescription(), rental.getRentedBicycle().getBicycleImage(),
				rental.getRentalStatus().name());
	}

	@Override
	public Optional<Rental> getRentalById(Long id) {
		return rentalRepository.findById(id);
	}

	@Override
	public List<RentalStatus> getAllRentalStatuses() {
		List<RentalStatus> status = new ArrayList<>();
		for (RentalStatus rentalStatus : RentalStatus.values()) {
			status.add(rentalStatus);
		}
		return status;
	}

	@Override
	public Rental reserveBicycle(Rental rental) {

		Rental newRental = new Rental();
		// Lógica para validar y guardar la reserva
		// Obtener la bicicleta y el usuario desde sus repositorios
		Bicycle bicycle = bicycleRepository.findById(rental.getRentedBicycle().getId())
				.orElseThrow(() -> new IllegalArgumentException("Invalid bicycle ID"));

		User landlord = userRepository.findById(rental.getLandlord().getId())
				.orElseThrow(() -> new IllegalArgumentException("Invalid LandLord user ID"));

		User tentant = userRepository.findById(rental.getTenant().getId())
				.orElseThrow(() -> new IllegalArgumentException("Invalid Tentant user ID"));

		newRental.setRentedBicycle(bicycle);
		newRental.setLandlord(landlord);
		newRental.setTenant(tentant);

		newRental.setRentalStatus(RentalStatus.ACTIVE);

		newRental.setStartDate(rental.getStartDate());
		newRental.setEndTime(rental.getEndDate());

		return rentalRepository.save(newRental);
	}

	@Override
	public Rental updateRental(Long id, Rental rental) {
		if (!rentalRepository.existsById(id)) {
			throw new IllegalArgumentException("Rental with id " + id + " not found");
		}
		Rental existingRental = rentalRepository.findById(id).orElse(null);
		if (existingRental == null) {
			throw new IllegalArgumentException("Rental with id " + id + " not found");
		}

		// Actualizar los campos del Rental según sea necesario
		existingRental.setStartDate(rental.getStartDate());
		existingRental.setEndTime(rental.getEndDate());
		existingRental.setRentalStatus(rental.getRentalStatus());

		// Acceder al objeto Bicycle asociado al Rental y actualizar el precio del
		// alquiler
		Bicycle rentedBicycle = existingRental.getRentedBicycle();
		if (rentedBicycle != null) {
			rentedBicycle.setRentalPrice(rental.getRentedBicycle().getRentalPrice());

			// Guardar el objeto Bicycle actualizado
			bicycleRepository.save(rentedBicycle);
		}

		// Guardar el objeto Rental actualizado
		return rentalRepository.save(existingRental);
	}

	@Override
	public void deleteRental(Long id) {
		if (!rentalRepository.existsById(id)) {
			throw new IllegalArgumentException("Rental with id " + id + " not found");
		}
		rentalRepository.deleteById(id);
	}

	@Override
	public Page<RentalResponse> getRentalsByLandlordId(Long id, Pageable pageable) {
		Page<Rental> rentalsPage;
		rentalsPage = rentalRepository.findByLandlord_Id(id, pageable);
		return rentalsPage.map(this::mapToRentalResponse2);
	}

	@Override
	public Page<RentalResponse> getRentalsByLandlordIdAndStatus(Long id, RentalStatus status, Pageable pageable) {

		Page<Rental> rentalsPage;
		rentalsPage = rentalRepository.findByLandlord_IdAndRentalStatus(id, status, pageable);

		return rentalsPage.map(this::mapToRentalResponse2);
	}

}
