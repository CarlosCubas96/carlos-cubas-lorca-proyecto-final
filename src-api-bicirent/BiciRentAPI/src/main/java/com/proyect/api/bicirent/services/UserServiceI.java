package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.response.UserResponse;
import com.proyect.api.bicirent.models.User;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserServiceI {

	Page<UserResponse> getAllUsers(String searchTerm, Pageable pageable);

	Optional<User> getUserById(Long id);

	User createUser(User user);

	User updateUser(Long id, User user);

	void deleteUser(Long id);
}
