package com.esport.cs2_analyzer_backend.service;

import com.esport.cs2_analyzer_backend.dto.MatchDTO;
import com.esport.cs2_analyzer_backend.dto.SearchCriteria;
import com.esport.cs2_analyzer_backend.mapper.MatchMapper;
import com.esport.cs2_analyzer_backend.model.Match;
import com.esport.cs2_analyzer_backend.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;


@Service
@RequiredArgsConstructor
public class MatchService {
    private final MatchRepository matchRepository;
    private final MatchMapper matchMapper;

    @Transactional(readOnly = true)
    public Page<MatchDTO> getMatchesPage(Pageable pageable, SearchCriteria searchCriteria) {
        return matchRepository.findByFilters(searchCriteria.team(),searchCriteria.league(),pageable)
                .map(matchMapper :: toDTO);
    }

    @Transactional(readOnly = true)
    public Map<String, Set<String>> getUniqueTeamsAndLeagues() {

        Map<String,Set<String>> response = new HashMap<>();

        Set<String> uniqueTeams = matchRepository.findAllUniqueTeams();
        Set<String> uniqueLeagues = matchRepository.findAllUniqueLeagues();

        response.put("teams",uniqueTeams);
        response.put("leagues",uniqueLeagues);

        return response;
    }
}