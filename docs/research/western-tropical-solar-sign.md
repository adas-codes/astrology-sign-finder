# Research: Western Tropical Geocentric Sun Sign

## Decision

**READY_WITH_LIMITATIONS** for an M1.4/M1.5 implementation spike, not yet
production-ready. The astronomical observable and sign partition can be
specified reproducibly, and JPL Horizons provides an independent reference
service with a compatible apparent ecliptic-of-date output. The production
library/binding, permitted software license, fixed v1.0 date range, and
near-boundary result policy still require approval.

Proposed identity:

- `systemId`: `western-tropical`
- `methodId`: `western-tropical-solar-sign`
- `methodologyVersion`: `1.0.0`
- Classification: tropical solar sign from geocentric **apparent** ecliptic
  longitude.

This is a calculation of an astronomical longitude followed by a conventional
30-degree partition. It does not validate astrological interpretation or
personality claims.

## Method definition

### Coordinate and sign convention

1. Compute the apparent geocentric direction from Earth's center to the
   apparent center of the Sun at the requested instant.
2. Express ecliptic longitude in the ecliptic/equinox-of-date convention used
   by the selected ephemeris implementation. For the reference corpus below,
   this is JPL Horizons `ObsEcLon`: observer-centered **IAU 1976/1980
   ecliptic-of-date** longitude, with light time, solar gravitational
   deflection, and stellar aberration.
3. Normalize longitude to `[0°, 360°)`. Divide the tropical circle into
   twelve equal 30-degree intervals:

   | Longitude interval | Result |
   |---|---|
   | `[0°, 30°)` | Aries |
   | `[30°, 60°)` | Taurus |
   | `[60°, 90°)` | Gemini |
   | `[90°, 120°)` | Cancer |
   | `[120°, 150°)` | Leo |
   | `[150°, 180°)` | Virgo |
   | `[180°, 210°)` | Libra |
   | `[210°, 240°)` | Scorpio |
   | `[240°, 270°)` | Sagittarius |
   | `[270°, 300°)` | Capricorn |
   | `[300°, 330°)` | Aquarius |
   | `[330°, 360°)` | Pisces |

   The boundaries are half-open: a resolved longitude of exactly 30° belongs
   to Taurus; exactly 0° (normalized from 360°) belongs to Aries. Do not use
   annual fixed Gregorian dates.

### Apparent versus geometric

The chosen observable is **apparent**, not a geometric/astrometric vector.
“Apparent” must be pinned to the implementation's correction model. For the
reference corpus, Horizons explicitly applies light-time, gravitational
deflection, and stellar aberration. A production library may not match every
correction by default; record its flags and compare like-for-like. Do not
silently compare an apparent longitude with a geometric longitude and call
them the same result.

### Reference plane/equinox

This method uses the tropical zodiac: twelve equal arcs measured from the
vernal-equinoctial zero point, expressed as ecliptic longitude of date. It is
not IAU constellation membership and not a sidereal zodiac. “Ecliptic of date”
is model-dependent; the v1.0 descriptor must pin the named precession/nutation
and ecliptic convention and library flags. The sample oracle uses Horizons'
stated IAU76/80 ecliptic-of-date convention, not a claim that IAU76/80 is the
only valid modern convention.

### Time scales and conversion

- API input is local civil birth date/time plus an explicit IANA timezone.
- Resolve local time to an instant using the pinned time-zone database. Then
  convert through the library's supported scale pipeline (normally UTC to TT
  and/or TDB for ephemeris evaluation; UT1/Earth orientation may be needed by
  some apparent-place transforms).
- For Horizons output after 1962, its time tags are UTC; prior to 1962 the
  service reports UT1. The test corpus is modern and uses `TIME_TYPE='UT'`,
  whose returned 2024 time is UTC per Horizons' own output notes.
- UTC is a civil time scale; it is not TT/TDB. Store the time scale at every
  conversion boundary. Pin leap-second data, ΔT/UT1 model, time-zone database
  release, and conversion library/version in reproducibility metadata.

### Input semantics

Method-version requirements proposed for the API catalog:

- Required: `dateOfBirth`, `timeOfBirth`, `timeZone`.
- `timeZone` must be an explicit IANA zone; do not infer it from birthplace
  text or substitute UTC/server timezone.
- No birthplace or coordinates are required for a **geocentric** solar
  longitude. If an implementation accepts coordinates, it must ignore them
  for this method or reject an accidental topocentric configuration.
- `EXACT`: use the supplied time resolution (API accepts minute/second
  precision) without adding a user uncertainty interval. “Exact” does not
  eliminate recorded-time, time-zone database, ephemeris, model, or
  floating-point error.
