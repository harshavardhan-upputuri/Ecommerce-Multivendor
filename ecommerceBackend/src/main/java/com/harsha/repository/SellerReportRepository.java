package com.harsha.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harsha.model.SellerReport;

public interface SellerReportRepository extends JpaRepository<SellerReport,Long>{
    
    SellerReport findBySellerId(Long sellerId);
}
