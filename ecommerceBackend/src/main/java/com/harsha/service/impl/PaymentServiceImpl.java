package com.harsha.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.harsha.domain.PaymentOrderStatus;
import com.harsha.domain.PaymentStatus;
import com.harsha.model.Order;
import com.harsha.model.PaymentOrder;
import com.harsha.model.User;
import com.harsha.repository.OrderRepository;
import com.harsha.repository.PaymentOrderRepository;
import com.harsha.service.PaymentService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentOrderRepository paymentOrderRepository;
    private final OrderRepository orderRepository;

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;

    @Value("${stripe.api.key}")
    private String stripeSecret;

    @Override
    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId)
            throws RazorpayException {

        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            Payment payment = razorpay.payments.fetch(paymentId);

            String status = payment.get("status");

            if ("captured".equals(status)) {
                Set<Order> orders = paymentOrder.getOrders();
                for (Order order : orders) {
                    order.setPaymentStatus(PaymentStatus.COMPLETED);
                    orderRepository.save(order);
                }
                paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                paymentOrderRepository.save(paymentOrder);
                return true;
            }

            paymentOrder.setStatus(PaymentOrderStatus.FAILED);
            paymentOrderRepository.save(paymentOrder);
            return false;
        }
        return false;
    }

    @Override
    public PaymentOrder createOrder(User user, Set<Order> orders) {
        // Calculate total amount safely
        long amount = orders.stream()
                .mapToLong(o -> {
                    long totalSelling = o.getTotalSellingPrice() != null ? o.getTotalSellingPrice() : 0;
                    long discount = o.getDiscount() != null ? o.getDiscount() : 0;
                    long finalAmount = totalSelling - discount;
                    return finalAmount > 0 ? finalAmount : 0; // avoid negative
                })
                .sum();

        // Check if total is valid
        if (amount <= 0) {
            throw new IllegalArgumentException(
                    "Order total amount must be greater than 0. Please check product prices and discounts.");
        }

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setUser(user);
        paymentOrder.setOrders(orders);
        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentLink createRazorpayPaymentLink(User user, Long amount, Long orderId) throws RazorpayException {
        // Validate amount
        if (amount == null || amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than 0 for Razorpay payment link");
        }

        amount = amount * 100; // convert to paise
        try {
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amount);
            paymentLinkRequest.put("currency", "INR");

            JSONObject customer = new JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("callback_url", "http://localhost:5173/payment-success/" + orderId);
            paymentLinkRequest.put("callback_method", "get");

            PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequest);

            return paymentLink;

        } catch (Exception e) {
            System.out.println("Razorpay create link error: " + e.getMessage());
            throw new RazorpayException(e.getMessage());
        }
    }

    @Override
    public String createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {
        if (amount == null || amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than 0 for Stripe payment link");
        }

        Stripe.apiKey = stripeSecret;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/payment-success/" + orderId)
                .setCancelUrl("http://localhost:3000/payment-cancel/")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amount * 100)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Ecommerce Multi Vendor payment")
                                        .build())
                                .build())
                        .build())
                .build();

        Session session = Session.create(params);
        return session.getUrl();
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long orderId) throws Exception {
        return paymentOrderRepository.findById(orderId)
                .orElseThrow(() -> new Exception("Payment order not found"));
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception {
        PaymentOrder paymentOrder = paymentOrderRepository.findByPaymentLinkId(orderId);

        if (paymentOrder == null) {
            throw new Exception("Payment order not found with provided payment link id");
        }
        return paymentOrder;
    }
}
