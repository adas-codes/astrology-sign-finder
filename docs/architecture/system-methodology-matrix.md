# Vedic D1 methodology

## Product scope

This application supports one astrological product: a Vedic natal
D1 / Rāśi chart. Other astrological systems and result types are not
implemented, exposed, or calculated. The initial release intentionally omits
dashas and divisional charts.

## Frozen baseline

| Setting | Rule |
|---|---|
| Chart | D1 / Rāśi natal chart |
| Zodiac | Sidereal |
| Ayanāṃśa | Lahiri / Chitrapaksha, Swiss Ephemeris sidereal mode `1` |
| Positions | Geocentric Swiss Ephemeris longitudes; not topocentric |
| House system | Whole sign, anchored to the sign occupied by the sidereal ascendant |
| Lunar node | Mean lunar node for Rahu; Ketu is 180° opposite mean Rahu |
| Points | Lagna and Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Rahu, Ketu |
| Additional chart data | Sign, whole-sign house, sidereal longitude, nakshatra and pada for each point |
| Deferred | Dashas, divisional charts, interpretations, matching/compatibility, alternate systems |

The official `swetest` executable and matching Swiss Ephemeris data are
runtime requirements. The service selects Swiss Ephemeris (`-eswe`) and
Lahiri sidereal mode (`-sid1`) explicitly. It does not hand-roll planetary
positions. If the engine, output, or ephemeris data are unavailable or outside
the installed data coverage, the API reports a failure rather than returning a
sample or approximate chart.

## Derivation rules

Normalize each engine longitude to `[0°, 360°)`. Let `signIndex` be
`floor(longitude / 30°)`, with Aries indexed zero through Pisces indexed
eleven. If `lagnaSignIndex` is the ascendant's sign index, assign a point's
whole-sign house as:

```text
((pointSignIndex - lagnaSignIndex + 12) mod 12) + 1
```

The 12 houses therefore advance one complete sign at a time; the degree of the
ascendant does not set a house cusp. Nakshatras divide the sidereal zodiac into
27 equal 13°20′ segments starting at 0° Aries. Each segment contains four
equal padas of 3°20′. Boundary points belong to the segment/pada beginning at
that boundary.

Rahu's longitude and speed come from Swiss Ephemeris mean lunar node output.
Ketu is normalized `(Rahu longitude + 180°)` and shares the mean node's
retrograde indicator. A point is retrograde when the engine reports negative
longitude speed; Lagna is not a planet and is not marked retrograde.

## Birth input and time handling

The chart requires a Gregorian birth date, local wall-clock birth time precise
to seconds, and a provider-resolved birthplace. The selected location
provider resolves coordinates and the IANA timezone. The API rejects missing
or invalid inputs, future instants, invalid provider coordinates, DST gaps,
and DST overlaps. It does not substitute UTC, a server timezone, or guessed
coordinates.

The currently configured Google provider uses the birth date at noon UTC to
request the location's time-zone identifier; the exact birth time is resolved
inside the application and is not sent to Google. The operator must disclose
the provider transfer and comply with its current terms/privacy requirements.

Swiss Ephemeris data files establish the actual date coverage. The service
does not claim a wider fixed historical range; production deployments must pin
the engine/data version and validate it against independent fixtures. Reported
time uncertainty is not currently modeled, so Lagna precision depends on the
accuracy of the supplied local time.

## Deployment and license status

The project's selected licensing route is AGPL-3.0-or-later, compatible with
the AGPL option offered for Swiss Ephemeris. No commercial-license assumption
is made. The application does not bundle the engine or data; acquire them from
the official distribution and comply with its applicable notices and AGPL
obligations. Google Maps Platform is a separately configured provider and is
not part of the chart calculation license.

See the [API contract](api-contract.md) and
[calculation engine architecture](calculation-engine.md).
