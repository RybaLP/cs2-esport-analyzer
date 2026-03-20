package com.esport.cs2_analyzer_backend.dto;

public record MatchDTO(
        Long matchId,
        String team1,
        String team1Logo,
        String team2,
        String team2Logo,
        String winner,
        String league,
        String date
){}