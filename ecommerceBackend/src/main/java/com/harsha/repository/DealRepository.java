package com.harsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harsha.model.Deal;

public interface DealRepository extends JpaRepository<Deal,Long>{
    
}
