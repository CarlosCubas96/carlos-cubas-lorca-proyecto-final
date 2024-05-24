package com.proyect.api.bicirent.models;

import jakarta.persistence.*;

@Entity
@Table(name = "BR_BICYCLES")
public class Bicycle {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "BICYCLE_ID")
	private Long id;

	@Column(name = "BICYCLE_BRAND_MODEL", nullable = false, length = 100)
	private String brandModel;

	@Column(name = "DESCRIPTION", length = 255)
	private String description;

	@Column(name = "RENTAL_PRICE", nullable = false)
	private Double rentalPrice;

	@Column(name = "BICYCLE_IMAGE", length = 255)
	private String bicycleImage;

	@ManyToOne
	@JoinColumn(name = "CATEGORY_ID", nullable = false)
	private Category category;

	@ManyToOne
	@JoinColumn(name = "OWNER_USER_ID", nullable = false)
	private User owner;

	@OneToOne
	@JoinColumn(name = "POST_ID")
	private Post post;

	public Bicycle() {

	}

	public Bicycle(String brandModel, Post post, String description, Double rentalPrice, User owner, Category category,
			String bicycleImage) {
		this.brandModel = brandModel;
		this.post = post;
		this.description = description;
		this.rentalPrice = rentalPrice;
		this.category = category;
		this.owner = owner;
		this.bicycleImage = bicycleImage;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBrandModel() {
		return brandModel;
	}

	public void setBrandModel(String brandModel) {
		this.brandModel = brandModel;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getRentalPrice() {
		return rentalPrice;
	}

	public void setRentalPrice(Double rentalPrice) {
		this.rentalPrice = rentalPrice;
	}

	public String getBicycleImage() {
		return bicycleImage;
	}

	public void setBicycleImage(String bicycleImage) {
		this.bicycleImage = bicycleImage;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	@Override
	public String toString() {
		return "Bicycle [getId()=" + getId() + ", getBrandModel()=" + getBrandModel() + ", getDescription()="
				+ getDescription() + ", getRentalPrice()=" + getRentalPrice() + ", getBicycleImage()="
				+ getBicycleImage() + ", getCategory()=" + getCategory() + ", getOwner()=" + getOwner() + ", getPost()="
				+ getPost() + "]";
	}

}
