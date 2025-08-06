package com.harsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harsha.model.HomeCategory;

public interface HomeCategoryRepository extends JpaRepository<HomeCategory,Long>{
    
}
