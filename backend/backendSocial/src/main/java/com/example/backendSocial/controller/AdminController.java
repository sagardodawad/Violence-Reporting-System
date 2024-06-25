package com.example.backendSocial.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backendSocial.Entity.Comment;
import com.example.backendSocial.Entity.Report;
import com.example.backendSocial.Entity.User;
import com.example.backendSocial.services.ReportService;
import com.example.backendSocial.services.UserService;

@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private ReportService reportService;

    @GetMapping("/admin/reports/{status}")
    public List<Report> findReportsByStatus(@RequestHeader("Authorization") String token,
            @PathVariable("status") String status)
            throws Exception {

        User user = userService.findUserByJwt(token);

//         if (user.getRole() != "ADMIN") {
//         throw new UnsupportedOperationException("User is not an admin");
//         }

        List<Report> reports = reportService.findReportsByStatus(status);

        return reports;
    }

    @PutMapping("/admin/report/{id}/{status}")
    public Report updateReportStatus(@RequestHeader("Authorization") String token, @PathVariable("id") Long id,
            @PathVariable("status") String status)
            throws Exception {

        User user = userService.findUserByJwt(token);

//         if (user.getRole() != "ADMIN") {
//         throw new UnsupportedOperationException("User is not an admin");
//         }

        Report updatedReport = reportService.updateReport(id, status);

        return updatedReport;
    }


    @GetMapping("/report/{id}")
    public Report getReportDetails(@RequestHeader("Authorization") String token, @PathVariable("id") Long id)
            throws Exception {

        User user = userService.findUserByJwt(token);

//         if (user.getRole() != "ADMIN") {
//         throw new UnsupportedOperationException("User is not an admin");
//         }

        Report updatedReport = reportService.findById(id);

        return updatedReport;
    }
    @GetMapping("/users/{id}")
    public User getUsersById(@RequestHeader("Authorization") String token, @PathVariable("id") Long id)
            throws Exception {

        User user = userService.findUserByJwt(token);

//         if (user.getRole() != "ADMIN") {
//         throw new UnsupportedOperationException("User is not an admin");
//         }

        User user1 = userService.findUserByID(id);

        return user1;
    }


    @PutMapping("/admin/report/{id}/comment")

    public Report commentReport(@RequestHeader("Authorization") String token, @PathVariable("id") Long id,
            @RequestBody Comment comment)
            throws Exception {

        User user = userService.findUserByJwt(token);

//         if (user.getRole() != "ADMIN") {
//         throw new UnsupportedOperationException("User is not an admin");
//         }
        Report updatedReport = reportService.commentReport(id, comment, user);

        return updatedReport;
    }

    @GetMapping("/user/{reportId}")
    public  List<Comment> findComments(@RequestHeader("Authorization") String token,@PathVariable Long reportId) throws Exception {

        User user= userService.findUserByJwt(token);

        return reportService.fincCommentsByreportId(reportId);
    }


}
