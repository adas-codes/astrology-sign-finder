# Astrology Zodiac Finder

A static, browser-based astrology exploration app with a Spring Boot API foundation and PostgreSQL database. The frontend remains usable on its own; its current zodiac calculations run locally in `script.js`.

## Prerequisites

- Java 21
- Maven 3.6.3 or later
- Docker Engine with Docker Compose v2
- A modern web browser

## Frontend

The frontend has no build step or backend dependency. From the project root, run:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). The page and its existing date validation and zodiac calculations continue to work if the API or database is not running.

## PostgreSQL and environment

Copy the development environment template and edit it as needed:

```bash
cp .env.example .env
```

The example values are for local development only. Do not use them in a production environment. `.env` is ignored by Git. Configure `POSTGRES_DB`, `DB_USERNAME`, `DB_PASSWORD`, `POSTGRES_PORT`, `SERVER_PORT`, and `CORS_ALLOWED_ORIGINS` in `.env` to suit your local setup. The PostgreSQL user and password are required; there are no database credential defaults in Docker Compose.

Start PostgreSQL from the project root:

```bash
docker compose up -d postgres
docker compose ps
```

The service exposes PostgreSQL on `POSTGRES_PORT` (5432 by default), uses a named persistent volume, and includes a readiness health check. Stop the service without deleting its data with:

```bash
docker compose down
```

## Backend

After PostgreSQL reports healthy, start the API from the project root. Export the environment in `.env` to the current shell before launching Maven:

```bash
set -a
. ./.env
set +a
mvn -f backend/pom.xml spring-boot:run
```

The API starts on port 8081 by default. Flyway applies versioned migrations from `backend/src/main/resources/db/migration` on startup.

Check the health endpoint:

```bash
curl http://localhost:8081/api/health
```

Example response:

```json
{
  "status": "UP",
  "applicationName": "astrology-sign-finder",
  "version": "0.1.0-SNAPSHOT"
}
```

For browser-based local development, CORS allows the common localhost origins on ports 5500 and 8000. Override `CORS_ALLOWED_ORIGINS` with a comma-separated origin list if your frontend server uses a different address.

Run backend tests with:

```bash
mvn -f backend/pom.xml test
```

## Architecture

The backend is a Maven-based Spring Boot 3 application targeting Java 21 under `com.astrology`:

- `controller` — HTTP endpoints
- `service` — application-level behavior
- `repository` — persistence access (reserved for domain repositories)
- `entity` — persistence models (reserved until domain scope is defined)
- `dto` — API request and response types
- `config` — application and CORS configuration
- `exception` — structured global API error handling

Spring Web, Spring Data JPA, Spring Boot Validation, PostgreSQL, and Flyway are configured. The initial migration establishes the `astrology` schema; domain tables are intentionally not introduced yet. Hibernate schema generation is disabled in favor of versioned Flyway migrations.

## Existing zodiac systems

The frontend currently displays Western Tropical, Vedic Sidereal, True Sidereal/Astronomical, Chinese, BaZi, Tibetan, Mayan, Aztec, Native American Earth, Celtic Tree, Ancient Egyptian Decan, and Burmese classifications. These calculations are informational/interpretive and remain frontend-only for this foundation.
