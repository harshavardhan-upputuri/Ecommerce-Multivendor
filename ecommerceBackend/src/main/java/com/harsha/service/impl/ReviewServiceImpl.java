package com.harsha.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.harsha.model.Product;
import com.harsha.model.Review;
import com.harsha.model.User;
import com.harsha.repository.ReviewRepository;
import com.harsha.request.CreateReviewRequest;
import com.harsha.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor 
public class ReviewServiceImpl implements ReviewService{
    
    private final ReviewRepository reviewRepository;

    @Override
    public Review createReview(CreateReviewRequest req, User user, Product product) {
        Review review=new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReviewText(req.getReviewText());
        review.setRating(req.getReviewRating());
        review.setProductImages(req.getProductImages());
        product.getReview().add(review);
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long reviewId, Long userId) throws Exception {
        Review review = getReviewById(reviewId);
        if(review.getUser().getId().equals(userId)){
            throw new Exception("You can't delete this review");
        }
        reviewRepository.delete(review);
        
    }

    @Override
    public List<Review> getReviewByProductId(Long productId) {
        
        return reviewRepository.findByProductId(productId);
    }

    @Override
    public Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception {
        Review review=getReviewById(reviewId);
        
        if(review.getUser().getId().equals(userId)){
            review.setReviewText(reviewText);
            review.setRating(rating);
            return reviewRepository.save(review);
        }
        throw new Exception("you can't update this review");
    }

    @Override
    public Review getReviewById(Long reviewId) throws Exception {
        return reviewRepository.findById(reviewId).orElseThrow(()-> new Exception("review not found"));
    }
    
    
}
