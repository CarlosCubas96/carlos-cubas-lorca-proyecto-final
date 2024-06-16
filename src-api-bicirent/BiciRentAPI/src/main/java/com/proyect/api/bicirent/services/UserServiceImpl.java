package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.response.UserResponse;
import com.proyect.api.bicirent.models.User;
import com.proyect.api.bicirent.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserServiceI {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public Page<UserResponse> getAllUsers(String searchTerm, Pageable pageable) {
		Page<User> page;
		if (searchTerm == null || searchTerm.isEmpty()) {
			page = userRepository.findAll(pageable);
		} else {
			page = userRepository.findByUsernameContainingOrFirstnameContainingOrEmailContaining(searchTerm, searchTerm,
					searchTerm, pageable);
		}

		return page.map(this::mapToUserResponse);
	}

	@Override
	public Optional<User> getUserById(Long id) {
		return userRepository.findById(id);
	}

	@Override
	public User createUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	@Override
	public User updateUser(Long id, User user) {
		if (!userRepository.existsById(id)) {
			throw new IllegalArgumentException("User with id " + id + " not found");
		}

		user.setId(id);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	@Override
	public void deleteUser(Long id) {
		if (!userRepository.existsById(id)) {
			throw new IllegalArgumentException("User with id " + id + " not found");
		}
		userRepository.deleteById(id);
	}

	private UserResponse mapToUserResponse(User user) {
		return new UserResponse(user.getId(), user.getFirstname(), user.getUsername(), user.getLastname(),
				user.getEmail(), user.getPassword(), getRoleNames(user));
	}

	private String getRoleNames(User user) {
		return user.getRoles().stream().map(role -> role.getName().toString()).collect(Collectors.joining(", "));
	}
}
