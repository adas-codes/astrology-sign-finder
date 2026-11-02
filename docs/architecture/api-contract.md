# Calculation API contract

## Status

This is a proposed contract, not an implemented API. At present, only
`GET /api/health` exists. The frontend calls no backend endpoint. Keep the
existing health response independent; use the conventions below for new
calculation resources.

Base path: `/api`. JSON request/response bodies use UTF-8 and lower
camel-case property names. System identifiers are stable lowercase slugs.
Dates and times use ISO formats; the existing browser's `DD/MM/YYYY` format
must be converted by the client at the API boundary, not accepted as a second
server format.

## Birth input model

```json
{
  "dateOfBirth": "1994-06-15",
  "timeOfBirth": "08:42:00",
  "birthplace": {
    "label": "Pune, India",
    "latitude": 18.5204,
    "longitude": 73.8567,
    "elevationMeters": 560
  },
  "timeZone": "Asia/Kolkata",
  "timeAccuracy": "APPROXIMATE"
}
```

| Field | Requirement | Contract |
|---|---|---|
| `dateOfBirth` | Required | Valid ISO-8601 Gregorian date (`YYYY-MM-DD`). Explicitly document any supported historic calendar range. |
| `timeOfBirth` | Optional | Local wall time, `HH:mm` or `HH:mm:ss`; it is not an instant without `timeZone`. |
| `birthplace` | Optional | Label plus optional explicit coordinates/elevation. Coordinates use WGS84 decimal degrees and meters; no automatic geocoding. A label alone is descriptive, not computational. |
| `timeZone` | Optional | IANA TZDB ID such as `Asia/Kolkata`; no abbreviations like `IST`. For instant-sensitive calculations, time without this field is insufficient. |
| `timeAccuracy` | Optional | `EXACT`, `APPROXIMATE`, `UNKNOWN`; default `UNKNOWN`. If there is no time, accuracy is `UNKNOWN`. This describes source precision. |

The example's coordinates are illustrative input only, not a server-side
geocoding result. Validate coordinate ranges, real civil dates, valid
timezones, and local-time gaps/ambiguities. If local time is ambiguous during a
clock rollback, require an offset/disambiguation policy in a future contract
revision rather than choosing an offset silently.

Missing time, timezone, or location is not globally invalid: date-only systems
may still calculate. Each calculator declares requirements. A module that
needs a missing value returns `INSUFFICIENT_INPUT`; it must not assume
midnight/noon, server timezone, or guessed coordinates.

## `GET /api/systems`

Returns the catalog and implementation availability in this deployment.
`implementationStatus` describes server support, not historical validity or
accuracy. Proposed values: `NOT_IMPLEMENTED`, `EXPERIMENTAL`, `AVAILABLE`,
`DISABLED`.

```json
{
  "systems": [
    {
      "systemId": "western-tropical",
      "name": "Western Tropical",
      "traditionType": "TRADITIONAL",
      "implementationStatus": "NOT_IMPLEMENTED",
      "supportedMethods": [],
      "requiredInputs": ["dateOfBirth"],
      "optionalInputs": ["timeOfBirth", "timeZone"],
      "summary": "Tropical zodiac classification; the exact solar-longitude method is not yet enabled."
    },
    {
      "systemId": "mayan-tzolkin",
      "name": "Mayan Tzolk'in",
      "traditionType": "HISTORICAL_CALENDAR",
      "implementationStatus": "NOT_IMPLEMENTED",
      "supportedMethods": [],
      "requiredInputs": ["dateOfBirth"],
      "optionalInputs": [],
      "summary": "Calendar conversion requires an explicitly versioned correlation and convention."
    }
  ],
  "catalogVersion": "1"
}
```

The endpoint should list all 12 named systems from
[`system-methodology-matrix.md`](./system-methodology-matrix.md), including
systems not currently calculated by the backend. Do not expose a system as
`AVAILABLE` merely because the browser has a local approximation.

## `GET /api/systems/{systemId}`

Returns one descriptor, including inputs, methodology and limitations.

```json
{
  "systemId": "vedic-jyotish",
  "name": "Vedic / Jyotish",
  "traditionType": "TRADITIONAL",
  "implementationStatus": "NOT_IMPLEMENTED",
  "inputRequirements": {
    "required": ["dateOfBirth", "timeOfBirth", "timeZone"],
    "optional": ["birthplace"],
    "precisionNotes": [
      "Birth time and zone are needed for an instant-based solar-sign boundary.",
      "A full chart or ascendant requires location and additional declared settings."
    ]
  },
  "methodology": {
    "methodologyId": "jyotish-solar-rashi",
    "version": null,
    "description": "No server method is currently selected. A future release must name its ayanamsa, coordinate frame, ephemeris, and time scale."
  },
  "limitations": [
    "The browser implementation uses fixed Gregorian date ranges and is not an astronomical Jyotish calculation.",
    "Tradition-specific settings are unresolved."
  ],
  "sources": []
}
```

Use `404 Not Found` for an unknown `systemId`; a known but unimplemented
system returns `200` with `NOT_IMPLEMENTED`.

## `POST /api/calculations`

The caller requests one or more systems. The server validates the common
profile once, then evaluates each system independently.

Request:

