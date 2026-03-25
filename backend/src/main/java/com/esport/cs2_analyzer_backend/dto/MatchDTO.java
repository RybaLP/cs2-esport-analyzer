package com.esport.cs2_analyzer_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record MatchDTO(

        @JsonProperty("id")
        Long matchId,
        String team1,

        @JsonProperty("team1_logo")
        String team1Logo,
        String team2,

        @JsonProperty("team2_logo")
        String team2Logo,
        String winner,
        String score,
        String league,
        String date
){}