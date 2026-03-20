package com.esport.cs2_analyzer_backend.controller;

import com.esport.cs2_analyzer_backend.dto.MatchDTO;
import com.esport.cs2_analyzer_backend.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/matches")
public class MatchController {

    private final MatchService matchService;

    @GetMapping
    public ResponseEntity<Page<MatchDTO>> getAllMatches (Pageable pageable) {
        return ResponseEntity.ok(matchService.getMatchesPage(pageable));
    }


}