```json
{
  "birthProfile": {
    "dateOfBirth": "1994-06-15",
    "timeOfBirth": "08:42:00",
    "birthplace": {
      "label": "Pune, India",
      "latitude": 18.5204,
      "longitude": 73.8567
    },
    "timeZone": "Asia/Kolkata",
    "timeAccuracy": "APPROXIMATE"
  },
  "systems": [
    "western-tropical",
    "vedic-jyotish",
    "bazi",
    "mayan-tzolkin",
    "native-earth"
  ]
}
```

Response (illustrative; result values and methods are not currently
implemented):

```json
{
  "calculationId": "calc_01J...",
  "calculatedAt": "2026-11-02T16:50:00Z",
  "birthInputSummary": {
    "dateOfBirth": "1994-06-15",
    "timeProvided": true,
    "timeZone": "Asia/Kolkata",
    "timeAccuracy": "APPROXIMATE",
    "birthplaceProvided": true
  },
  "requestedSystems": [
    "western-tropical",
    "vedic-jyotish",
    "bazi",
    "mayan-tzolkin",
    "native-earth"
  ],
  "results": [
    {
      "systemId": "western-tropical",
      "status": "SUCCESS",
      "completeness": "COMPLETE",
      "classification": {
        "classificationId": "gemini",
        "label": "Gemini",
        "symbol": "♊"
      },
      "values": {
        "quantity": "solar-ecliptic-longitude",
        "degrees": 83.42
      },
      "methodology": {
        "methodologyId": "western-tropical-solar-sign",
        "version": "1.0.0",
        "calculatorVersion": "1.0.0",
        "ephemeris": "example-pinned-release"
      },
      "warnings": [],
      "limitations": [
        "Illustrative contract value only; not a current repository calculation."
      ]
    },
    {
      "systemId": "vedic-jyotish",
      "status": "UNSUPPORTED",
      "completeness": "NONE",
      "classification": null,
      "methodology": null,
      "warnings": [],
      "limitations": ["No enabled server calculator."]
    },
    {
      "systemId": "bazi",
      "status": "UNSUPPORTED",
      "completeness": "NONE",
      "classification": null,
      "methodology": null,
      "warnings": [],
      "limitations": ["No enabled server calculator or selected solar-term/day-boundary convention."]
    },
    {
      "systemId": "mayan-tzolkin",
      "status": "UNSUPPORTED",
      "completeness": "NONE",
      "classification": null,
      "methodology": null,
      "warnings": [],
      "limitations": ["No enabled server calculator."]
    },
    {
      "systemId": "native-earth",
      "status": "UNSUPPORTED",
      "completeness": "NONE",
      "classification": null,
      "methodology": null,
      "warnings": [],
      "limitations": ["No named, sourced tradition has been selected."]
    }
  ]
}
```

The illustrative successful value is not a claim about the existing app; real
implementations must replace it with independently verified output. Do not
expose unnecessary personal information in `birthInputSummary`: no birthplace
label or coordinates, time string, or profile ID is returned by default.

Require a non-empty `systems` array, unique IDs, and a documented maximum
request size. Preserve request order in `results`. For known but unimplemented
systems, return an individual `UNSUPPORTED` result instead of failing the
entire batch. Unknown IDs are a request validation error (`400`) to catch
typos; catalog clients can discover valid IDs. If a valid request has
system-specific missing input, return `200` with that result's
`INSUFFICIENT_INPUT`. An unexpected system-specific exception is isolated as
`CALCULATION_ERROR`, while other systems can complete.

## Status semantics

`status` values: `SUCCESS`, `INSUFFICIENT_INPUT`, `UNSUPPORTED`,
`INVALID_INPUT`, `CALCULATION_ERROR`. `completeness` values: `COMPLETE`,
`PARTIAL`, `NONE`. A success result may be partial only if the method
explicitly defines a useful partial result and reports warnings. For all
non-success statuses, `classification` is `null` and completeness is `NONE`.
Never return a fallback sign as success.

Malformed JSON, impossible dates, invalid IANA timezone IDs, bad coordinate
ranges, duplicate IDs, unknown IDs, and constraint violations are top-level
`400` responses. An unknown resource ID on `GET /systems/{systemId}` is `404`.
Unexpected API-level failures use `500`. Per-system calculation failures are
results, not top-level failures, unless the request itself cannot be parsed.

## Error response convention

Use one stable error shape aligned with the current `ApiErrorResponse`
concept, but prefer machine-readable `code` and an `errors` list. Keep
`message` safe for clients; do not return exception details or personal data.

```json
{
  "timestamp": "2026-11-02T16:50:00Z",
  "status": 400,
  "code": "VALIDATION_ERROR",
  "message": "The request is invalid.",
  "path": "/api/calculations",
  "correlationId": "req_01J...",
  "errors": [
    {
      "field": "birthProfile.dateOfBirth",
      "code": "INVALID_DATE",
      "message": "Expected a valid ISO date in YYYY-MM-DD format."
    }
  ]
}
```

Keep HTTP error status and per-calculation status conceptually distinct: HTTP
describes request handling; a system result status describes that calculator's
outcome.

## Input privacy

Do not log request bodies, birth profile values, or coordinates. Use a
random/non-derivable calculation ID, not a hash of the date. `calculationId`
is a response correlation identifier, not evidence that the result has been
stored. Persistence and account ownership are out of scope for this initial
contract.
