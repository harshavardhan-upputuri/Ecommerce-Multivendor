package com.harsha.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.harsha.model.Cart;
import com.harsha.model.Coupon;
import com.harsha.model.User;
import com.harsha.repository.CartRepository;
import com.harsha.repository.CouponRepository;
import com.harsha.repository.UserRepository;
import com.harsha.service.CouponService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService{

    private final CouponRepository couponRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @Override
    public Cart applyCoupon(String code, double orderValue, User user) throws Exception {
        Coupon coupon=couponRepository.findByCode(code);
        Cart cart=cartRepository.findByUserId(user.getId());

        if(coupon==null){
            throw new Exception("coupon not valid");
        }

        if(user.getUsedCoupouns().contains(coupon)){
            throw new Exception("coupon already used");
        }

        if(orderValue<coupon.getMinimumOrderValue()){
            throw new Exception("valid for minimum order value "+coupon.getMinimumOrderValue());
        }

        if(coupon.isActive() && LocalDate.now().isAfter(coupon.getValidityStartDate()) && LocalDate.now().isBefore(coupon.getValidityEndDate())){
            user.getUsedCoupouns().add(coupon);
            userRepository.save(user);

            double discountedPrice=(cart.getTotalSellingPrice()*coupon.getDiscountPercentage())/100;

            cart.setTotalSellingPrice(cart.getTotalSellingPrice()-discountedPrice);
            
            cart.setCouponCode(code);
            cartRepository.save(cart);

            return cart;
        }

        throw new Exception("Coupon not valid");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Coupon createCoupon(Coupon coupon) {        
        return couponRepository.save(coupon);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCoupon(Long id) throws Exception {
        findCouponById(id);
        couponRepository.deleteById(id);
    }

    @Override
    public List<Coupon> findAllCoupons() {        
        return couponRepository.findAll();
    }

    @Override
    public Coupon findCouponById(Long id) throws Exception {        
        return couponRepository.findById(id).orElseThrow(()->  new Exception("coupon not found"));
    }
 
    @Override
    public Cart removeCoupon(String code, User user) throws Exception {
        Coupon coupon=couponRepository.findByCode(code);
        Cart cart=cartRepository.findByUserId(user.getId());

        if (coupon==null) {
            throw new Exception("coupon not found");
        }
        
        double discountedPrice=(cart.getTotalSellingPrice()*coupon.getDiscountPercentage())/100;

        cart.setTotalSellingPrice(cart.getTotalSellingPrice()+discountedPrice);
        cart.setCouponCode(null);

        return cartRepository.save(cart);
    }
    
    
}
