package com.proyect.api.bicirent.services;

import java.util.Map;

public interface StatisticsServiceI {

	long getTotalUsers();

	long getTotalRentals();

	long getCompletedRentals();

	long getCurrentlyRentedBicycles();
	
	long getTotalBicycles();

	Map<String, Double> getBicyclesByCategoryPercentage();

	Map<String, Long> getDailyRentalsOverLastMonth();

}