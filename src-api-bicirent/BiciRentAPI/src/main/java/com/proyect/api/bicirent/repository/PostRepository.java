package com.proyect.api.bicirent.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyect.api.bicirent.models.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

	Page<Post> findByPostNameContaining(String searchTerm, Pageable pageable);

	Page<Post> findByOwner_Id(Long userId, Pageable pageable);

	Page<Post> findByOwner_IdAndPostNameContaining(Long userId, String searchTerm, Pageable pageable);

}