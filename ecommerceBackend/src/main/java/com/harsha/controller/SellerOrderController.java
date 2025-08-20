package com.harsha.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harsha.domain.OrderStatus;
import com.harsha.model.Order;
import com.harsha.model.OrderItem;
import com.harsha.model.Seller;
import com.harsha.service.OrderService;
import com.harsha.service.SellerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers/orders")
public class SellerOrderController {
    
    private final OrderService orderService;
    private final SellerService sellerService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(@RequestHeader("Authorization") String jwt) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        List<Order> orders = orderService.sellersOrder(seller.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PatchMapping("/{orderId}/status/{orderStatus}")
    public ResponseEntity<Order> updateOrderStatus(@RequestHeader("Authorization") String jwt,
                                                   @PathVariable Long orderId,
                                                   @PathVariable OrderStatus orderStatus) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        Order order = orderService.findOrderById(orderId);

        if (!order.getSellerId().equals(seller.getId())) {
            throw new Exception("You cannot update this order");
        }

        order.setOrderStatus(orderStatus);
        Order updatedOrder = orderService.updateOrderStatus(orderId, orderStatus);
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@RequestHeader("Authorization") String jwt,
                                              @PathVariable Long orderId) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        Order order = orderService.findOrderById(orderId);

        if (!order.getSellerId().equals(seller.getId())) {
            throw new Exception("You do not have access to this order");
        }

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @DeleteMapping("/{orderId}/delete")
    public ResponseEntity<Order> cancelOrder(@RequestHeader("Authorization") String jwt,
                                             @PathVariable Long orderId) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        Order order = orderService.findOrderById(orderId);

        if (!order.getSellerId().equals(seller.getId())) {
            throw new Exception("You cannot cancel this order");
        }

        // Optional: create sellerCancelOrder in service
        orderService.cancelOrder(orderId, null);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/items/{orderItemId}")
    public ResponseEntity<OrderItem> getOrderItem(@RequestHeader("Authorization") String jwt,
                                                  @PathVariable Long orderItemId) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        OrderItem item = orderService.getOrderItemById(orderItemId);

        if (!item.getOrder().getSellerId().equals(seller.getId())) {
            throw new Exception("You cannot access this order item");
        }

        return new ResponseEntity<>(item, HttpStatus.OK);
    }
}
