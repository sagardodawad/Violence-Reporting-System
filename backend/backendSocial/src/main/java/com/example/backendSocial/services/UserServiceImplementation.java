package com.example.backendSocial.services;

import java.util.Optional;

import com.example.backendSocial.Entity.Report;
import com.example.backendSocial.repositories.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backendSocial.Entity.User;
import com.example.backendSocial.config.jwtProvider;
import com.example.backendSocial.repositories.UserRepository;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReportRepository reportRepository;

    @Override
    public User findUserByID(Long id) throws Exception {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            throw new Exception("User not found");
        }

        return user.get();

    }

    @Override
    public Report findReportById(Long id) throws Exception {
        Optional<Report> report = reportRepository.findById(id);

        if (report.isEmpty()) {
            throw new Exception("User not found");
        }

        return report.get();
    }

    @Override
    public User findUserByEmail(String email) throws Exception {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UnsupportedOperationException("User not found");
        }

        return user;

    }

    @Override
    public User findUserByJwt(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UnsupportedOperationException("User not found");
        }

        return user;
    }




}
