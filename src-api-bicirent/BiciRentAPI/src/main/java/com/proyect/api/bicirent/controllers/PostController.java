package com.proyect.api.bicirent.controllers;

import com.proyect.api.bicirent.dto.response.PostResponse;
import com.proyect.api.bicirent.models.Category;
import com.proyect.api.bicirent.models.Post;
import com.proyect.api.bicirent.models.Tag;
import com.proyect.api.bicirent.services.PostServiceImpl;
import com.proyect.api.bicirent.services.TagServiceImpl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Page<PostResponse>> getAllPosts(@RequestParam(required = false) String searchTerm,
			@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "6") int pageSize) {
		Page<PostResponse> postsPage = postService.getAllPosts(searchTerm, PageRequest.of(pageNumber, pageSize));
		if (postsPage.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(postsPage, HttpStatus.OK);
	}

	@GetMapping("/tags/{tagName}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Page<Post>> getAllPostsByTagName(@PathVariable String tagName,
			@RequestParam(required = false, defaultValue = "0") int pageNumber,
			@RequestParam(defaultValue = "6") int pageSize) {
		Page<Post> postsPage = postService.getAllPostsByTagName(tagName, PageRequest.of(pageNumber, pageSize));
		if (postsPage.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(postsPage, HttpStatus.OK);
	}

	@GetMapping("/categories/{categoryId}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Page<PostResponse>> getAllPostsByCategoryId(@PathVariable Long categoryId,
			@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "6") int pageSize) {
		Page<PostResponse> postsPage = postService.getAllPostsByCategoryId(categoryId,
				PageRequest.of(pageNumber, pageSize));
		if (postsPage.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(postsPage, HttpStatus.OK);
	}

	@GetMapping("/filterPrice")
	public Page<Post> filterPostsByBicycleRentalPrice(@RequestParam Integer price,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		return postService.getPostsByRentalPriceRange(price, page, size);
	}

	@GetMapping("/filterDate")
	public ResponseEntity<Page<PostResponse>> getAllPostsByDateRange(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate,
			@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "6") int pageSize) {
		Page<PostResponse> postsPage = postService.getAllPostsByDateRange(fromDate, toDate,
				PageRequest.of(pageNumber, pageSize));
		if (postsPage.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(postsPage, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
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

	@GetMapping("/user/{userId}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Page<PostResponse>> getAllPostsByUserId(@PathVariable("userId") Long userId,
			@RequestParam(required = false) String searchTerm, @RequestParam(defaultValue = "0") int pageNumber,
			@RequestParam(defaultValue = "6") int pageSize) {
		Page<PostResponse> postsPage = postService.getAllPostsByUserId(userId, searchTerm,
				PageRequest.of(pageNumber, pageSize));
		if (postsPage.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(postsPage, HttpStatus.OK);
	}

	@GetMapping("/tags")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<Tag>> getAllTags() {
		List<Tag> tags = tagService.getAllTags();
		if (tags.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(tags, HttpStatus.OK);
	}
	
	

}
