package com.example.backendSocial.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    private String description;

    @ElementCollection
    private List<String> files;

    private String status;

    private String title;

    @JsonIgnore
    @ManyToMany
    private java.util.List<Comment> comments = new ArrayList<>();
    
    private Date createdAt;

}
