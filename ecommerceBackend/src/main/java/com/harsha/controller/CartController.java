package com.harsha.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harsha.exceptions.ProductException;
import com.harsha.model.Cart;
import com.harsha.model.CartItem;
import com.harsha.model.Product;
import com.harsha.model.User;
import com.harsha.request.AddItemRequest;
import com.harsha.response.ApiResponse;
import com.harsha.service.CartItemService;
import com.harsha.service.CartService;
import com.harsha.service.ProductService;
import com.harsha.service.UserService;

import lombok.RequiredArgsConstructor;
 

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {
    
    private final CartService cartService;
    private final CartItemService cartItemService;
    private final UserService userService;
    private final ProductService productService;
    
    @GetMapping
    public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws Exception{
        
        User user= userService.findUserByJwt(jwt);
        Cart cart=cartService.findUserCart(user);

        return new ResponseEntity<>(cart,HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<CartItem> addItemToCart(@RequestBody AddItemRequest req,@RequestHeader("Authorization") String jwt) throws ProductException,Exception{
        User user=userService.findUserByJwt(jwt);
        Product product=productService.findProductById(req.getProductId());

        CartItem item= cartService.addCartItem(user, product, req.getSize(),req.getQuantity());

        ApiResponse res=new ApiResponse();
        res.setMessage("Item Added to Cart Successfully");

        return new ResponseEntity<>(item,HttpStatus.ACCEPTED);       
    }

    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItemHandler(@PathVariable Long cartItemId,@RequestHeader("Authorization") String jwt) throws Exception {

        User user=userService.findUserByJwt(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);

        ApiResponse res=new ApiResponse();
        res.setMessage("Item removed from Cart Successfully");

        return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
    }

    @PutMapping("/item/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItemHandler(@PathVariable Long cartItemId,@RequestBody CartItem cartItem,@RequestHeader("Authorization") String jwt) throws Exception{

        User user=userService.findUserByJwt(jwt);

        CartItem updatedCartItem=null;
        if (cartItem.getQuantity()>0) {
            updatedCartItem=cartItemService.updateCartITem(user.getId(), cartItemId, cartItem);
        }
        return new ResponseEntity<>(updatedCartItem,HttpStatus.ACCEPTED);

    }
}
