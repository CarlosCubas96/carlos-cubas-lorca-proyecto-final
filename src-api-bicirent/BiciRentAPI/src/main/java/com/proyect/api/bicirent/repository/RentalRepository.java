package com.proyect.api.bicirent.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.proyect.api.bicirent.models.Rental;
import com.proyect.api.bicirent.models.RentalStatus;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {

	long countByRentalStatus(RentalStatus rentalStatus);

	@Query("SELECT new map(r.startDate as date, COUNT(r) as count) " + "FROM Rental r WHERE r.startDate >= :startDate "
			+ "GROUP BY r.startDate ORDER BY r.startDate")
	List<Map<String, Object>> findRentalsCountByDateAfter(LocalDate startDate);

	@Query("SELECT r FROM Rental r WHERE r.startDate >= :startDate AND r.startDate <= :endDate")
	List<Rental> findAllByStartDateBetween(LocalDate startDate, LocalDate endDate);

	Page<Rental> findByRentedBicycle_BrandModelContaining(String brandModel, Pageable pageable);
}
