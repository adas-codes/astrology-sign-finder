# Vedic birth chart API

## Scope and behavior

The only calculation resource is a Vedic D1 / Rāśi natal chart. The baseline
is Lahiri ayanāṃśa, sidereal geocentric positions, mean lunar node, and
whole-sign houses. The response includes Lagna and the nine grahas with sign,
house, sidereal longitude, nakshatra, and pada. Dasha systems, divisional
charts, interpretations, and other astrological systems are out of scope.

Base path: `/api/v1`. JSON uses UTF-8 and lower camel-case properties. Birth
inputs/results are transient; no endpoint saves them.

## Search for a birthplace

`GET /api/v1/places?query=Pune`

`query` is required and must be 3–120 characters. The configured location
provider is called only after an explicit deployment choice. The current
adapter is Google Maps Platform; it requires `LOCATION_PROVIDER=google-maps`
and `GOOGLE_MAPS_API_KEY`.

```json
{
  "places": [
    { "placeId": "provider-place-id", "label": "Pune, Maharashtra, India" }
  ]
}
```

The client must submit a provider result, not a free-text label or fabricated
coordinates. Search query text is sent to Google Geocoding API. No public
Nominatim endpoint is called.

## Calculate a chart

`POST /api/v1/charts`

```json
{
  "dateOfBirth": "1994-06-15",
  "timeOfBirth": "08:42:00",
  "birthplace": { "placeId": "provider-place-id" }
}
```

All three inputs are required. The date is a valid Gregorian ISO date and the
time is the local wall clock at the birthplace, precise to seconds. The
backend resolves the selected provider place to WGS84 coordinates and asks its
time-zone endpoint for an IANA zone using the birth date (noon UTC). It then
resolves the local wall time to one instant with Java TZDB. Nonexistent or
ambiguous local times during daylight-saving transitions return HTTP 400;
the server never chooses an offset silently. The exact local birth time is not
sent to the location provider.

Example response:

```json
{
  "birthDate": "1994-06-15",
  "birthTime": "08:42:00",
  "birthplace": { "label": "Pune, Maharashtra, India" },
  "method": {
    "chart": "D1 / Rāśi",
    "ayanamsa": "Lahiri",
    "zodiac": "Sidereal",
    "positionFrame": "Geocentric",
    "houseSystem": "Whole sign",
    "lunarNode": "Mean lunar node"
  },
  "lagna": {
    "sign": "Gemini",
    "longitude": 74.12,
    "nakshatra": "Punarvasu",
    "pada": 1
  },
  "houses": [
    { "house": 1, "sign": "Gemini" },
    { "house": 2, "sign": "Cancer" }
  ],
  "points": [
    {
      "name": "Lagna",
      "sign": "Gemini",
      "house": 1,
      "longitude": 74.12,
      "longitudeInSign": 14.12,
      "nakshatra": "Punarvasu",
      "pada": 1,
      "isRetrograde": false
    }
  ]
}
```

The abbreviated `houses` and `points` arrays above are illustrative; actual
responses contain all 12 houses and 10 chart points (Lagna plus nine grahas).
Coordinates and provider-internal data are not returned.

## Errors

Errors use the shared response shape:

```json
{
  "timestamp": "2026-01-01T00:00:00Z",
  "status": 503,
  "error": "Service Unavailable",
  "message": "Swiss Ephemeris is not configured. Set SWISSEPH_EXECUTABLE and SWISSEPH_EPHEMERIS_PATH.",
  "path": "/api/v1/charts"
}
```

| HTTP status | Meaning |
|---|---|
| `400` | Malformed/missing required data, invalid provider search length, invalid coordinates/time zone, future time, or ambiguous/nonexistent local wall time. |
| `503` | Provider or Swiss Ephemeris configuration, availability, data, or calculation failure. |
| `500` | Unexpected server failure; no calculation fallback is returned. |

Error messages do not include provider request URLs, API keys, birth payloads,
or engine output. Search and chart request values are not written to
application logs.

## Privacy and external processing

The operator must disclose provider processing and satisfy current
Google Maps Platform terms, privacy, and billing requirements. Place searches
send the search text to Google Geocoding API. Chart calculation resolves the
selected place ID through Google Geocoding and sends its coordinates plus the
birth date encoded as noon UTC to Google Time Zone API. The exact birth time
and calculated positions are processed locally. The API does not persist any
birth details or chart output.

## Versioning and methodology changes

`/api/v1` freezes this request and result shape. A breaking schema or
methodology change requires a new API version and documentation. The response
labels the chart settings explicitly; the deployment must not silently switch
ayanāṃśa, node, coordinate frame, or house system.
