package com.harsha.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.harsha.model.Order;
import com.harsha.model.Seller;
import com.harsha.model.Transaction;
import com.harsha.repository.SellerRepository;
import com.harsha.repository.TransactionRepository;
import com.harsha.service.TransactionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService{
    
    private final TransactionRepository transactionRepository;
    private final SellerRepository sellerRepository;
    
    
    @Override
    public Transaction createTransaction(Order order) {
        Seller seller=sellerRepository.findById(order.getSellerId()).get();
       
        Transaction  transaction=new Transaction();
        transaction.setSeller(seller);
        transaction.setCustomer(order.getUser());
        transaction.setOrder(order);
       
        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        
        return transactionRepository.findAll();
    }

    @Override
    public List<Transaction> getTransactionsBySellerId(Seller seller) {
        
        return transactionRepository.findBySellerId(seller.getId());
    }
    
}
