package com.proyect.api.bicirent.dto.response;

import java.time.LocalDate;

public class PostResponse {

	private Long id;
	private String userName;
	private String postName;
	private String description;
	private LocalDate creationDate;
	private String postStatus;
	private String imageUrl;
	private Double rentalPrice;

	public PostResponse(Long id, String userName, String postName, String description, LocalDate creationDate,
			String postStatus, Double rentalPrice) {
		this.id = id;
		this.userName = userName;
		this.postName = postName;
		this.description = description;
		this.creationDate = creationDate;
		this.postStatus = postStatus;
		this.rentalPrice = rentalPrice;
	}

	public PostResponse(Long id, String userName, String postName, String description, LocalDate creationDate,
			String postStatus) {
		this.id = id;
		this.userName = userName;
		this.postName = postName;
		this.description = description;
		this.creationDate = creationDate;
		this.postStatus = postStatus;

	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPostName() {
		return postName;
	}

	public void setPostName(String postName) {
		this.postName = postName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDate creationDate) {
		this.creationDate = creationDate;
	}

	public String getPostStatus() {
		return postStatus;
	}

	public void setPostStatus(String postStatus) {
		this.postStatus = postStatus;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getRentalPrice() {
		return rentalPrice;
	}

	public void setRentalPrice(Double rentalPrice) {
		this.rentalPrice = rentalPrice;
	}
}
