package com.esport.cs2_analyzer_backend.mapper;

import com.esport.cs2_analyzer_backend.dto.MatchDTO;
import com.esport.cs2_analyzer_backend.model.Match;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MatchMapper {

    @Mapping(source = "id", target = "matchId")
    MatchDTO toDTO(Match match);
}