package com.harsha.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harsha.domain.USER_ROLE;
import com.harsha.model.User;
import com.harsha.model.VerificationCode;
import com.harsha.repository.UserRepository;
import com.harsha.request.LoginOtpRequest;
import com.harsha.request.LoginRequest;
import com.harsha.response.ApiResponse;
import com.harsha.response.AuthResponse;
import com.harsha.response.SignupRequest;
import com.harsha.service.AuthService;

import lombok.RequiredArgsConstructor;
 
 

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private AuthService authService;
    
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req) throws Exception{
        
      String jwt= authService.createUser(req);

      AuthResponse res= new AuthResponse();
      res.setJwt(jwt);
      res.setMessage("register successs");
      res.setRole(USER_ROLE.ROLE_CUSTOMER);

      return ResponseEntity.ok(res);        
    }

    @PostMapping("/sent/login-signup-otp")
    public ResponseEntity<ApiResponse> sentOtpHandler(@RequestBody LoginOtpRequest req) throws Exception{
        
      authService.sentLoginOtp(req.getEmail(),req.getRole());

      ApiResponse res= new ApiResponse();
       
      res.setMessage("otp sent  successs");
       

      return ResponseEntity.ok(res);        
    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest req) throws Exception{
        
      AuthResponse authResponse=authService.signing(req);
       

      return ResponseEntity.ok(authResponse);        
    }

}