- `APPROXIMATE`: require the API's bounded `timeUncertaintyMinutes`; evaluate
  the complete symmetric elapsed-time interval around the resolved instant.
  If the interval stays within one sign and the method's numerical error bound
  also stays within that sign, return that sign. For v1.0, if the interval
  crosses a boundary, return `INSUFFICIENT_INPUT` rather than choosing a
  side. A future contract can add an explicit possible-classifications shape.
- `UNKNOWN`, missing time, or missing timezone: return per-method
  `INSUFFICIENT_INPUT`. Do not interpret a date-only value as midnight, noon,
  UTC, or a full UTC day. A separately specified civil-date approximation
  would be a different `methodId`.
- A local time in a daylight-saving gap is invalid. A repeated local time
  during a rollback has two possible instants; until the API supports an
  explicit offset/fold selector, reject it as top-level request validation
  error rather than choosing an offset.

### Numerical precision and boundary policy

Use double precision or better for the instant and longitude path, but do not
decide a sign from a rounded display value. Near a Julian Date of 2.46 million,
the spacing between adjacent IEEE 754 binary64 values is about 40 microseconds
(rounding error up to about 20 microseconds). That representation resolution
does not imply the ephemeris or time-scale conversion is accurate to that
level.

Each library must expose or document an angular/time error budget. The Sun
moves about a degree per day, so a longitude uncertainty near one arcminute
corresponds to roughly a minute and a half in boundary time. If the computed
longitude plus the declared numerical/model error interval straddles a
30-degree boundary, do not force a classification. Return a qualified partial
result with the possible adjacent classifications only if the response
contract supports it; otherwise return `INSUFFICIENT_INPUT` for an
unresolvable boundary. The v1.0 conservative behavior above uses
`INSUFFICIENT_INPUT`.

### Provisional supported input date range

Propose `1900-01-01` through `2100-12-31` as a product/API acceptance range for
v1.0, **not** as an ephemeris coverage claim. The selected engine and time
conversion pipeline must be independently verified at both endpoints before
this range is committed. Outside it, return per-method `INVALID_INPUT`.
Historical local timezone data and UTC/UT1 reconstruction can be weak even
when the astronomical ephemeris itself covers the date. If this evidence is
not completed, narrow the range rather than claiming unsupported precision.

## Ephemeris/library evaluation

| Candidate | Accuracy/data | License and commercial use | Java/runtime/deployment | Assessment |
|---|---|---|---|---|
| **Swiss Ephemeris** | Astrodienst documents compressed JPL DE431/DE441-derived data with a claimed 0.001 arcsecond reproduction precision, optional original JPL data, and an internal Moshier model with different range/precision. These are vendor claims and configurations must be pinned; auto-fallback between data sources is unacceptable for reproducibility. | Dual-licensed AGPL or Swiss Ephemeris Professional License. AGPL has source-availability obligations, including the whole project under AGPL or compatible terms per Astrodienst; commercial deployment requires the paid/professional contract. Obtain legal approval before selection. | Core is C, not Java-native. Java needs a reviewed JNI/JNA binding or separately maintained wrapper, native artifacts for each deployment target, and explicit ephemeris file packaging/configuration. Full precision commonly needs data files; Moshier fallback exists but must not be silently selected. Pin core, wrapper, data and flags. | Strongest astrology-oriented precision/configurability candidate; technically suitable if native packaging and business licensing are approved. Not selected yet. |
| **Astronomy Engine** | Upstream states approximately ±1 arcminute accuracy, based on truncated VSOP87 series and NOVAS-derived methods; it reports cross-checking against NOVAS, JPL Horizons and other references. It claims millennia-scale dates and no external dependencies/data files. Treat the ±1 arcminute as the maintainer's stated target and verify its apparent/geometric conventions and boundary behavior for this method. | MIT license, subject to retaining copyright/license text. Generally permissive for commercial use; verify the exact release license. | Upstream provides a Kotlin implementation, not a Java API specifically. Kotlin/JVM classes can be callable from Java, but verify interop, packaging, version and supported JVM. Generated coefficient tables are bundled in code; no separate ephemeris files according to upstream. Small self-contained runtime; pin artifact/commit and test its convention flags. | Best low-deployment-friction candidate if ±1 arcminute is acceptable and the near-boundary ambiguity policy is honored. A one-arcminute model budget can make a result around the ingress indeterminate. |
| **JPL Horizons as oracle** | JPL states it uses current solar-system data, commonly the data used for JPL radar astronomy, mission planning and navigation. The returned 2024 sample identifies DE441 and provides the precise apparent-place definition used above. | Public JPL service; service API terms/availability and rate limits must be reviewed before production use. This is not a distributable embedded library. | Remote API, network/service dependency, response latency and service availability; unsuitable as an unexamined synchronous calculation dependency. No local ephemeris files for tests, but tests must archive parameters and expected outputs. | Recommended independent reference/test oracle, not the production calculator by default. |
| **USNO NOVAS / SOFA** | USNO NOVAS and IAU SOFA implement recognized astrometric/fundamental-astronomy algorithms; the final accuracy depends on the ephemeris/provider and transformations selected. They are useful for cross-checks and standards-based transformations. | NOVAS and SOFA have separate license notices; review the exact releases. SOFA's license requires preservation of notices and imposes restrictions on endorsement/use of names; do not infer terms from a third-party wrapper. | Official implementations are principally C/Fortran, not drop-in Java libraries. Expect JNI/JNA/native or a maintained Java port and provider integration. SOFA is algorithm code, not a packaged modern planetary ephemeris. | Credible independent transformation/reference stack, but not the simplest single Java dependency for this product. |

