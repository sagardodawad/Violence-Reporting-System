package com.example.backendSocial.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.backendSocial.Entity.Comment;
import com.example.backendSocial.Entity.Report;
import com.example.backendSocial.Entity.User;

public interface ReportService {

    public Report createReport(Report report, User user) throws Exception;

    public List<Report> findUserReports(User user) throws Exception;

    public List<Report> findReportsByStatus(String status) throws Exception;

    public Report updateReport(Long id, String status) throws Exception;

    public Report findById(Long id) throws Exception;

    public Report commentReport(Long id, Comment comment,User user) throws Exception;

    List<Comment> fincCommentsByreportId(Long reportId) throws Exception;


}
