package com.harsha.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harsha.model.Review;

public interface ReviewRepository extends JpaRepository<Review,Long>{
    
    List<Review> findByProductId(Long productId);
}
