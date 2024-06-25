package com.example.backendSocial.controller;

import com.example.backendSocial.Entity.Report;
import com.example.backendSocial.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.backendSocial.Entity.User;
import com.example.backendSocial.config.jwtProvider;
import com.example.backendSocial.models.LoginRequest;
import com.example.backendSocial.repositories.UserRepository;
import com.example.backendSocial.response.AuthResponse;
import com.example.backendSocial.services.CustomUserService;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserService customUserService;
    @Autowired
    private UserService userService;
    @GetMapping("/")
    public String home() {
        return "Welcome to the home page";
    }

    @PostMapping("/signup")
    public AuthResponse RegisterUser(@RequestBody User user) {

        User isUserExist = userRepository.findByEmail(user.getEmail());

        if (isUserExist != null) {
            throw new BadCredentialsException("User already exist");
        }

        User newUser = new User();

        newUser.setUserName(user.getUserName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setRole(user.getRole());
        newUser.setPhoneNumber(user.getPhoneNumber());
        newUser.setProfilePicture(user.getProfilePicture());

        User savedUser = userRepository.save(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),
                savedUser.getPassword());

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse(token, "User registered successfully");

        return authResponse;
    }

    @PostMapping("/login")
    public AuthResponse LoginUser(@RequestBody LoginRequest loginRequest) throws Exception {

        Authentication authentication = authentication(loginRequest.getEmail(), loginRequest.getPassword());

        String token = jwtProvider.generateToken(authentication);


        AuthResponse authResponse = new AuthResponse(token, "User logged in successfully");

        return authResponse;

    }




    private Authentication authentication(String email, String password) throws BadCredentialsException {

        UserDetails user = customUserService
                .loadUserByUsername(email);

        if (user == null) {
            throw new BadCredentialsException("User not found");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

        return authentication;
    }

    @GetMapping("/user")
    public User getUser(@RequestHeader("Authorization") String token) throws Exception {

        User user = userService.findUserByJwt(token);



        return user;
    }


}
