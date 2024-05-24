package com.proyect.api.bicirent.dto.response;

public class BicycleResponse {

	private Long id;
	private String landlordUsername;
	private String tenantUsername;
	private String bicycleBrandModel;
	private Double cost;
	private String category;

	public BicycleResponse(Long id, String landlordUsername, String tenantUsername, String bicycleBrandModel,
			Double cost, String category) {
		this.id = id;
		this.landlordUsername = landlordUsername;
		this.tenantUsername = tenantUsername;
		this.bicycleBrandModel = bicycleBrandModel;
		this.cost = cost;
		this.category = category;
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

	public String getTenantUsername() {
		return tenantUsername;
	}

	public void setTenantUsername(String tenantUsername) {
		this.tenantUsername = tenantUsername;
	}

	public String getBicycleBrandModel() {
		return bicycleBrandModel;
	}

	public void setBicycleBrandModel(String bicycleBrandModel) {
		this.bicycleBrandModel = bicycleBrandModel;
	}

	public Double getCost() {
		return cost;
	}

	public void setCost(Double cost) {
		this.cost = cost;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
}
