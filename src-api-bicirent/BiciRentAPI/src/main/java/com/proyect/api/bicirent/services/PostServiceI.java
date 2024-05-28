package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.response.PostResponse;
import com.proyect.api.bicirent.models.Category;
import com.proyect.api.bicirent.models.Post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface PostServiceI {

	Page<PostResponse> getAllPosts(String searchTerm, Pageable pageable);

	Optional<Post> getPostById(Long id);

	Post createPost(Post post);

	Post updatePost(Long id, Post post);

	void deletePost(Long id);

	List<Category> getAllCategories();

	Page<PostResponse> getAllPostsByUserId(Long userId, String searchTerm, Pageable pageable);
}
