package com.harsha.controller;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.harsha.domain.PaymentMethod;
import com.harsha.model.Address;
import com.harsha.model.Cart;
import com.harsha.model.Order;
import com.harsha.model.OrderItem;
import com.harsha.model.PaymentOrder;
import com.harsha.model.Seller;
import com.harsha.model.SellerReport;
import com.harsha.model.User;
import com.harsha.repository.PaymentOrderRepository;
import com.harsha.response.PaymentLinkResponse;
import com.harsha.service.CartService;
import com.harsha.service.OrderService;
import com.harsha.service.PaymentService;
import com.harsha.service.SellerReportService;
import com.harsha.service.SellerService;
import com.harsha.service.UserService;
import com.razorpay.PaymentLink;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {
    
    private final OrderService orderService;
    private final UserService userService;
    // private final OrderItemService orderItemService;
    private final CartService cartService;
    private final PaymentService paymentService;
    private final PaymentOrderRepository paymentOrderRepository;
    private final SellerReportService sellerReportService;
    private final SellerService sellerService;

    @PostMapping
    public ResponseEntity<PaymentLinkResponse> createOrderHandler(@RequestBody Address shippingAddress,@RequestParam PaymentMethod paymentMethod,@RequestHeader("Authorization") String jwt) throws Exception{
        
        User user=userService.findUserByJwt(jwt);
        Cart cart=cartService.findUserCart(user);
        Set<Order> orders= orderService.createOrder(user, shippingAddress, cart);

        PaymentOrder paymentOrder = paymentService.createOrder(user,orders);
        
        PaymentLinkResponse res=new PaymentLinkResponse();

        if(paymentMethod.equals(PaymentMethod.RAZORPAY)){
            PaymentLink payment = paymentService.createRazorpayPaymentLink(user,paymentOrder.getAmount(),paymentOrder.getId());
            String paymentUrl=payment.get("short_url");
            String paymentUrlId=payment.get("id");

            res.setPayment_link_url(paymentUrl);
            res.setPayment_link_id(paymentUrlId);
            paymentOrder.setPaymentLinkId(paymentUrlId);
            paymentOrderRepository.save(paymentOrder);
        }else{
            String paymentUrl=paymentService.createStripePaymentLink(user,paymentOrder.getAmount(),paymentOrder.getId());
            res.setPayment_link_url(paymentUrl);
        }
        return new ResponseEntity<>(res,HttpStatus.OK);

    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> usersOrderHistoryHandler(@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);
        List<Order> orders=orderService.usersOrderHistory(user.getId());
        return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
    }
    
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId,@RequestHeader("Authorization") String jwt) throws Exception{

        User user=userService.findUserByJwt(jwt);
        Order orders=orderService.finOrderById(orderId);
        
        return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
    }

    @GetMapping("/item/{orderItemId}")
    public ResponseEntity<OrderItem> getOrderItemById(@PathVariable Long orderItemId,@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);
        OrderItem orderItem=orderService.getOrderItemById(orderItemId);
        return new ResponseEntity<>(orderItem,HttpStatus.ACCEPTED);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> cancelOrder(@PathVariable Long orderId,@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);
        Order order=orderService.cancelOrder(orderId, user);

        Seller seller=sellerService.getSellerById(order.getSellerId());
        SellerReport report=sellerReportService.getSellerReport(seller);
        report.setCanceledOrders(report.getCanceledOrders()+1);
        report.setTotalRefunds(report.getTotalRefunds()+order.getTotalSellingPrice());
        sellerReportService.updateSellerReport(report);
        return ResponseEntity.ok(order);
    }


}
