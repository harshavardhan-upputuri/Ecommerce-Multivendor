package com.harsha.service;

import com.harsha.model.Seller;
import com.harsha.model.SellerReport;

public interface SellerReportService {
    SellerReport getSellerReport(Seller seller);
    SellerReport updateSellerReport(SellerReport sellerReport);

}
