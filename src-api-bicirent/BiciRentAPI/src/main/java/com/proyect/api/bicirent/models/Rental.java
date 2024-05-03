package com.proyect.api.bicirent.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "BR_RENTALS")
public class Rental {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "RENTAL_ID")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "RENTED_BICYCLE_ID", nullable = false)
	private Bicycle rentedBicycle;

	@ManyToOne
	@JoinColumn(name = "LANDLORD_USER_ID", nullable = false)
	private User landlord;

	@ManyToOne
	@JoinColumn(name = "TENANT_USER_ID", nullable = false)
	private User tenant;

	@Column(name = "START_DATE", nullable = false)
	private LocalDate startDate;

	@Column(name = "END_DATE", nullable = false)
	private LocalDate endDate;

	@Enumerated(EnumType.STRING)
	@Column(name = "RENTAL_STATUS", nullable = false)
	private RentalStatus rentalStatus;

	public Rental() {

	}

	public Rental(User landlord, User tenant, Bicycle rentedBicycle, LocalDate startDate, LocalDate endDate,
			RentalStatus rentalStatus) {
		this.landlord = landlord;
		this.tenant = tenant;
		this.rentedBicycle = rentedBicycle;
		this.startDate = startDate;
		this.endDate = endDate;
		this.rentalStatus = rentalStatus;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Bicycle getRentedBicycle() {
		return rentedBicycle;
	}

	public void setRentedBicycle(Bicycle rentedBicycle) {
		this.rentedBicycle = rentedBicycle;
	}

	public User getLandlord() {
		return landlord;
	}

	public void setLandlord(User landlord) {
		this.landlord = landlord;
	}

	public User getTenant() {
		return tenant;
	}

	public void setTenant(User tenant) {
		this.tenant = tenant;
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

	public void setEndTime(LocalDate endDate) {
		this.endDate = endDate;
	}

	public RentalStatus getRentalStatus() {
		return rentalStatus;
	}

	public void setRentalStatus(RentalStatus rentalStatus) {
		this.rentalStatus = rentalStatus;
	}

	@Override
	public String toString() {
		return "Rental{" + "id=" + id + ", rentedBicycle=" + rentedBicycle + ", landlord=" + landlord + ", tenant="
				+ tenant + ", startDate=" + startDate + ", endDate=" + endDate + ", rentalStatus=" + rentalStatus + '}';
	}
}
