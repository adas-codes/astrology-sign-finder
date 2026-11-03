# Calculation API contract

## Status

This is a proposed contract, not an implemented API. At present, only
`GET /api/health` exists. The frontend calls no backend endpoint. Keep the
existing health response independent; use the conventions below for new
calculation resources.

Base path: `/api`. JSON request/response bodies use UTF-8 and lower
camel-case property names. `systemId` identifies a tradition/system;
`methodId` identifies one calculation approach within that system; and
`methodologyVersion` pins that method's immutable rules/configuration. A
calculation must select all three explicitly. Dates and times use ISO
formats; the existing browser's `DD/MM/YYYY` format must be converted by the
client at the API boundary, not accepted as a second server format.

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
  "timeAccuracy": "APPROXIMATE",
  "timeUncertaintyMinutes": 10
}
```

| Field | Requirement | Contract |
|---|---|---|
| `dateOfBirth` | Required | Valid ISO-8601 Gregorian date (`YYYY-MM-DD`). Explicitly document any supported historic calendar range. |
| `timeOfBirth` | Optional | Local wall time, `HH:mm` or `HH:mm:ss`; it is not an instant without `timeZone`. |
| `birthplace` | Optional | Label plus optional explicit coordinates/elevation. Coordinates use WGS84 decimal degrees and meters; no automatic geocoding. A label alone is descriptive, not computational. |
| `timeZone` | Optional | IANA TZDB ID such as `Asia/Kolkata`; no abbreviations like `IST`. For instant-sensitive calculations, time without this field is insufficient. |
| `timeAccuracy` | Optional | `EXACT`, `APPROXIMATE`, `UNKNOWN`; default `UNKNOWN`. If there is no time, accuracy is `UNKNOWN`. Describes the reported time, not algorithm precision. |
| `timeUncertaintyMinutes` | Conditional | Required when `timeAccuracy` is `APPROXIMATE`; integer from 1 through 1440 inclusive. After resolving the reported local time to an instant, it is a symmetric ± elapsed-time uncertainty around that instant. Must be omitted for `EXACT` and `UNKNOWN`. |

The example's coordinates are illustrative input only, not a server-side
geocoding result. Validate coordinate ranges, real civil dates, valid
timezones, and local-time gaps/ambiguities. If local time is ambiguous during a
clock rollback, require an offset/disambiguation policy in a future contract
revision rather than choosing an offset silently.

The 1440-minute upper bound is a contract limit, not a claim that uncertainty
this large is useful for every method. A method may reject an interval it
cannot support. `EXACT` means no additional uncertainty was reported at the
supplied representation precision; it does not mean unlimited precision or
zero algorithmic error. `UNKNOWN` time accuracy does not supply an interval.

Missing time, timezone, or location is not globally invalid: each selected
method version declares its own requirements. A genuinely civil-date-based
method may use `dateOfBirth` directly with no timezone. An astronomical method
requires an instant or an explicit interval. Missing timezone is never
replaced with UTC, server timezone, or a timezone inferred from the
birthplace. A method that needs an instant returns `INSUFFICIENT_INPUT` if it
cannot construct one. A no-time method may return a qualified partial result
only when its descriptor defines how it evaluates the full civil-date
interval and can establish the classification without an implicit timezone.

For `APPROXIMATE`, after resolving the local time using the explicit IANA
timezone, evaluate the complete symmetric interval in elapsed minutes around
the resolved instant (not by independently adding wall-clock minutes across a
daylight-saving transition). If the center local time is ambiguous or
nonexistent, require an explicit disambiguation policy; do not guess an
offset. If the interval crosses a calendar or astronomical boundary, return a
method-defined ambiguous/partial result with warnings only if that method
supports such output; otherwise return `INSUFFICIENT_INPUT`. Never choose a
boundary side silently.

## `GET /api/systems`

Returns the catalog and implementation availability in this deployment.
Each system lists its known/supported method descriptors. Input requirements
belong to each method version, not to the system generally. A catalogued method
can be `NOT_IMPLEMENTED`; this describes deployment status, not historical
validity or accuracy. Proposed values: `NOT_IMPLEMENTED`, `EXPERIMENTAL`,
`AVAILABLE`, `DISABLED`.
Here `supportedMethods` means methods whose descriptors are recognized by the
catalog; use each method version's `implementationStatus` to determine whether
it can execute in this deployment.

```json
{
  "systems": [
    {
      "systemId": "western-tropical",
      "name": "Western Tropical",
      "traditionType": "TRADITIONAL",
      "implementationStatus": "NOT_IMPLEMENTED",
      "supportedMethods": [
        {
          "methodId": "civil-date-table",
          "methodologyVersion": "1.0.0",
          "implementationStatus": "NOT_IMPLEMENTED",
          "requiredInputs": ["dateOfBirth"],
          "optionalInputs": [],
          "precisionRequirements": "Civil-date classification; no instant precision.",
          "calendarConventions": ["Declared Gregorian civil date"],
          "timeZoneRequirements": "None; uses the supplied civil date without timezone conversion.",
          "locationRequirements": "None.",
          "supportedDateRange": {
            "from": "1900-01-01",
            "through": "2100-12-31"
          },
          "limitations": ["Fixed date mapping is not a year-specific solar-ingress calculation."]
        },
        {
          "methodId": "geocentric-solar-longitude",
          "methodologyVersion": "1.0.0",
          "implementationStatus": "NOT_IMPLEMENTED",
          "requiredInputs": ["dateOfBirth", "timeOfBirth", "timeZone"],
          "optionalInputs": ["timeAccuracy", "timeUncertaintyMinutes"],
          "precisionRequirements": "Instant/interval precision and ephemeris error must be declared for the selected release.",
          "calendarConventions": ["Declared Gregorian civil date and time"],
          "timeZoneRequirements": "Explicit IANA timezone required to resolve local birth time; never inferred.",
          "locationRequirements": "None for geocentric solar longitude; explicit coordinates required only for a separately defined topocentric method.",
          "supportedDateRange": {
            "from": "1800-01-01",
            "through": "2200-12-31"
          },
          "limitations": ["Method is a proposed descriptor example; actual ephemeris, range, and precision require approval."]
        }
      ],
      "summary": "Illustrates distinct civil-date and astronomical methods; neither is currently enabled."
    }
  ],
  "catalogVersion": "1"
}
```

The endpoint should list all 12 system IDs from
[`system-methodology-matrix.md`](./system-methodology-matrix.md), including
systems not currently calculated by the backend. Every catalogued method
version must declare all fields shown above. The example's date ranges and
method IDs are contract illustrations, not approved production methods.
Do not expose a method as `AVAILABLE` merely because the browser has a local
approximation. A system-level implementation status is only a summary; the
method version's status controls whether that selection can execute.

## `GET /api/systems/{systemId}`

Returns one system descriptor and its method-version descriptors, each with
its own inputs, conventions, supported range, implementation status, and
limitations.

```json
{
  "systemId": "vedic-jyotish",
  "name": "Vedic / Jyotish",
  "traditionType": "TRADITIONAL",
  "implementationStatus": "NOT_IMPLEMENTED",
  "supportedMethods": [
    {
      "methodId": "solar-rashi",
      "methodologyVersion": "1.0.0",
      "implementationStatus": "NOT_IMPLEMENTED",
      "requiredInputs": ["dateOfBirth", "timeOfBirth", "timeZone"],
      "optionalInputs": ["timeAccuracy", "timeUncertaintyMinutes"],
      "precisionRequirements": "Instant/interval precision adequate to resolve the selected sidereal solar-longitude boundary.",
      "calendarConventions": ["Declared Gregorian civil input", "Ayanamsa and sidereal coordinate convention must be fixed by this method version."],
      "timeZoneRequirements": "Explicit IANA timezone required for local birth time; no inferred or default timezone.",
      "locationRequirements": "None for geocentric solar sign.",
      "supportedDateRange": {
        "from": "1900-01-01",
        "through": "2100-12-31"
      },
      "limitations": [
        "Ayanamsa, ephemeris, coordinate frame, and time scale remain unresolved.",
        "The browser implementation uses fixed Gregorian ranges and is not an astronomical Jyotish calculation."
      ],
      "sources": []
    },
    {
      "methodId": "full-chart",
      "methodologyVersion": "1.0.0",
      "implementationStatus": "NOT_IMPLEMENTED",
      "requiredInputs": ["dateOfBirth", "timeOfBirth", "timeZone", "birthplace.latitude", "birthplace.longitude"],
      "optionalInputs": ["birthplace.elevationMeters", "timeAccuracy", "timeUncertaintyMinutes"],
      "precisionRequirements": "Birth-time and coordinate precision must be sufficient for the declared chart/house method.",
      "calendarConventions": ["All chart settings and ayanamsa must be declared by this method version."],
      "timeZoneRequirements": "Explicit IANA timezone required to resolve local birth time; no inferred or default timezone.",
      "locationRequirements": "Explicit coordinates required; a birthplace label is not geocoded.",
      "supportedDateRange": {
        "from": "1900-01-01",
        "through": "2100-12-31"
      },
      "limitations": ["No Jyotish chart settings or calculation implementation are selected."],
      "sources": []
    }
  ],
  "summary": "The example methods have different input requirements and are not currently enabled."
}
```

Use `404 Not Found` for an unknown `systemId`; a known but unimplemented
system returns `200` with its method descriptors and implementation statuses.
Do not select a default method or version on behalf of the caller.

## `POST /api/calculations`

The caller requests one or more explicit system/method/version selections. The
server validates common profile syntax once, then evaluates each selected
method version independently.

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
    "timeAccuracy": "APPROXIMATE",
    "timeUncertaintyMinutes": 10
  },
  "calculations": [
    {
      "systemId": "western-tropical",
      "methodId": "geocentric-solar-longitude",
      "methodologyVersion": "1.0.0"
    },
    {
      "systemId": "vedic-jyotish",
      "methodId": "solar-rashi",
      "methodologyVersion": "1.0.0"
    }
  ]
}
```

