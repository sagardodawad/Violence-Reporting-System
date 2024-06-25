package com.example.backendSocial.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backendSocial.Entity.Report;
import com.example.backendSocial.Entity.User;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("SELECT r FROM Report r WHERE r.user = :user")
    public List<Report> findByUser(@Param("user") User user);

    @Query("SELECT r FROM Report r WHERE r.status = :status")
    public List<Report> findByStatus(@Param("status") String status);
}
