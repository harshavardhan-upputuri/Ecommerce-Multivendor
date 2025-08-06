package com.harsha.service;

import java.util.List;

import com.harsha.model.Order;
import com.harsha.model.Seller;
import com.harsha.model.Transaction;

public interface TransactionService {
    
    Transaction createTransaction(Order order);
    List<Transaction> getTransactionsBySellerId(Seller seller);
    List<Transaction> getAllTransactions();

}
