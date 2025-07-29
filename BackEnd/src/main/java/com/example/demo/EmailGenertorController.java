package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*   ")
public class EmailGenertorController {

    private final EmailGenertorService emailGenertorService;

    public EmailGenertorController(EmailGenertorService emailGenertorService) {
        this.emailGenertorService = emailGenertorService;
    }

    @PostMapping("/generateEmail")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response=emailGenertorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }
}
