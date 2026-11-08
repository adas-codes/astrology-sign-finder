# Vedic Birth Chart

A Vedic-only natal chart application. It calculates a D1 / Rāśi chart from a
birth date, exact local birth time, and searchable birthplace. The baseline is
Lahiri ayanāṃśa, sidereal geocentric positions, whole-sign houses, the mean
lunar node, Lagna, and the nine grahas with sign, house, nakshatra, and pada.
Dashas and divisional charts are not included.

Calculations use the official Swiss Ephemeris `swetest` executable and its
ephemeris data files. Planetary positions are never approximated in the
browser. Birth details and results are processed in memory and are not saved.
The application does not log request bodies or place-query values.

## Requirements

- Java 21
- Maven 3.6.3+
- Python 3 (for serving the static frontend)
- An official Swiss Ephemeris `swetest` binary and matching ephemeris data
- A Google Maps Platform API key with Geocoding API and Time Zone API enabled
  for birthplace search and historical local-time-zone resolution

The engine and provider are deployment dependencies, not bundled sample
services. Without their configuration, corresponding API requests return
explicit `503` errors; no sample or fallback chart/place data is returned.

## Configure and run

Set these variables in the backend process environment:

```bash
export SWISSEPH_EXECUTABLE=/absolute/path/to/swetest
export SWISSEPH_EPHEMERIS_PATH=/absolute/path/to/swiss-ephemeris-data
export LOCATION_PROVIDER=google-maps
export GOOGLE_MAPS_API_KEY=your-deployment-managed-key
export CORS_ALLOWED_ORIGINS=http://localhost:8000
```

Keep the API key in deployment secret management; do not commit it. The API
key must be restricted to the required Google APIs and deployment origins as
appropriate. The location provider is disabled unless `LOCATION_PROVIDER` is
explicitly set. The Swiss Ephemeris binary and data directory are also
mandatory at chart-calculation time.

Start the backend:

```bash
mvn -f backend/pom.xml spring-boot:run
```

Serve the frontend in another shell:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). The default API URL is
`http://localhost:8080/api/v1`; deployments can change the `api-base-url` meta
value in `index.html`. Check `GET http://localhost:8080/api/health` for service
health.

## Provider privacy and terms

Birthplace searches are sent to the configured Google Maps Platform Geocoding
API. When calculating a chart, the selected place ID is resolved by that
provider; its coordinates and the birth date (represented as noon UTC) are
sent to the Google Time Zone API to resolve the IANA time zone. The exact
birth time is resolved locally and is not sent to Google. The UI discloses
these transfers before submission. Operators must review and comply with the
provider's current terms, billing, retention, and privacy requirements and
provide any additional privacy notice/consent required for their deployment.
No public Nominatim endpoint or undisclosed geocoder is used.

## Calculation contract

- Birth input: ISO Gregorian `dateOfBirth`, exact local `timeOfBirth` to
  seconds, and a selected provider `placeId`.
- `GET /api/v1/places?query=...` searches for a birthplace.
- `POST /api/v1/charts` resolves the selected place/time zone, rejects
  nonexistent or ambiguous daylight-saving local times, then calculates the
  chart.
- Swiss Ephemeris sidereal mode `1` is Lahiri; the engine is invoked with
  Swiss Ephemeris mode and mean lunar node. Ketu is placed opposite mean Rahu.
- The engine supplies the sidereal ascendant and planetary positions. Whole
  sign houses, sign labels, and 27 nakshatra / four-pada segments are derived
  deterministically from those positions.
- The D1 response contains the Lagna, Sun, Moon, Mercury, Venus, Mars,
  Jupiter, Saturn, Rahu, and Ketu. No dasha, divisional chart, interpretation,
  or alternate astrological system is produced.

See [API contract](docs/architecture/api-contract.md),
[calculation engine](docs/architecture/calculation-engine.md), and
[methodology](docs/architecture/system-methodology-matrix.md) for detailed
rules and limitations.

## Validation

Run backend tests:

```bash
mvn -f backend/pom.xml test
```

Tests cover chart structure, nakshatra/pada and whole-sign boundaries,
daylight-saving gaps/overlaps, API validation/error behavior, and Swiss
Ephemeris output parsing. An actual production chart requires the external
official binary/data and provider configuration described above.

## License

This project is licensed under the GNU Affero General Public License,
version 3 or (at your option) any later version; see [`LICENSE`](LICENSE).
Swiss Ephemeris is dual-licensed by Astrodienst under AGPL or a paid
professional license. This project selects the AGPL-compatible path and does
not assume or require a commercial license. Obtain the engine and ephemeris
data from the official Swiss Ephemeris distribution and comply with its
applicable AGPL and distribution notices. The engine is not bundled here.
