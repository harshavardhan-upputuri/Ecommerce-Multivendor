package com.harsha.service;

import com.harsha.model.Product;
import com.harsha.model.User;
import com.harsha.model.Wishlist;

public interface WishlistService {
    
    Wishlist createWishlist(User user);
    Wishlist getWishlistByUserId(User user);
    Wishlist addProductToWishlist(User user,Product product);    
}
