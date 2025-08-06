package com.harsha.service.impl;

import org.springframework.stereotype.Service;

import com.harsha.model.Product;
import com.harsha.model.User;
import com.harsha.model.Wishlist;
import com.harsha.repository.WishlistRepository;
import com.harsha.service.WishlistService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService{

    private final WishlistRepository wishlistRepository;


    @Override
    public Wishlist addProductToWishlist(User user, Product product) {
        Wishlist wishlist=getWishlistByUserId(user);

        if (wishlist.getProducts().contains(product)) {
            wishlist.getProducts().remove(product);
        }else{
            wishlist.getProducts().add(product);
        }
        return wishlistRepository.save(wishlist);
    }

    @Override
    public Wishlist createWishlist(User user) {
        Wishlist wishlist=new Wishlist();
        wishlist.setUser(user);
        return wishlistRepository.save(wishlist);
    }

    @Override
    public Wishlist getWishlistByUserId(User user) {
        Wishlist wishlist=wishlistRepository.findByUserId(user.getId());
        if(wishlist == null) return createWishlist(user);
        return wishlist;
    }
    
    

}
