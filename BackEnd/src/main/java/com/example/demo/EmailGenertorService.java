package com.example.demo;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailGenertorService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailGenertorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailRequest emailRequest){
        //build the promt
        String prompt=buildPromt(emailRequest);

        //craft a request
        Map<String,Object> requestBody=Map.of(
                "contents",new Object[]{
                        Map.of("parts",new Object[]{
                                Map.of("text",prompt)
                        })
                }
        );

        // Do request and get response
        String response=webClient.post()
                .uri(geminiApiUrl+geminiApiKey)
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // return response
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try{
            ObjectMapper mapper=new ObjectMapper();
            JsonNode rootnode=mapper.readTree(response);
            return rootnode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        }catch (Exception e){
            return "Error [processing request: " +e.getMessage();
        }
    }

    private String buildPromt(EmailRequest emailRequest) {
        StringBuilder promt=new StringBuilder();
        promt.append("Generate a professional email reply for the following email content.please dont generate the subject line ");
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()){
            promt.append("Use a ").append(emailRequest.getTone()).append(" tone.");
        }
        promt.append("\nOriginal email: \n").append(emailRequest.getEmailContent());
        return promt.toString();
    }
}
