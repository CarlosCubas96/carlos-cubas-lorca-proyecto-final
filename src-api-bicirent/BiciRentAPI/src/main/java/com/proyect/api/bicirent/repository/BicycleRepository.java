package com.proyect.api.bicirent.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyect.api.bicirent.models.Bicycle;
import com.proyect.api.bicirent.models.User;

@Repository
public interface BicycleRepository extends JpaRepository<Bicycle, Long> {

	List<Bicycle> findByOwner(User owner);

}
