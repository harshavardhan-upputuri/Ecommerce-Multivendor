package com.harsha.service;

import java.util.List;

import com.harsha.model.Product;
import com.harsha.model.Review;
import com.harsha.model.User;
import com.harsha.request.CreateReviewRequest;

public interface ReviewService {
    
    Review createReview(CreateReviewRequest req,User user,Product product);
    Review updateReview(Long reviewId,String reviewText,double rating ,Long userId) throws Exception;
    List <Review> getReviewByProductId(Long productId);
    void deleteReview(Long reviewId,Long userId) throws Exception;
    Review getReviewById(Long reviewId) throws Exception;
    
}
