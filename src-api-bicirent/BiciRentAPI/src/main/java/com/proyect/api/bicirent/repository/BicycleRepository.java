package com.proyect.api.bicirent.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyect.api.bicirent.models.Bicycle;
import com.proyect.api.bicirent.models.User;

@Repository
public interface BicycleRepository extends JpaRepository<Bicycle, Long> {

	List<Bicycle> findByOwner(User owner);

	Page<Bicycle> findByBrandModelContaining(String searchTerm, Pageable pageable);

}
