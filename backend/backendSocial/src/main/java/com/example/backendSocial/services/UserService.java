package com.example.backendSocial.services;

import com.example.backendSocial.Entity.Report;
import com.example.backendSocial.Entity.User;

public interface UserService {

    public User findUserByID(Long id) throws Exception;

    public Report findReportById(Long id) throws Exception;

    public User findUserByEmail(String email) throws Exception;

    public User findUserByJwt(String jwt) throws Exception;


}
