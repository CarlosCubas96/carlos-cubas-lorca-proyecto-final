package com.proyect.api.bicirent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyect.api.bicirent.models.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

}