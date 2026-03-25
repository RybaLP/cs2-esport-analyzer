# CS2 Esports Analytics Platform

A data engineering–focused project for collecting, processing and exposing professional Counter-Strike 2 match data.

The system follows a simple event-driven architecture using Kafka, with a backend API and a frontend for data exploration.

---

## Overview

The project is divided into three main components:

* Python pipeline (data ingestion & Kafka producer)
* Java backend (Kafka consumer + REST API)
* Next.js frontend (data visualization)

Current data flow:

PandaScore API → Python (producer) → Kafka → Java (consumer) → PostgreSQL → API → Frontend

---

## Architecture

### Data Ingestion (Python)

Responsible for fetching and preparing data.

* pulls match data from PandaScore API
* performs basic transformations / cleaning
* publishes events to Kafka

**Entry point:**

* `run_pipeline.py`

**Additional logic:**

* `scripts/`

---

### Streaming Layer (Kafka)

Kafka acts as a buffer between ingestion and backend.

* decouples Python pipeline from backend
* allows asynchronous processing
* makes the system easier to scale and extend

---

### Backend (Spring Boot)

Consumes Kafka events and exposes REST API.

**Tech stack:**

* Spring Boot
* Spring Kafka
* JPA / Hibernate
* PostgreSQL

**Responsibilities:**

* consumes messages from Kafka
* persists data in PostgreSQL
* exposes endpoints for frontend

---

### Frontend (Next.js)

Frontend for browsing and analyzing match data.

* built with Next.js
* consumes backend API
* focuses on simple data exploration and visualization

---

## Running the project

### 1. Start infrastructure

Run PostgreSQL and Kafka using Docker:

```bash
docker-compose up -d
```

---

### 2. Run data pipeline

```bash
python run_pipeline.py
```

---

### 3. Run backend

```bash
cd backend
./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

---

### 4. Run frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment variables

Create a `.env` file based on `.env.example`.

Example configuration:

```env
# PandaScore API
PANDASCORE_API_KEY=your_api_key

# Kafka
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
KAFKA_TOPIC=cs2_matches

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cs2
DB_USER=postgres
DB_PASSWORD=postgres

# Backend
SPRING_PROFILES_ACTIVE=dev
```

---

## Project structure

```
.
├── backend/               # Spring Boot application
├── frontend/              # Next.js app
├── scripts/               # ETL pipeline steps
├── data/                  # processed datasets (optional / intermediate)
├── run_pipeline.py        # pipeline entrypoint
├── docker-compose.yml     # infrastructure (Postgres, Kafka)
└── .env.example
```

---

## Notes

* The project is intentionally simple and focused on learning data engineering concepts
* Kafka is used mainly to introduce event-driven architecture
* The pipeline can be extended with:

  * more advanced transformations
  * additional data sources
  * real-time analytics

---

## Disclaimer
This project uses PandaScore API data for educational purposes.