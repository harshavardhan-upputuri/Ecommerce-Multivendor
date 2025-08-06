package com.harsha.service;

import com.harsha.model.CartItem;

public interface CartItemService {
    
    CartItem updateCartITem(Long userId,Long id,CartItem cartItem) throws Exception;
    void removeCartItem(Long userId,Long cartITemId) throws Exception;
    CartItem findCartItemById(Long id) throws Exception;
}
