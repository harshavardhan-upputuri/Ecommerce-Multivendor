package com.harsha.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.harsha.domain.OrderStatus;
import com.harsha.domain.PaymentStatus;
import com.harsha.model.Address;
import com.harsha.model.Cart;
import com.harsha.model.CartItem;
import com.harsha.model.Order;
import com.harsha.model.OrderItem;
import com.harsha.model.User;
import com.harsha.repository.AddressRepository;
import com.harsha.repository.OrderItemRepository;
import com.harsha.repository.OrderRepository;
import com.harsha.service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{
    
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final AddressRepository addressRepository;

    

    @Override
    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) {
        if(!user.getAddresses().contains(shippingAddress)){
            user.getAddresses().add(shippingAddress);
        }
        Address address=addressRepository.save(shippingAddress);

        Map<Long,List<CartItem>> itemsBySeller=cart.getCartItems().stream().collect(Collectors.groupingBy(item->item.getProduct().getSeller().getId()));
        // we make seprate orders for each seller

        Set<Order> orders=new HashSet<>();

        for(Map.Entry<Long,List<CartItem>> entry:itemsBySeller.entrySet()){
            Long sellerId=entry.getKey();
            List<CartItem> items=entry.getValue();

            int totalOrderPrice=items.stream().mapToInt(CartItem::getSellingPrice).sum();
            int totalItem=items.stream().mapToInt(CartItem::getQuantity).sum();

            Order createdOrder=new Order();
            createdOrder.setUser(user);
            createdOrder.setSellerId(sellerId);
            createdOrder.setTotalItem(totalItem);
            createdOrder.setTotalMrpPrice(totalOrderPrice);
            createdOrder.setTotalSellingPrice(null);
            createdOrder.setShippingAddress(shippingAddress);
            createdOrder.setOrderStatus(OrderStatus.PENDING);
            createdOrder.getPaymentDetails().setStatus(PaymentStatus.PENDING);

            Order savedOrder=orderRepository.save(createdOrder);
            orders.add(savedOrder);

            List<OrderItem> orderItems=new ArrayList<>();

            for(CartItem item:items){
                OrderItem orderItem=new OrderItem();
                orderItem.setOrder(savedOrder);
                orderItem.setMrpPrice(item.getMrpPrice());
                orderItem.setProduct(item.getProduct());
                orderItem.setQuantity(item.getQuantity());
                orderItem.setSize(item.getSize());
                orderItem.setUserId(item.getUserId());
                orderItem.setSellingPrice(item.getSellingPrice());
                savedOrder.getOrderItems().add(orderItem);

                OrderItem savedOrderItem=orderItemRepository.save(orderItem);
                orderItems.add(savedOrderItem);
            }
        }
        
        return orders;
    }

    @Override
    public Order finOrderById(long id) throws Exception {
        
        return orderRepository.findById(id).orElseThrow(()-> new Exception("order not found.."));
    }

    @Override
    public List<Order> sellersOrder(Long sellerId) {
        
        return orderRepository.findBySellerId(sellerId);
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception {
        Order order=finOrderById(orderId);
        order.setOrderStatus(orderStatus);
        return orderRepository.save(order);
    }

    @Override
    public List<Order> usersOrderHistory(Long userId) {
        
        return orderRepository.findByUserId(userId);
    }

    @Override
    public Order cancelOrder(Long orderId, User user) throws Exception {
        Order order=finOrderById(orderId); 
        if(!user.getId().equals(order.getUser().getId())){
            throw new Exception("you don't have access to this order");
        }
        orderRepository.delete(order); 
        return order;
    }

    @Override
    public OrderItem getOrderItemById(Long id) throws Exception {
         
        return orderItemRepository.findById(id).orElseThrow(()-> new Exception("order item not exist ... "));
    }
    
}
