package com.esport.cs2_analyzer_backend.service;

import com.esport.cs2_analyzer_backend.dto.MatchDTO;
import com.esport.cs2_analyzer_backend.mapper.MatchMapper;
import com.esport.cs2_analyzer_backend.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class MatchService {
    private final MatchRepository matchRepository;
    private final MatchMapper matchMapper;

    @Transactional(readOnly = true)
    public Page<MatchDTO> getMatchesPage(Pageable pageable) {
        return matchRepository.findAll(pageable)
                .map(matchMapper::toDTO);
    }

}