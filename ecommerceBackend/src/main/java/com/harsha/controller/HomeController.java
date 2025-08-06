package com.harsha.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harsha.response.ApiResponse;

@RestController
public class HomeController {
    @GetMapping
    public ApiResponse HomeControllerHandler(){
        ApiResponse apiResponse=new ApiResponse();
        apiResponse.setMessage("Helloworld");
         
        return apiResponse; 
    }
}
