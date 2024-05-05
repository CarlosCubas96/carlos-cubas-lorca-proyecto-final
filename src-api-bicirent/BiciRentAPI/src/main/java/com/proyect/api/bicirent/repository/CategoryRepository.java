package com.proyect.api.bicirent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyect.api.bicirent.models.Category;
import com.proyect.api.bicirent.models.CategoryType;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

	boolean existsByCategoryType(CategoryType categoryType);

}