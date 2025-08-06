package com.harsha.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harsha.domain.OrderStatus;
import com.harsha.model.Order;
import com.harsha.model.Seller;
import com.harsha.service.OrderService;
import com.harsha.service.SellerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seller/orders")
public class SellerOrderController {
    
    private final OrderService orderService;
    private final SellerService sellerService;

    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrdersHandler(@RequestHeader("Authorization") String jwt) throws Exception{
        Seller seller = sellerService.getSellerProfile(jwt);
        List<Order> orders=orderService.sellersOrder(seller.getId());
        
        return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
    }

    @PatchMapping("/{orderId}/status/{orderStatus}")
    public ResponseEntity<Order> updateOrderHandler(@RequestHeader("Authorization") String jwt,@PathVariable Long orderId,@PathVariable OrderStatus orderStatus) throws Exception{
        Order orders=orderService.updateOrderStatus(orderId, orderStatus);
        return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
    }
}
