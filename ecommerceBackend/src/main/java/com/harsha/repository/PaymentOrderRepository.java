package com.harsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harsha.model.PaymentOrder;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder,Long>{
    
    PaymentOrder findByPaymentLinkId(String paymentId);

}
