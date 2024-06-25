package com.example.backendSocial.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backendSocial.Entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{
    
}
