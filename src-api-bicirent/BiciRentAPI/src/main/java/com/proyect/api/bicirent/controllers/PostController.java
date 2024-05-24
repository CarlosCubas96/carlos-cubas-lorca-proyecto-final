package com.proyect.api.bicirent.controllers;

import com.proyect.api.bicirent.dto.response.PostResponse;
import com.proyect.api.bicirent.models.Category;
import com.proyect.api.bicirent.models.Post;
import com.proyect.api.bicirent.models.Tag;
import com.proyect.api.bicirent.services.PostServiceImpl;
import com.proyect.api.bicirent.services.TagServiceImpl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

	private final PostServiceImpl postService;
	private final TagServiceImpl tagService;

	public PostController(PostServiceImpl postService, TagServiceImpl tagService) {
		this.postService = postService;
		this.tagService = tagService;
	}

	@GetMapping
	public ResponseEntity<Page<PostResponse>> getAllRentals(@RequestParam(required = false) String searchTerm,
			@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "6") int pageSize) {
		Page<PostResponse> postsPage = postService.getAllPosts(searchTerm, PageRequest.of(pageNumber, pageSize));
		if (postsPage.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(postsPage, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Post> getPostById(@PathVariable("id") Long id) {
		Optional<Post> post = postService.getPostById(id);
		return post.map(value -> ResponseEntity.ok().body(value)).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/categories")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<Category>> getAllCategories() {
		List<Category> categories = postService.getAllCategories();
		if (categories.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}

	@PostMapping
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Post> createPost(@RequestBody Post post) {
		Post createdPost = postService.createPost(post);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Post> updatePost(@PathVariable("id") Long id, @RequestBody Post post) {
		Post updatedPost = postService.updatePost(id, post);
		return updatedPost != null ? ResponseEntity.ok(updatedPost) : ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Void> deletePost(@PathVariable("id") Long id) {
		postService.deletePost(id);
		return ResponseEntity.noContent().build();
	}

	// Método para agregar una etiqueta a un post
	@PostMapping("/{postId}/tags")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Post> addTagToPost(@PathVariable("postId") Long postId, @RequestBody Tag tag) {
		Post updatedPost = tagService.addTagToPost(postId, tag);
		return ResponseEntity.ok(updatedPost);
	}

	// Método para eliminar una etiqueta de un post
	@DeleteMapping("/{postId}/tags/{tagId}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Post> removeTagFromPost(@PathVariable("postId") Long postId,
			@PathVariable("tagId") Long tagId) {
		Post updatedPost = tagService.removeTagFromPost(postId, tagId);
		return ResponseEntity.ok(updatedPost);
	}
}
