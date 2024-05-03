package com.proyect.api.bicirent.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.proyect.api.bicirent.services.StatisticsServiceImpl;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/statistics")
public class DashBoardHomeAdminController {

	private final StatisticsServiceImpl statisticsService;

	public DashBoardHomeAdminController(StatisticsServiceImpl statisticsService) {
		this.statisticsService = statisticsService;
	}

	@GetMapping("/general-stats")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Map<String, Long>> getGeneralStats() {

		Map<String, Long> stats = new HashMap<>();
		stats.put("totalUsers", statisticsService.getTotalUsers());
		stats.put("totalRentals", statisticsService.getTotalRentals());
		stats.put("completedRentals", statisticsService.getCompletedRentals());
		stats.put("currentlyRentedBicycles", statisticsService.getCurrentlyRentedBicycles());
		return ResponseEntity.ok(stats);

	}

	@GetMapping("/bicycles-by-category")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Map<String, Long>> getBicyclesByCategory() {
		return ResponseEntity.ok(statisticsService.getBicyclesByCategory());
	}

	@GetMapping("/rentals-over-last-month")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public Map<String, Long> getMonthlyRentals() {
		return statisticsService.getDailyRentalsOverLastMonth();
	}
}
