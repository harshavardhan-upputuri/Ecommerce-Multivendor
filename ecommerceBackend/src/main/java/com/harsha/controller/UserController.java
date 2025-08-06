package com.harsha.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.harsha.domain.USER_ROLE;
import com.harsha.model.User;
import com.harsha.response.AuthResponse;
import com.harsha.response.SignupRequest;
import com.harsha.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;


    @GetMapping("/users/profile")
    public ResponseEntity<User> createUserHandler(@RequestHeader("Authorization") String jwt ) throws Exception{
        
     User user= userService.findUserByJwt(jwt);

      return ResponseEntity.ok(user);        
    }
}
