# CS2 Esport Analyzer

This project is a simple analytics platform for professional Counter-Strike 2 matches. It combines a Python data pipeline, a Spring Boot backend, and a planned React frontend.

---

## Architecture

The data flows through the system in the following way:

PandaScore API → Python ETL → PostgreSQL → Spring Boot API → React frontend

---

## Data Pipeline

The pipeline is already implemented and is responsible for collecting and preparing data.

It:

* fetches match data from the PandaScore API
* applies basic cleaning and transformations
* stores the results in PostgreSQL

Main files:

* `run_pipeline.py` – runs the full ETL process
* `scripts/` – individual pipeline steps
* `data/processed/` – cleaned datasets

---

## Backend

The backend is built with Spring Boot and exposes REST endpoints for accessing the data.

Tech stack:

* Spring Boot
* JPA Hibernate
* PostgreSQL

---

## Frontend
In progress
---

## Running the project

### 1. Database and data pipeline

Start PostgreSQL using Docker:

```bash
docker-compose up -d
```

Run the pipeline:

```bash
python run_pipeline.py
```

## Environment variables

A sample configuration is available in `.env.example`.

Create your own `.env` file based on it and adjust values if needed.

Typical variables include:

* database connection settings
* API keys for PandaScore