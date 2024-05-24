package com.proyect.api.bicirent.dto.response;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class RentalResponse {

	private Long id;
	private String landlordUsername;
	private String bicycleBrandModel;

	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate startDate;

	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate endDate;

	private Double cost;

	public RentalResponse(Long id, String landlordUsername, String bicycleBrandModel, LocalDate startDate,
			LocalDate endDate, Double cost) {
		this.id = id;
		this.landlordUsername = landlordUsername;
		this.bicycleBrandModel = bicycleBrandModel;
		this.startDate = startDate;
		this.endDate = endDate;
		this.cost = cost;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLandlordUsername() {
		return landlordUsername;
	}

	public void setLandlordUsername(String landlordUsername) {
		this.landlordUsername = landlordUsername;
	}

	public String getBicycleBrandModel() {
		return bicycleBrandModel;
	}

	public void setBicycleBrandModel(String bicycleBrandModel) {
		this.bicycleBrandModel = bicycleBrandModel;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public Double getCost() {
		return cost;
	}

	public void setCost(Double cost) {
		this.cost = cost;
	}
}