### Recommendation

Use **JPL Horizons as an offline/reference test oracle**. Do not call it from
the production request path by default.

For production, choose **Astronomy Engine Kotlin/JVM conditionally** if the
product accepts its stated ±1 arcminute target and exposes ambiguous results
around boundaries; it minimizes external files and license obligations. If
product requirements demand tighter reproducible boundary timing, choose
**Swiss Ephemeris conditionally** only after legal approval of AGPL versus
professional license and a maintained Java/native packaging plan. No
unconditional library selection is defensible until these choices are made.

## Independent reference test corpus

### Reference query

The longitude values below were retrieved from the **NASA/JPL Horizons API**
using the Sun (`COMMAND=10`), geocentric Earth center (`CENTER=500@399`),
observer ephemeris, quantity 31, `TIME_TYPE=UT`, Gregorian dates. The response
identifies source `DE441` and defines `ObsEcLon` as apparent
observer-centered IAU76/80 ecliptic-of-date longitude including light time,
gravitational deflection, and stellar aberration. Accessed 2026-11-03.

Reproducible monthly sample request:

```text
https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND='10'&OBJ_DATA='NO'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'&CENTER='500@399'&START_TIME='2024-01-15%2000:00'&STOP_TIME='2025-01-01%2000:00'&STEP_SIZE='30%20d'&QUANTITIES='31'&TIME_TYPE='UT'&CAL_TYPE='GREGORIAN'
```

In this table, expected classification is calculated from the JPL-returned
longitude with the half-open 30-degree partition above. This is an independent
oracle result, not a value produced by the future implementation.

