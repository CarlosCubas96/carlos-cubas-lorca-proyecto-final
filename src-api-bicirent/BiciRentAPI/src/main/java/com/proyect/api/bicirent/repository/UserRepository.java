package com.proyect.api.bicirent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.proyect.api.bicirent.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	Page<User> findByUsernameContainingOrFirstnameContainingOrEmailContaining(String username, String firstname,
			String email, Pageable pageable);

}