package com.proyect.api.bicirent.services;

import java.util.Map;

public interface StatisticsServiceI {

	long getTotalUsers();

	long getTotalRentals();

	long getCompletedRentals();

	long getCurrentlyRentedBicycles();

	Map<String, Long> getBicyclesByCategory();

	Map<String, Long> getDailyRentalsOverLastMonth();

}