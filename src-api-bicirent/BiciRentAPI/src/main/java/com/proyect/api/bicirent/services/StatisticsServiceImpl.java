package com.proyect.api.bicirent.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.proyect.api.bicirent.repository.UserRepository;
import com.proyect.api.bicirent.repository.RentalRepository;
import com.proyect.api.bicirent.models.Bicycle;
import com.proyect.api.bicirent.models.Rental;
import com.proyect.api.bicirent.models.RentalStatus;
import com.proyect.api.bicirent.repository.BicycleRepository;

@Service
public class StatisticsServiceImpl implements StatisticsServiceI {

	private final UserRepository userRepository;
	private final RentalRepository rentalRepository;
	private final BicycleRepository bicycleRepository;

	public StatisticsServiceImpl(UserRepository userRepository, RentalRepository rentalRepository,
			BicycleRepository bicycleRepository) {
		this.userRepository = userRepository;
		this.rentalRepository = rentalRepository;
		this.bicycleRepository = bicycleRepository;
	}

	@Override
	public long getTotalUsers() {
		return userRepository.count();
	}

	@Override
	public long getTotalRentals() {
		return rentalRepository.count();
	}

	@Override
	public long getCompletedRentals() {
		return rentalRepository.countByRentalStatus(RentalStatus.COMPLETED);
	}

	@Override
	public long getCurrentlyRentedBicycles() {
		return rentalRepository.countByRentalStatus(RentalStatus.ACTIVE);
	}
	
	@Override
	public long getTotalBicycles() {
		System.out.println(rentalRepository.count());
		return rentalRepository.count();
	}

	@Override
	public Map<String, Double> getBicyclesByCategoryPercentage() {
		List<Bicycle> bicycles = bicycleRepository.findAll();
		long total = bicycles.size();
		return bicycles.stream().collect(Collectors.groupingBy(b -> b.getCategory().getCategoryName(),
				Collectors.collectingAndThen(Collectors.counting(), count -> 100.0 * count / total)));
	}

	@Override
	public Map<String, Long> getDailyRentalsOverLastMonth() {
		LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
		LocalDate today = LocalDate.now();
		List<Rental> rentals = rentalRepository.findAllByStartDateBetween(thirtyDaysAgo, today);

		Map<String, Long> dailyCounts = new HashMap<>();

		for (Rental rental : rentals) {
			String dayKey = rental.getStartDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
			dailyCounts.merge(dayKey, 1L, Long::sum);
		}

		return dailyCounts;
	}

}
