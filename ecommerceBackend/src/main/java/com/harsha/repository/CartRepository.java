package com.harsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.harsha.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {

    Cart findByUserId(Long id);
} 
