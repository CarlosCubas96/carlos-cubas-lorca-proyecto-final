package com.proyect.api.bicirent.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "BR_USERS", uniqueConstraints = { @UniqueConstraint(columnNames = "USERNAME"),
		@UniqueConstraint(columnNames = "EMAIL") })
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "USER_ID")
	private Long id;

	@NotBlank
	@Size(max = 50)
	@Column(name = "USERNAME")
	private String username;

	@NotBlank
	@Size(max = 20)
	@Column(name = "FIRSTNAME")
	private String firstname;

	@NotBlank
	@Size(max = 20)
	@Column(name = "LASTNAME")
	private String lastname;

	@NotBlank
	@Size(max = 50)
	@Email
	@Column(name = "EMAIL")
	private String email;

	@NotBlank
	@Size(max = 120)
	@Column(name = "PASSWORD")
	private String password;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "BR_USERS_ROLES", joinColumns = @JoinColumn(name = "USER_ID"), inverseJoinColumns = @JoinColumn(name = "ROLE_ID"))
	private Set<Role> roles = new HashSet<>();

	public User() {
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
