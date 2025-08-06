package com.harsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harsha.model.Cart;
import com.harsha.model.CartItem;
import com.harsha.model.Product;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
    
    CartItem findByCartAndProductAndSize(Cart cart,Product product,String size);

}
