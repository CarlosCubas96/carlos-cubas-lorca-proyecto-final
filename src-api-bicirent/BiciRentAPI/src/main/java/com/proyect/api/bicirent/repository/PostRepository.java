package com.proyect.api.bicirent.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.proyect.api.bicirent.models.Category;
import com.proyect.api.bicirent.models.Post;
import com.proyect.api.bicirent.models.Tag;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

	Page<Post> findByPostNameContaining(String searchTerm, Pageable pageable);

	Page<Post> findByOwner_Id(Long userId, Pageable pageable);

	Page<Post> findByOwner_IdAndPostNameContaining(Long userId, String searchTerm, Pageable pageable);

	Page<Post> findByTags(Tag tag, Pageable pageable);

	Page<Post> findByPostNameContainingAndTags(String searchTerm, Tag tag, Pageable pageable);

	@Query("SELECT p FROM Post p JOIN p.tags t WHERE t.tagName = :tagName")
	Page<Post> getAllPostsByTagName(@Param("tagName") String tagName, Pageable pageable);

	Page<Post> findByCategory(Category category, Pageable pageable);

	Page<Post> findByCreationDateBetween(LocalDate fromDate, LocalDate toDate, Pageable pageable);

	@Query("SELECT p FROM Post p ORDER BY p.creationDate DESC")
	List<Post> findTop4ByOrderByCreationDateDesc();

}