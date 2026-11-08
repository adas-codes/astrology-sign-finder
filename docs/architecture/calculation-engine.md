# Vedic calculation engine

## Implemented scope

The application is a stateless Spring Boot 3 / Java 21 service with one
versioned calculation API. It calculates only the Vedic D1 / Rāśi natal chart:

- Lahiri ayanāṃśa (Swiss Ephemeris sidereal mode `1`).
- Sidereal geocentric longitudes from the official Swiss Ephemeris engine.
- Mean lunar node for Rahu; Ketu is its antipode.
- Sidereal ascendant (Lagna) from the Swiss Ephemeris house calculation.
- Twelve whole-sign houses, plus signs and 27 nakshatra / four-pada segments.
- Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Rahu, and Ketu.

Dashas, divisional charts, interpretation, and other astrology systems are
not implemented. Birth records and calculation results are not persisted.
There is no database in the runtime architecture.

## Calculation flow

1. Validate ISO Gregorian date, local wall time to seconds, and a selected
   provider place ID.
2. Resolve the place and coordinates using the explicitly configured
   `PlaceProvider`.
3. Resolve its IANA timezone using the birth date and reject DST gaps or
   overlaps rather than selecting an offset silently.
4. Convert the single valid local time to an instant and invoke
   `SwissEphemerisEngine`.
5. The adapter starts the configured official `swetest` executable with
   explicit Swiss Ephemeris mode, Lahiri sidereal mode, mean node, and
   location/house arguments. It parses actual engine output; missing output,
   process failures, timeouts, missing executable, and missing data are errors.
6. Normalize longitudes into `[0°, 360°)`. Divide the zodiac into 12 equal
   30-degree signs. Calculate house number as
   `((pointSign - lagnaSign + 12) mod 12) + 1`.
7. Divide the sidereal zodiac into 27 equal segments of 13°20′ and each
   nakshatra into four equal padas of 3°20′.
8. Return D1 data and method metadata. No plausible-looking substitute is
   emitted for a failed provider or engine call.

## Ports and infrastructure

`PlaceProvider` is the location/time-zone boundary. The included
`GoogleMapsPlaceProvider` is disabled unless `LOCATION_PROVIDER=google-maps`
and `GOOGLE_MAPS_API_KEY` are supplied. It makes no calls to public Nominatim.
It returns safe provider errors without logging submitted query values, API
keys, or request URLs.

`SwissEphemerisEngine` is the calculation boundary. It launches
`SWISSEPH_EXECUTABLE` with `SWISSEPH_EPHEMERIS_PATH` and has a 30-second
process timeout. The external engine must be the official compatible
Swiss Ephemeris `swetest` distribution with its matching data files installed.
The executable and ephemeris data are deployment dependencies and are not
bundled in this source tree. No internal ephemeris approximation or sample
result exists.

The CLI output adapter expects the standard `-fPls` planet-name, longitude,
speed fields and the `Asc` entry emitted with `-house`. Engine upgrades or
changes to this output format require parser fixtures and a compatibility
review. The installed ephemeris files determine date coverage; no broader
range is promised by this application. Unsupported dates and missing/corrupt
data surface as service errors.

## Licensing, distribution, and operations

Swiss Ephemeris is offered by Astrodienst under AGPL or a paid professional
license. This project adopts the AGPL-compatible route; a commercial license
is not assumed. The project is AGPL-3.0-or-later. Obtain Swiss Ephemeris and
its data from the official distribution, retain its notices, and verify that
the chosen version/data distribution is compatible with the deployment's
AGPL obligations. Operators distributing or hosting a modified service must
review their corresponding-source and network-use obligations. See
[`../../THIRD-PARTY-NOTICES`](../../THIRD-PARTY-NOTICES).

Google Maps Platform is a separately configured service with its own terms
and billing. Search text is sent to Google Geocoding; during chart requests,
the chosen place is resolved and coordinates plus birth date at noon UTC are
sent to Google Time Zone. Exact local birth time and resulting chart stay in
the application. Operators must provide any privacy notice/consent required
for their use.

## Validation and known limitations

Unit tests exercise chart structure, sign/house assignment, nakshatra/pada
boundaries, DST gaps/overlaps, API validation, error propagation, and
Swiss Ephemeris output parsing. They do not prove an external binary/data
installation is valid. A deployment should validate its pinned engine and
data with independently checked ephemeris fixtures before serving users.

Lagna precision depends on the accuracy of reported birth time and the
provider's historical timezone data; the API currently requires a time but
does not quantify user-reported uncertainty. Provider changes and Swiss
Ephemeris/data updates are operationally significant and must be reviewed.
