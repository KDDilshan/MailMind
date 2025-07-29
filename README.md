# 📧 Smart Email Assistant – AI-Powered Gmail Reply Generator

[![Java](https://img.shields.io/badge/Java-17%2B-blue?logo=java)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green?logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-Enabled-yellow?logo=googlechrome)](https://developer.chrome.com/docs/extensions/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Smart Email Assistant is a full-stack project that uses **Spring Boot**, **React.js**, and **Gemini AI** to generate intelligent, tone-specific replies to emails. It works as both a **web application** and a **Chrome extension** that integrates directly with **Gmail**, showcasing your skills in AI integration, REST APIs, frontend frameworks, and browser extension development.

---

## 🚀 Features

- ✉️ AI-generated email replies based on message content and selected tone (Professional, Friendly, Casual)
- 🤖 Gemini API integration using Spring AI
- 🌐 React.js web frontend (with Material UI + Vite)
- 🧩 Chrome Extension for Gmail integration
- ⚙️ Asynchronous backend using WebClient
- 🧠 Prompt engineering and AI response parsing
- 🔐 Secure API keys via environment variables

---

## 🛠️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Backend   | Spring Boot, Spring AI, WebClient |
| Frontend  | React.js (Vite), Material UI      |
| Chrome Extension | JavaScript, HTML, CSS       |
| AI        | Google Gemini API (via Spring AI) |
| Tools     | Axios, Jackson, MutationObserver  |

---

## 🧠 How It Works

### Web App:
1. User enters email content and selects a tone.
2. React sends a POST request to Spring Boot.
3. Backend sends a crafted prompt to Gemini API using WebClient.
4. Gemini API generates a reply → parsed and sent back to frontend.

### Chrome Extension:
1. Monitors Gmail DOM using `MutationObserver`.
2. Injects "AI Reply" button in Gmail compose window.
3. Sends content to backend → inserts reply directly into compose box using `execCommand`.


### Architecture
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Chrome        │    │   React.js       │    │   Spring Boot   │
│   Extension     │───▶│   Frontend       │───▶│   Backend       │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │   Google        │
                                                │   Gemini API    │
                                                └─────────────────┘

