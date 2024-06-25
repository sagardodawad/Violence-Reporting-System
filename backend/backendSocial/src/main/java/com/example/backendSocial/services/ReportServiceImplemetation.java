package com.example.backendSocial.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backendSocial.Entity.Comment;
import com.example.backendSocial.Entity.Report;
import com.example.backendSocial.Entity.User;
import com.example.backendSocial.repositories.CommentRepository;
import com.example.backendSocial.repositories.ReportRepository;

@Service
public class ReportServiceImplemetation implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public Report createReport(Report report, User user) throws Exception {

        Report newReport = new Report();

        newReport.setDescription(report.getDescription());

        newReport.setTitle(report.getTitle());

        newReport.setUser(user);

        newReport.setFiles(report.getFiles());

        newReport.setStatus("PENDING");

        newReport.setCreatedAt(new Date(System.currentTimeMillis()));

        Report savedReport = reportRepository.save(newReport);

        return savedReport;
    }

    @Override
    public List<Report> findUserReports(User user) throws Exception {

        List<Report> reports = reportRepository.findByUser(user);

        return reports;
    }

    @Override
    public List<Report> findReportsByStatus(String status) throws Exception {

        List<Report> reports = reportRepository.findByStatus(status);

        return reports;
    }

    @Override
    public Report updateReport(Long id, String status) throws Exception {
        Report report = reportRepository.findById(id).get();

        report.setStatus(status);

        Report updatedReport = reportRepository.save(report);

        return updatedReport;
    }

    @Override

    public Report findById(Long id) throws Exception {

        Report report = reportRepository.findById(id).get();

        return report;
    }

    @Override
    public Report commentReport(Long id, Comment comment, User user) throws Exception {
        Report report = reportRepository.findById(id).get();

        Comment newComment = new Comment();

        newComment.setComment(comment.getComment());

        newComment.setUser(user);

        newComment.setDate(new Date(System.currentTimeMillis()));

        newComment.setReport(report);
        
        commentRepository.save(newComment);

        report.getComments().add(newComment);
        
        Report updatedReport = reportRepository.save(report);

        return updatedReport;
    }

    @Override
    public List<Comment> fincCommentsByreportId(Long reportId) throws Exception {

        Report report=findById(reportId);

        return report.getComments();
    }

}
