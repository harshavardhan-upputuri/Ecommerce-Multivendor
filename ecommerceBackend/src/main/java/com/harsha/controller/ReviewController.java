package com.harsha.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harsha.model.Product;
import com.harsha.model.Review;
import com.harsha.model.User;
import com.harsha.request.CreateReviewRequest;
import com.harsha.response.ApiResponse;
import com.harsha.service.ProductService;
import com.harsha.service.ReviewService;
import com.harsha.service.UserService;

 

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReviewController {
    
    private final ReviewService reviewService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/products/{productId}/review")
    public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable Long productId){
        List<Review> reviews=reviewService.getReviewByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<Review> writeReview(@RequestBody CreateReviewRequest req,@PathVariable Long productId,@RequestHeader("Authorization") String jwt) throws Exception{

        User user=userService.findUserByJwt(jwt);
        Product product=productService.findProductById(productId);
        Review review=reviewService.createReview(req, user, product);
        return ResponseEntity.ok(review);
    }

    @PatchMapping("/reviews/{reviewId}")
    public ResponseEntity<Review> updateReview(@RequestBody CreateReviewRequest req,@PathVariable Long reviewId,@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);

        Review review=reviewService.updateReview(reviewId,req.getReviewText(),req.getReviewRating(),user.getId());

        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<ApiResponse> deleteReview(@PathVariable Long reviewId,@RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);
        reviewService.deleteReview(reviewId, user.getId());
        ApiResponse res= new ApiResponse();
        res.setMessage("review deleted successfully");
        return ResponseEntity.ok(res);
    }

}
