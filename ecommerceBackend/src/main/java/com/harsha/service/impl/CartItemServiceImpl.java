package com.harsha.service.impl;

import org.springframework.stereotype.Service;

import com.harsha.model.CartItem;
import com.harsha.model.User;
import com.harsha.repository.CartItemRepository;
import com.harsha.service.CartItemService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService{

    private final CartItemRepository cartItemRepository;

    @Override
    public CartItem findCartItemById(Long id) throws Exception {
        return cartItemRepository.findById(id).orElseThrow(()-> new Exception("cart item ot found with id "+id));
    }

    @Override
    public void removeCartItem(Long userId, Long cartITemId) throws Exception {
       CartItem item=findCartItemById(cartITemId);
       User cartItemUser=item.getCart().getUser();
       
       if(cartItemUser.getId().equals(userId)){
        cartItemRepository.delete(item);
        return;
       }
       throw new Exception("you can't delete this cartItem");
        
    }

    @Override
    public CartItem updateCartITem(Long userId, Long id, CartItem cartItem) throws Exception {
       CartItem item=findCartItemById(id);
       
       User cartItemUser=item.getCart().getUser();

       if(cartItemUser.getId().equals(userId)){
        item.setQuantity(cartItem.getQuantity());
        item.setMrpPrice(item.getQuantity()*item.getProduct().getSellingPrice());
        return cartItemRepository.save(item);
       }
       throw new Exception("you can't update this cartItem");
    }
    
}
