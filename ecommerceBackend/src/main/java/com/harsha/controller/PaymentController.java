package com.harsha.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.harsha.model.Order;
import com.harsha.model.PaymentOrder;
import com.harsha.model.Seller;
import com.harsha.model.SellerReport;
import com.harsha.model.User;
import com.harsha.response.ApiResponse;
import com.harsha.response.PaymentLinkResponse;
import com.harsha.service.PaymentService;
import com.harsha.service.SellerReportService;
import com.harsha.service.SellerService;
import com.harsha.service.TransactionService;
import com.harsha.service.UserService;
import com.stripe.service.climate.OrderService;
 

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    
    private final PaymentService paymentService;
    private final UserService userService;
    private final SellerService sellerService;
    private final OrderService orderService;
    private final SellerReportService sellerReportService;
    private final TransactionService transactionService;

    @GetMapping("/{paymentId}")
    public ResponseEntity<ApiResponse> paymentSuccessHandler(@PathVariable String paymentId,@RequestParam String paymentLinkId,@RequestHeader("Authorization") String jwt) throws Exception{

        User user=userService.findUserByJwt(jwt);

        PaymentLinkResponse paymentResponse;

        PaymentOrder paymentOrder=paymentService.getPaymentOrderByPaymentId(paymentLinkId);
    
        boolean paymentSuccess=paymentService.ProceedPaymentOrder(paymentOrder, paymentId, paymentLinkId);

        if(paymentSuccess){
            for(Order order:paymentOrder.getOrders()){
                transactionService.createTransaction(order);
                Seller seller=sellerService.getSellerById(order.getSellerId());
                SellerReport report=sellerReportService.getSellerReport(seller);
                report.setTotalOrders(report.getTotalOrders()+1);
                report.setTotalEarnings(report.getTotalEarnings()+order.getTotalSellingPrice());
                report.setTotalSales(report.getTotalSales()+order.getOrderItems().size());
                sellerReportService.updateSellerReport(report);
            }
        }

        ApiResponse res=new ApiResponse();
        res.setMessage("Payment successful");
      

        return new ResponseEntity<>(res,HttpStatus.CREATED);

    }
}
