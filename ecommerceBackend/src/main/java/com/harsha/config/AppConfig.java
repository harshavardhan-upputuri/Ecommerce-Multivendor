package com.harsha.config;


import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.Nullable;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity 
public class AppConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        
        http.sessionManagement(management->management.sessionCreationPolicy(
            SessionCreationPolicy.STATELESS // no session is created when u logine or for eveery request is independent and no data is stored in server .we use jwt for each 
        )).authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/**").authenticated() // the url with macthes  atarting with api all are authenticated 
                .requestMatchers("/api/products/*/reviews").permitAll()
                .anyRequest().permitAll()
        )// Add the custom JWT token validation filter before the default BasicAuthenticationFilter.
        // This ensures that JWT-based authentication is processed before Spring Security's default mechanisms.
        // The JwtTokenValidator extracts the token from the Authorization header, validates it,
        // and sets the authenticated user in the SecurityContext if the token is valid.
        .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class) 
        .csrf(csrf->csrf.disable())
        .cors(cors->cors.configurationSource(corsConfigurationSource()));        
        
        return http.build();
    }

    private CorsConfigurationSource corsConfigurationSource() {
        return new CorsConfigurationSource() {

            @Override
            @Nullable
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration cfg= new CorsConfiguration();
                cfg.setAllowedOrigins(Collections.singletonList("http://localhost:5173/")); // Allow requests from any origin
                cfg.setAllowedMethods(Collections.singletonList("*")); // Allow all HTTP methods (GET, POST, PUT, etc.)
                cfg.setAllowedHeaders(Collections.singletonList("*")); // Allow all headers in the request
                cfg.setAllowCredentials(true); // Allow cookies and Authorization headers (credentials) in cross-origin requests
                cfg.setExposedHeaders(Collections.singletonList("Authorization")); // Expose the Authorization header in the browser
                cfg.setMaxAge(3600L); // Cache the CORS preflight response for 3600 seconds (1 hour)

                return cfg;
            }
            
        };

        
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public RestTemplate restTemplate(){
        return  new RestTemplate();
    }
}
