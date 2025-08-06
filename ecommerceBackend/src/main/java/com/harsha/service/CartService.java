package com.harsha.service;

import com.harsha.model.Cart;
import com.harsha.model.CartItem;
import com.harsha.model.Product;
import com.harsha.model.User;

public interface CartService {
    
    public CartItem addCartItem(User user,Product product,String size,int quantity);
    public Cart findUserCart(User user);
}
