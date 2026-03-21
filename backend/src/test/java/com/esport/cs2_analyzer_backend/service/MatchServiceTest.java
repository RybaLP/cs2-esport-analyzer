package com.esport.cs2_analyzer_backend.service;

import com.esport.cs2_analyzer_backend.dto.MatchDTO;
import com.esport.cs2_analyzer_backend.dto.SearchCriteria;
import com.esport.cs2_analyzer_backend.mapper.MatchMapper;
import com.esport.cs2_analyzer_backend.model.Match;
import com.esport.cs2_analyzer_backend.repository.MatchRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MatchServiceTest {

    @Mock
    private MatchRepository matchRepository;

    @Mock
    private MatchMapper matchMapper;

    @InjectMocks
    private MatchService matchService;

    private SearchCriteria query1;
    private SearchCriteria query2;
    private Pageable pageable;

    @BeforeEach
    void setUp() {
        this.query1 = new SearchCriteria("Major", "Faze");
        this.query2 = new SearchCriteria("", "Vitality");
        this.pageable = PageRequest.of(0, 10);
    }

    @Nested
    @DisplayName("get matches tests")
    class GetMatches {

        @Test
        void shouldReturnPagedMatchesWhenFiltersProvided() {
            // given
            Match match = new Match();
            MatchDTO dto = new MatchDTO(
                    1L, "Faze", "", "Navi", "", "Faze", "Major", "2024-01-01"
            );
            Page<Match> matchPage = new PageImpl<>(List.of(match));

            when(matchRepository.findByFilters("Faze", "Major", pageable))
                    .thenReturn(matchPage);
            when(matchMapper.toDTO(match)).thenReturn(dto);

            // when
            Page<MatchDTO> result = matchService.getMatchesPage(pageable, query1);

            // then
            assertThat(result).isNotNull();
            assertThat(result.getContent()).hasSize(1);
            assertThat(result.getContent().get(0)).isEqualTo(dto);

            verify(matchRepository).findByFilters("Faze", "Major", pageable);
            verify(matchMapper).toDTO(match);
        }

        @Test
        void shouldHandleEmptyLeagueFilter() {
            // given
            Match match = new Match();
            MatchDTO dto = new MatchDTO(
                    2L, "Vitality", "", "G2", "", "Vitality", "", "2024-01-01"
            );
            Page<Match> matchPage = new PageImpl<>(List.of(match));

            when(matchRepository.findByFilters("Vitality", "", pageable))
                    .thenReturn(matchPage);
            when(matchMapper.toDTO(match)).thenReturn(dto);

            // when
            Page<MatchDTO> result = matchService.getMatchesPage(pageable, query2);

            // then
            assertThat(result.getContent()).hasSize(1);
            assertThat(result.getContent().get(0)).isEqualTo(dto);

            verify(matchRepository).findByFilters("Vitality", "", pageable);
            verify(matchMapper).toDTO(match);
        }
    }
}