Response (illustrative future deployment; it assumes the Western method
descriptor is `AVAILABLE`, unlike the current proposed initial catalog status
above. Result values and methods are not implemented in this repository):

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
  "requestedCalculations": [
    {
      "systemId": "western-tropical",
      "methodId": "geocentric-solar-longitude",
      "methodologyVersion": "1.0.0"
    },
    {
      "systemId": "vedic-jyotish",
      "methodId": "solar-rashi",
      "methodologyVersion": "1.0.0"
    }
  ],
  "results": [
    {
      "systemId": "western-tropical",
      "methodId": "geocentric-solar-longitude",
      "methodologyVersion": "1.0.0",
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
        "methodId": "geocentric-solar-longitude",
        "methodologyVersion": "1.0.0",
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
      "methodId": "solar-rashi",
      "methodologyVersion": "1.0.0",
      "status": "UNSUPPORTED",
      "completeness": "NONE",
      "classification": null,
      "methodology": null,
      "warnings": [],
      "limitations": ["No enabled server calculator."]
    }
  ]
}
```

The illustrative successful value is not a claim about the existing app; real
implementations must replace it with independently verified output. Do not
expose unnecessary personal information in `birthInputSummary`: no birthplace
label or coordinates, time string, or profile ID is returned by default.

Require a non-empty `calculations` array, unique selections, and a documented
maximum request size. Require
each entry to contain one unique `{systemId, methodId,
methodologyVersion}` selection and preserve selection order in `results`.
Never silently choose a materially different method, the latest version, or a
default version. Unknown system/method/version combinations are top-level
`400` validation errors. A known, catalogued method version that is
`NOT_IMPLEMENTED` or `DISABLED` returns an individual `UNSUPPORTED` result.
If a selected method requires missing time, timezone, or coordinates, return
`200` with that result's `INSUFFICIENT_INPUT`. A syntactically valid common
profile that violates a selected method's domain constraints (including its
supported date range) returns per-method `INVALID_INPUT`. An unexpected
system-specific exception is isolated as `CALCULATION_ERROR`, while other
methods can complete.

## Status semantics

`status` values: `SUCCESS`, `INSUFFICIENT_INPUT`, `UNSUPPORTED`,
`INVALID_INPUT`, `CALCULATION_ERROR`. `completeness` values: `COMPLETE`,
`PARTIAL`, `NONE`. A success result may be partial only if the method
explicitly defines a useful partial result and reports warnings. For all
non-success statuses, `classification` is `null` and completeness is `NONE`.
Every result echoes the selected `systemId`, `methodId`, and
`methodologyVersion`; never return a fallback sign as success.

The top-level system `implementationStatus` summarizes deployment support.
The selected method-version descriptor also has its own
`implementationStatus`; that per-method value controls dispatch. Neither
status is a calculation result status. A selected `NOT_IMPLEMENTED` or
`DISABLED` method produces per-result `UNSUPPORTED`, not an HTTP error.

**Top-level HTTP 400** applies to malformed JSON; invalid/missing required
common fields; impossible ISO dates; malformed time; invalid IANA timezone
IDs or ambiguous/nonexistent local times without disambiguation; invalid
coordinate ranges; `APPROXIMATE` without an integer uncertainty in `1..1440`;
`APPROXIMATE` when no `timeOfBirth` is supplied; a non-`UNKNOWN`
`timeAccuracy` when no time is supplied; uncertainty supplied for
`EXACT`/`UNKNOWN`; empty/duplicate selections; and unknown
system/method/version combinations. These failures prevent reliable dispatch
or make the request/profile invalid independently of any one calculator.

**Per-result `INVALID_INPUT`** applies only after common request/profile
validation succeeds, when a selected method rejects an otherwise well-formed
value under its own domain constraints—for example, its declared supported
date range or method-specific calendar convention. Missing method-required
fields are `INSUFFICIENT_INPUT`, not `INVALID_INPUT`. A known but unimplemented
method is `UNSUPPORTED`; a runtime defect is `CALCULATION_ERROR`.

An unknown resource ID on `GET /systems/{systemId}` is `404`. Unexpected
API-level failures use `500`. Per-method calculation failures are results,
not top-level failures, unless the request itself cannot be parsed or
validated.

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
