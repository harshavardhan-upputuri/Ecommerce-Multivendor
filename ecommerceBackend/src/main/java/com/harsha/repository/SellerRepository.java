package com.harsha.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.harsha.domain.AccountStatus;
import com.harsha.model.Seller;
@Repository
public interface SellerRepository extends JpaRepository<Seller,Long>{
    Seller findByEmail(String Email);
    List<Seller> findByAccountStatus(AccountStatus status);

}
