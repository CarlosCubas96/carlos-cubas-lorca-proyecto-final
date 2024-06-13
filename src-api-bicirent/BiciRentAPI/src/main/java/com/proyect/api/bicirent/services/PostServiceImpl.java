package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.dto.response.PostResponse;
import com.proyect.api.bicirent.models.Bicycle;
import com.proyect.api.bicirent.models.Category;
import com.proyect.api.bicirent.models.Post;
import com.proyect.api.bicirent.models.PostStatus;
import com.proyect.api.bicirent.models.Tag;
import com.proyect.api.bicirent.repository.BicycleRepository;
import com.proyect.api.bicirent.repository.CategoryRepository;
import com.proyect.api.bicirent.repository.PostRepository;
import com.proyect.api.bicirent.repository.TagRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostServiceI {

	private final PostRepository postRepository;
	private final CategoryRepository categoryRepository;
	private final TagRepository tagRepository;
	private final BicycleRepository bicycleRepository;

	public PostServiceImpl(PostRepository postRepository, CategoryRepository categoryRepository,
			TagRepository tagRepository, BicycleRepository bicycleRepository) {
		this.postRepository = postRepository;
		this.categoryRepository = categoryRepository;
		this.tagRepository = tagRepository;
		this.bicycleRepository = bicycleRepository;
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

	@Override
	public List<PostResponse> getLatestPosts() {
		List<Post> latestPosts = postRepository.findTop4ByOrderByCreationDateDesc();
		return latestPosts.stream().map(this::mapToPostResponse).collect(Collectors.toList());
	}

	@Override
	public Page<PostResponse> getAllPostsByCategoryId(Long categoryId, Pageable pageable) {
		Category category = categoryRepository.findById(categoryId)
				.orElseThrow(() -> new IllegalArgumentException("Category with id " + categoryId + " not found"));
		Page<Post> postsPage = postRepository.findByCategory(category, pageable);
		return postsPage.map(this::mapToPostResponse);
	}

	@Override
	public Page<Post> getAllPostsByTagName(String tagName, Pageable pageable) {
		return postRepository.getAllPostsByTagName(tagName, pageable);
	}

	public Page<Post> getPostsByRentalPriceRange(Integer price, int page, int size) {
		// Obtener las bicicletas que caen dentro del rango de precios
		Page<Bicycle> bicycles = bicycleRepository.findByRentalPriceGreaterThanEqual(price, PageRequest.of(page, size));

		// Obtener las publicaciones asociadas a las bicicletas
		Page<Post> posts = bicycles.map(Bicycle::getPost);

		return posts;
	}

	@Override
	public Page<PostResponse> getAllPostsByDateRange(LocalDate fromDate, LocalDate toDate, Pageable pageable) {
		// Obtener las publicaciones dentro del rango de fechas especificado
		Page<Post> postsPage = postRepository.findByCreationDateBetween(fromDate, toDate, pageable);
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

		// Crear una nueva instancia de Post
		Post newPost = new Post();

		// Establecer los campos simples
		newPost.setOwner(post.getOwner());

		newPost.setCreationDate(LocalDate.now());

		newPost.setPostName(post.getPostName());
		newPost.setDescription(post.getDescription());
		newPost.setOtherDetails(post.getOtherDetails());
		newPost.setPostStatus(PostStatus.DISPONIBLE);

		// Verificar si la categoría existe y establecerla en el nuevo Post
		Category category = categoryRepository.findById(post.getCategory().getId()).orElseThrow(
				() -> new IllegalArgumentException("Category with id " + post.getCategory().getId() + " not found"));
		newPost.setCategory(category);

		// Manejar las etiquetas
		Set<Tag> tags = new HashSet<>();
		for (Tag tag : post.getTags()) {
			// Verificar si la etiqueta ya existe en la base de datos
			Tag existingTag = tagRepository.findByTagName(tag.getTagName());
			if (existingTag != null) {
				tags.add(existingTag); // Si existe, agregar la etiqueta existente
			} else {
				// Si no existe, guardarla y luego agregarla
				Tag savedTag = tagRepository.save(tag);
				tags.add(savedTag);
			}
		}
		newPost.setTags(tags);

		// Guardar y devolver el nuevo Post
		return postRepository.save(newPost);
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

	@Override
	public Page<PostResponse> getAllPostsByUserId(Long userId, String searchTerm, Pageable pageable) {
		Page<Post> postsPage;
		if (searchTerm == null || searchTerm.isEmpty()) {
			postsPage = postRepository.findByOwner_Id(userId, pageable);
		} else {
			postsPage = postRepository.findByOwner_IdAndPostNameContaining(userId, searchTerm, pageable);
		}
		return postsPage.map(this::mapToPostResponse);
	}

}
