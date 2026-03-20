package com.esport.cs2_analyzer_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Match {

    @Id
    private Long id;

    private String team1;

    @Column(name = "team1_logo")
    private String team1Logo;
    private String team2;

    @Column(name = "team2_logo")
    private String team2Logo;

    private String winner;
    private String league;
    private String score;
    private String date;
}