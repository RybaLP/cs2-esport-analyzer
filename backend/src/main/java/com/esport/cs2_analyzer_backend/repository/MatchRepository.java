package com.esport.cs2_analyzer_backend.repository;

import com.esport.cs2_analyzer_backend.model.Match;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;


@Repository
public interface MatchRepository extends JpaRepository<Match,Long> {

    @Query("SELECT m FROM Match m WHERE " +
            "(:team IS NULL OR LOWER(m.team1) LIKE LOWER(CONCAT('%', CAST(:team AS string), '%')) " +
            "OR LOWER(m.team2) LIKE LOWER(CONCAT('%', CAST(:team AS string), '%'))) " +
            "AND (:league IS NULL OR LOWER(m.league) LIKE LOWER(CONCAT('%', CAST(:league AS string), '%')))")
    Page<Match> findByFilters(@Param("team") String team,
                              @Param("league") String league,
                              Pageable pageable);

    @Query("SELECT DISTINCT m.league FROM Match m WHERE m.league IS NOT NULL ORDER BY m.league ASC")
    Set<String> findAllUniqueLeagues();

    @Query(value = "SELECT DISTINCT team FROM (" +
            "SELECT team1 AS team FROM matches " +
            "UNION " +
            "SELECT team2 AS team FROM matches" +
            ") AS all_teams WHERE team IS NOT NULL ORDER BY team ASC",
            nativeQuery = true)
    Set<String> findAllUniqueTeams();
}