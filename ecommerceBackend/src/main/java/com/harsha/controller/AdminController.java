package com.harsha.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harsha.domain.AccountStatus;
import com.harsha.model.Seller;
import com.harsha.service.SellerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminController {
    private final SellerService sellerService;

    @PatchMapping("/seller/{id}/status/{status}")
    public ResponseEntity<Seller> updateSellerStatus(@PathVariable Long id,@PathVariable AccountStatus status) throws Exception{
        Seller updateSeller= sellerService.updateSellerAccountStatus(id, status);

        return ResponseEntity.ok(updateSeller);
    }
}
