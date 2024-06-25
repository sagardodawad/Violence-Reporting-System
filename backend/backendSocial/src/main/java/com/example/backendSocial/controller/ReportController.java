package com.example.backendSocial.controller;

import com.example.backendSocial.Entity.Report;
import com.example.backendSocial.Entity.User;
import com.example.backendSocial.services.ReportService;
import com.example.backendSocial.services.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ReportController {

    @Autowired
    private UserService userService;

    @Autowired
    private ReportService reportService;

    @PostMapping("/report")
    public Report createReport(@RequestBody Report report, @RequestHeader("Authorization") String token)
            throws Exception {

        User user = userService.findUserByJwt(token);

        Report savedReport = reportService.createReport(report, user);

        return savedReport;
    }


    @GetMapping("/report")
    public List<Report> getUserReports(@RequestHeader("Authorization") String token) throws Exception {

        User user = userService.findUserByJwt(token);

        List<Report> reports = reportService.findUserReports(user);

        return reports;
    }
}