| # | UTC input instant | JPL apparent ecliptic longitude | Expected classification | Supporting evidence |
|---:|---|---:|---|---|
| 1 | 2024-01-15 00:00 | 294.3092435° | Capricorn | Monthly Horizons query, source DE441. |
| 2 | 2024-02-14 00:00 | 324.7730170° | Aquarius | Monthly Horizons query, source DE441. |
| 3 | 2024-02-29 00:00 | 339.8856571° | Pisces | Separate Horizons query; leap-day check, source DE441. |
| 4 | 2024-03-15 00:00 | 354.8956187° | Pisces | Monthly Horizons query, source DE441. |
| 5 | 2024-04-14 00:00 | 24.5389381° | Aries | Monthly Horizons query, source DE441. |
| 6 | 2024-05-14 00:00 | 53.6978113° | Taurus | Monthly Horizons query, source DE441. |
| 7 | 2024-06-13 00:00 | 82.4876514° | Gemini | Monthly Horizons query, source DE441. |
| 8 | 2024-07-13 00:00 | 111.1067556° | Cancer | Monthly Horizons query, source DE441. |
| 9 | 2024-08-12 00:00 | 139.7893814° | Leo | Monthly Horizons query, source DE441. |
| 10 | 2024-09-11 00:00 | 168.7570337° | Virgo | Monthly Horizons query, source DE441. |
| 11 | 2024-10-11 00:00 | 198.1698675° | Libra | Monthly Horizons query, source DE441. |
| 12 | 2024-11-10 00:00 | 228.0823640° | Scorpio | Monthly Horizons query, source DE441. |
| 13 | 2024-12-10 00:00 | 258.4160477° | Sagittarius | Monthly Horizons query, source DE441. |
| 14 | 2024-03-20 03:05 UTC | 359.9990193° | Pisces | Horizons one-minute ingress sweep; before 0° boundary. |
| 15 | 2024-03-20 03:06 UTC | 359.9997093° | Pisces | Horizons one-minute ingress sweep; still below 360°. |
| 16 | 2024-03-20 03:07 UTC | 0.0003992° | Aries | Horizons one-minute ingress sweep; after 0° boundary. |
| 17 | 2024-03-20 03:08 UTC | 0.0010891° | Aries | Horizons one-minute ingress sweep; after boundary. |
| 18 | 2024-03-20 08:36 `Asia/Kolkata` (+05:30) | Same instant as #15: 359.9997093° | Pisces | Time-zone conversion to 03:06 UTC; must match #15 exactly. |
| 19 | 2024-03-19 20:06 `America/Los_Angeles` (PDT, −07:00) | Same instant as #15: 359.9997093° | Pisces | Time-zone conversion to 03:06 UTC; must match #15 exactly. |
| 20 | `2024-03-20T03:06Z`, uncertainty ±2 minutes | Interval spans #14–#17 | `INSUFFICIENT_INPUT` for a single-sign v1.0 result | The interval crosses the Pisces/Aries boundary; derived from the JPL sweep and v1.0 conservative status policy. |
| 21 | 2024-03-20, no time | No instant/longitude | `INSUFFICIENT_INPUT` | Method input requirement; no midnight/UTC default. |
| 22 | 2024-03-20 03:06, no timezone | No unique instant/longitude | `INSUFFICIENT_INPUT` | Method input requirement; do not infer timezone. |
| 23 | 2024-03-10 02:30 `America/New_York` | No valid local instant (DST gap) | Top-level `400` validation error | IANA-zone resolution test; no classification. |
| 24 | 2024-11-03 01:30 `America/New_York`, no offset/fold selector | Two possible instants | Top-level `400` validation error | IANA-zone ambiguity test; no classification. |
| 25 | 1899-12-31 with a valid time and zone | Outside proposed method range | Per-result `INVALID_INPUT` | Proposed `1900-01-01` lower product bound. |
| 26 | 1900-01-01 with a valid time and zone | Ephemeris result must be computed and independently checked before release | Conditional; not yet a golden expected sign | Range-boundary test is required; reliable archived JPL output for this case is not included in the retrieved corpus. |
| 27 | 2100-12-31 with a valid time and zone | Ephemeris result must be computed and independently checked before release | Conditional; not yet a golden expected sign | Range-boundary test is required; reliable archived JPL output for this case is not included in the retrieved corpus. |
| 28 | 2101-01-01 with a valid time and zone | Outside proposed method range | Per-result `INVALID_INPUT` | Proposed `2100-12-31` upper product bound. |

Cases 26–27 are deliberately marked **not yet golden** rather than supplying
unverified expected signs. The range endpoints must be queried from an
independent ephemeris and checked against the selected local engine before
v1.0 is declared ready. The reference request can be repeated with a
single-element `TLIST`, `QUANTITIES='31'`, and `TIME_TYPE='UT'`; archive the
complete response, request, and source-data/version metadata with the eventual
test fixture.

The minute-resolution sweep proves Pisces at 03:06 and Aries at 03:07; it does
not claim the exact crossing time. A release test should refine the crossing
with smaller time steps and an independently defined root-solving procedure,
then verify immediately-before / at / immediately-after behavior. Until that
is archived, the four one-minute samples are the only exact-near-boundary
golden cases in this report.

## Reproducibility record

Every result should record:

- `systemId`, `methodId`, `methodologyVersion`, calculator version.
- Original local date/time and IANA zone (in a protected calculation context,
  not logs or default response summaries), resolved UTC instant, timezone
  database release, and time-scale conversion implementation/release.
- Ephemeris name/release/source files and checksum, apparent-place flags,
  reference frame/equinox, precession/nutation model, angular precision and
  error budget.
- For approximate input, the full resolved instant interval and the boundary
  policy applied.

## Research gaps before release

- Confirm product license compatibility and pick an ephemeris/JVM binding.
- Pin the coordinate corrections exactly across production and oracle paths.
- Decide and verify the v1.0 supported-date range; the proposed 1900–2100
  product range is not yet a demonstrated accuracy guarantee.
- Add independently sourced root times for all twelve sign transitions and
  archive full API responses. The corpus currently refines the Aries ingress
  only.
- Confirm how the API will encode repeated local wall times (explicit offset
  or fold selector) and whether a future partial result may expose multiple
  possible signs.
- Add endpoint expected signs from the chosen local engine and independent
  ephemeris before claiming range coverage.

## Sources

See [`source-register.md`](./source-register.md) for full publisher/title,
URL, dates/accessed dates, claim coverage, and access limitations.
