package com.esport.cs2_analyzer_backend.kafka;


import com.esport.cs2_analyzer_backend.dto.MatchDTO;
import com.esport.cs2_analyzer_backend.service.MatchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
@Slf4j
public class MatchKafkaConsumer {

    private final MatchService matchService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "${app.topic-name}", groupId = "${spring.kafka.consumer.group-id}" , concurrency = "3")
    public void consume (String message) {
        try {
            log.info("New kafka message: {}", message);
            MatchDTO matchDTO = objectMapper.readValue(message, MatchDTO.class);
            matchService.saveToDataBase(matchDTO);

        } catch (Exception e) {
            log.error("Error processing Kafka message: {}", e.getMessage());
        }
    }
}