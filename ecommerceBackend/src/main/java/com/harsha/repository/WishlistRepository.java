package com.harsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harsha.model.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist,Long>{
    
    Wishlist findByUserId(Long userId);
}
