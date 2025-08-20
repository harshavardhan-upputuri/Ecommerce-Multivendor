package com.harsha.service.impl;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.harsha.domain.USER_ROLE;
import com.harsha.model.User;
import com.harsha.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Datainitialization  implements CommandLineRunner{
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void run(String... args){
        initializeAdminUser();
    }

    private void initializeAdminUser() {
       String admiUsername="nikkiharshunikki@gmail.com";

       if(userRepository.findByEmail(admiUsername)==null){
        User adminUser=new User();

        adminUser.setPassword(passwordEncoder.encode("harshaupputuri"));
        adminUser.setFullName("Harsha");
        adminUser.setEmail(admiUsername);
        adminUser.setRole(USER_ROLE.ROLE_ADMIN);

        User admin=userRepository.save(adminUser);
       }
    }
}
