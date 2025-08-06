package com.harsha.service;

import java.util.List;
import java.util.Set;

import com.harsha.domain.OrderStatus;
import com.harsha.model.Address;
import com.harsha.model.Cart;
import com.harsha.model.Order;
import com.harsha.model.OrderItem;
import com.harsha.model.User;

public interface OrderService {
    
    Set<Order> createOrder(User user,Address shippingAddress,Cart cart);
    Order finOrderById(long id) throws Exception;
    List<Order> usersOrderHistory(Long userId);
    List<Order> sellersOrder(Long sellerId);
    Order updateOrderStatus(Long orderId,OrderStatus orderStatus) throws Exception;
    Order cancelOrder(Long orderId,User user) throws Exception;
    OrderItem getOrderItemById(Long id) throws Exception;

}
