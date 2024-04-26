package com.proyect.api.bicirent.models;

import jakarta.persistence.*;

@Entity
@Table(name = "BR_ROLES")
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ROL_ID")
	private Integer id;

	@Enumerated(EnumType.STRING)
	@Column(name = "ROL_NAME", length = 20)
	private ERole name;

	public Role() {

	}

	public Role(ERole name) {
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public ERole getName() {
		return name;
	}

	public void setName(ERole name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Role [getId()=" + getId() + ", getName()=" + getName() + "]";
	}

}
