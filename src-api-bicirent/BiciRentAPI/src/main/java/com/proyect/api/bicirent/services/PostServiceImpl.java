package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.response.PostResponse;
import com.proyect.api.bicirent.models.Bicycle;
import com.proyect.api.bicirent.models.Category;
import com.proyect.api.bicirent.models.Post;
import com.proyect.api.bicirent.models.Rental;
import com.proyect.api.bicirent.models.Tag;
import com.proyect.api.bicirent.repository.CategoryRepository;
import com.proyect.api.bicirent.repository.PostRepository;
import com.proyect.api.bicirent.repository.TagRepository;

import org.antlr.v4.runtime.misc.Array2DHashSet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PostServiceImpl implements PostServiceI {

	private final PostRepository postRepository;
	private final CategoryRepository categoryRepository;
	private final TagRepository tagRepository;

	public PostServiceImpl(PostRepository postRepository, CategoryRepository categoryRepository,
			TagRepository tagRepository) {
		this.postRepository = postRepository;
		this.categoryRepository = categoryRepository;
		this.tagRepository = tagRepository;
	}

	@Override
	public Page<PostResponse> getAllPosts(String searchTerm, Pageable pageable) {
		Page<Post> postsPage;
		if (searchTerm == null || searchTerm.isEmpty()) {
			postsPage = postRepository.findAll(pageable);
		} else {
			postsPage = postRepository.findByPostNameContaining(searchTerm, pageable);
		}
		return postsPage.map(this::mapToPostResponse);
	}

	private PostResponse mapToPostResponse(Post post) {
		return new PostResponse(post.getId(), post.getOwner().getUsername(), post.getPostName(), post.getDescription(),
				post.getCreationDate(), post.getPostStatus().toString());
	}

	@Override
	public Optional<Post> getPostById(Long id) {
		return postRepository.findById(id);
	}

	@Override
	public Post createPost(Post post) {
		return postRepository.save(post);
	}

	@Override
	public Post updatePost(Long id, Post post) {
		if (!postRepository.existsById(id)) {
			throw new IllegalArgumentException("Post with id " + id + " not found");
		}
		Post existingPost = postRepository.findById(id).orElse(null);
		if (existingPost == null) {
			throw new IllegalArgumentException("Post with id " + id + " not found");
		}

		// Actualizar campos simples de la publicación
		existingPost.setPostName(post.getPostName());
		existingPost.setDescription(post.getDescription());
		existingPost.setOtherDetails(post.getDescription());
		existingPost.setPostStatus(post.getPostStatus());

		// Actualizar categoría
		Category newCategory = categoryRepository.findById(post.getCategory().getId()).orElseThrow(
				() -> new IllegalArgumentException("Category with id " + post.getCategory().getId() + " not found"));
		existingPost.setCategory(newCategory);

		// Actualizar etiquetas
		Set<Tag> updatedTags = new HashSet<>();
		for (Tag tag : post.getTags()) {
			Tag existingTag = tagRepository.findById(tag.getId()).orElse(null);
			if (existingTag != null) {
				updatedTags.add(existingTag);
			} else {
				updatedTags.add(tagRepository.save(tag));
			}
		}
		existingPost.setTags(updatedTags);

		// Eliminar tags que ya no están presentes
		for (Tag existingTag : existingPost.getTags()) {
			if (!updatedTags.contains(existingTag)) {
				existingPost.getTags().remove(existingTag);

			}
		}

		// Guardar la publicación actualizada con las etiquetas actualizadas
		return postRepository.save(existingPost);
	}

	@Override
	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}

	@Override
	public void deletePost(Long id) {
		postRepository.deleteById(id);
	}
}
