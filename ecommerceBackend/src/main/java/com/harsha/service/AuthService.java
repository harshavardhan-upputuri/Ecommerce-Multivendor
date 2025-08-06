package com.harsha.service;

import com.harsha.domain.USER_ROLE;
import com.harsha.request.LoginRequest;
import com.harsha.response.AuthResponse;
import com.harsha.response.SignupRequest;

public interface AuthService {

    void sentLoginOtp(String email,USER_ROLE role) throws Exception;

    String createUser(SignupRequest req) throws Exception;

    AuthResponse signing(LoginRequest req) throws Exception;
}
