package com.harsha.service;

 

import com.harsha.model.User;

 
public interface UserService {

    User findUserByEmail(String email) throws Exception;
    User findUserByJwt(String Jwt) throws Exception;
    
}  
