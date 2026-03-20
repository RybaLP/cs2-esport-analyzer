package com.esport.cs2_analyzer_backend.repository;

import com.esport.cs2_analyzer_backend.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchRepository extends JpaRepository<Match,Long> {
}
