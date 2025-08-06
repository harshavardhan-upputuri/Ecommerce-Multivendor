package com.harsha.service.impl;

import org.springframework.stereotype.Service;

import com.harsha.config.JwtProvider;
import com.harsha.model.User;
import com.harsha.repository.UserRepository;
import com.harsha.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user=userRepository.findByEmail(email);

        if(user==null){
            throw new Exception("User not found with email - "+email);
        }
        return user;     
    }

    @Override
    public User findUserByJwt(String Jwt) throws Exception {
        String email=jwtProvider.getEmailFromJwtToken(Jwt);
 
        return this.findUserByEmail(email);   
    }
    
}
