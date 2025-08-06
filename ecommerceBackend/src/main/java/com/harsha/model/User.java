package com.harsha.model;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.harsha.domain.USER_ROLE;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonProperty(access =JsonProperty.Access.WRITE_ONLY) // password should only write not read 
    private String password; 

    private String email;

    private String fullName;

    private String mobile;

    private USER_ROLE role = USER_ROLE.ROLE_CUSTOMER; // default role has customer

    @OneToMany // one user has many address
    private Set<Address> addresses = new HashSet<>();

    @ManyToMany// many coupouns has many users
    @JsonIgnore 
    private Set<Coupon> usedCoupouns = new HashSet<>(); // this keep tracks of coupouns used by customer so he cant use it agaian


}
