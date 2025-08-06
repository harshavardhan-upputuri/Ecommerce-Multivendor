package com.harsha.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.harsha.config.JwtProvider;
import com.harsha.domain.AccountStatus;
import com.harsha.domain.USER_ROLE;
import com.harsha.exceptions.SellerException;
import com.harsha.model.Address;
import com.harsha.model.Seller;
import com.harsha.repository.AddressRepository;
import com.harsha.repository.SellerRepository;
import com.harsha.service.SellerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService{
    
    private final SellerRepository sellerRepository;
    private final AddressRepository addressRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Seller getSellerProfile(String jwt) throws Exception {
        String email=jwtProvider.getEmailFromJwtToken(jwt);

        return this.getSellerByEmail(email);
    }

    @Override
    public Seller createSeller(Seller seller) throws Exception {
        Seller sellerExist=sellerRepository.findByEmail(seller.getEmail());
        if(sellerExist!=null){
            throw new Exception("Email Already exists ");
        }
        Address savedAddress=addressRepository.save(seller.getPickupAddress());

        Seller newseller=new Seller();
        newseller.setEmail(seller.getEmail());
        newseller.setPassword(passwordEncoder.encode(seller.getPassword()));
        newseller.setSellerName(seller.getSellerName());
        newseller.setPickupAddress(savedAddress);
        newseller.setGSTIN(seller.getGSTIN());
        newseller.setRole(USER_ROLE.ROLE_SELLER);
        newseller.setMobile(seller.getMobile());
        newseller.setBankDetails(seller.getBankDetails());
        newseller.setBusinessDetails(seller.getBusinessDetails());

        
        return sellerRepository.save(newseller);
    }

    @Override
    public Seller getSellerById(Long id) throws SellerException {
        return sellerRepository.findById(id).orElseThrow(()-> new SellerException("Seller not found with this id -" +id));
    }

    @Override
    public Seller getSellerByEmail(String email) throws Exception {
        Seller seller =sellerRepository.findByEmail(email);
        if(seller==null){
            throw new Exception("Seller not found with email - " +email);
        }
       return seller;
    }

    @Override
    public List<Seller> getAllSellers(AccountStatus status) {
        return sellerRepository.findByAccountStatus(status);
    }

    @Override
    public Seller updateSeller(Long id, Seller seller) throws Exception {
        Seller exisistingSeller = this.getSellerById(id);

        if(seller.getSellerName()!=null){
            exisistingSeller.setSellerName(seller.getSellerName());
        }

        if(seller.getMobile()!=null){
            exisistingSeller.setMobile(seller.getMobile());
        }

         if(seller.getEmail()!=null){
            exisistingSeller.setEmail(seller.getEmail());
        }

         if(seller.getBusinessDetails()!=null && seller.getBusinessDetails().getBusinessName()!=null){
            exisistingSeller.getBusinessDetails().setBusinessName((seller.getBusinessDetails().getBusinessName()));
        }

        if(seller.getBankDetails()!=null && seller.getBankDetails().getAccountNumber()!=null && seller.getBankDetails().getIfscCode()!=null && seller.getBankDetails().getAccountHolderName()!=null){
            exisistingSeller.getBankDetails().setAccountNumber((seller.getBankDetails().getAccountNumber()));
            exisistingSeller.getBankDetails().setIfscCode((seller.getBankDetails().getIfscCode()));
            exisistingSeller.getBankDetails().setAccountHolderName((seller.getBankDetails().getAccountHolderName()));
        }

        if(seller.getPickupAddress() != null 
                && seller.getPickupAddress().getAddress() != null
                && seller.getPickupAddress().getMobile() != null
                && seller.getPickupAddress().getCity() != null
                && seller.getPickupAddress().getState() != null                
                && seller.getPickupAddress().getPinCode() != null                
        ){

            exisistingSeller.getPickupAddress().setAddress(seller.getPickupAddress().getAddress());
            exisistingSeller.getPickupAddress().setMobile(seller.getPickupAddress().getMobile());
            exisistingSeller.getPickupAddress().setCity(seller.getPickupAddress().getCity());
            exisistingSeller.getPickupAddress().setState(seller.getPickupAddress().getState());
            exisistingSeller.getPickupAddress().setPinCode(seller.getPickupAddress().getPinCode());
        }

        if(seller.getGSTIN()!=null){
            exisistingSeller.setGSTIN(seller.getGSTIN());
        }

        return sellerRepository.save(exisistingSeller);
    }

    @Override
    public void deleteSeller(Long id) throws Exception {
        Seller seller=getSellerById(id);
        sellerRepository.delete(seller);
    }

    @Override
    public Seller verifyEmail(String email, String otp) throws Exception {
        Seller seller=getSellerByEmail(email);
        seller.setEmailVerified(true);
        return sellerRepository.save(seller);
    }

    @Override
    public Seller updateSellerAccountStatus(Long id, AccountStatus status) throws Exception {
        Seller seller=getSellerById(id);
        seller.setAccountStatus(status);
        return sellerRepository.save(seller);
    }
    
}
