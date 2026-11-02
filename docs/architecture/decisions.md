# Architecture decisions and open questions

## Decisions for the next milestone

These are recommended defaults for implementation planning, not existing
runtime behavior.

| ID | Decision | Rationale |
|---|---|---|
| A-01 | Use a modular monolith in the existing Spring Boot application. Do not split by tradition into services. | One deployable unit is sufficient; module boundaries still isolate methods and allow independent tests. |
| A-02 | Keep Birth Profile, Calculation, Knowledge, and API responsibilities distinct. | Prevent interpretation content from becoming calculation logic and prevent transport concerns from leaking into domain rules. |
| A-03 | Register one independent calculator per system/method, behind a common contract. | A new system should not require orchestration changes or depend on another tradition's algorithm. |
| A-04 | Use explicit statuses and a separate completeness field. Never use a default sign when no range matches. | The prototype's fallback hides missing coverage; status and completeness expose real uncertainty and partial results. |
| A-05 | Require ISO date in API and use explicit IANA timezone for instant-sensitive calculations. No implicit midnight/noon, server zone, geocoding, or coordinates. | Prevents server-local behavior and false precision. |
| A-06 | Version methodology independently from calculator software and knowledge content. | Reproducibility requires identifying assumptions and data, not merely an application version. |
| A-07 | Do not persist anonymous birth profiles/calculations by default. Curated catalog and knowledge may be persisted or versioned static data. | Birth date/time/place are sensitive personal data; calculation is cheap to recompute and no account feature exists yet. |
| A-08 | Do not select an ephemeris library until required methods, precision, supported historical range, licensing and packaging are approved. | Swiss Ephemeris is dual-licensed (AGPL or commercial terms); Astronomy Engine is MIT but has distinct model/precision tradeoffs. |
| A-09 | Ship the 12 current entries as known catalog entries, but initially mark all backend calculators `NOT_IMPLEMENTED`. | Current browser formulas are not backend support and some are demonstrably incomplete or methodologically unspecified. |
| A-10 | Separate historical/traditional methods from modern popular reconstructions in system metadata and user-facing language. | Prevents modern date tables from acquiring unsupported historical authority. |

## Open decisions before implementation

1. **Product scope and first release:** Which systems are in the first
   production slice? A credible thin slice should prefer a small number of
   sourced, testable methods over exposing all 12 as equally reliable.
2. **Western calculation definition:** Is the initial result just geocentric
   Sun sign, or a full chart? Which coordinate frame, apparent/mean longitude,
   ephemeris, and date-only ambiguity UX are required?
3. **Vedic/Jyotish settings:** Which school and ayanamsa are supported? Is the
   first deliverable only solar rashi or a chart? Which location and house
   conventions apply?
4. **Meaning of “True Sidereal”:** Does the product mean a 12-part sidereal
   zodiac, or actual IAU constellation membership? These are distinct
   computations and should likely have different method IDs and user labels.
5. **Chinese Zodiac boundary:** Use Lunar New Year or a solar-term boundary
   for this product? Which regional calendar source and historic coverage?
6. **BaZi rules:** Which school governs solar-term month/year changes,
   Li Chun, hour pillars, day boundary, and apparent solar time?
7. **Tibetan method:** Which Tibetan calendar tradition/source and conversion
   tables are in scope? How are repeated/omitted dates, intercalations, and
   local boundaries handled?
8. **Mayan and Aztec/Mexica conversion:** Which independently sourced
   correlation constants, naming conventions, proleptic calendar and day
   boundary are accepted? Who reviews cultural/historical claims?
9. **Native Earth category:** Should the generic current entry be removed,
   replaced by a specific sourced/community-reviewed interpretation, or kept
   visible as unsupported? Do not resolve this by inventing a universal
   mapping.
10. **Celtic Tree and Egyptian Decan:** Are these explicitly modern
    reconstructions/interpretations, or is a specific historically grounded
    scholarly method intended? What source and license supports mappings and
    content?
11. **Burmese scope:** Is the intent Mahabote, weekday animals, or another
    Burmese zodiac form? Choose one or expose them as separate methods.
12. **Place resolution:** Will users provide coordinates, select from an
    offline gazetteer, or use an external geocoder? If geocoding is used,
    choose provider, privacy/retention policy, ambiguity UX, and licensing.
    No provider should be silently called from the calculation endpoint.
13. **Persistence and user features:** Is there a near-term saved profile or
    account feature? If yes, define consent, ownership, encryption,
    retention/deletion, and export before storing birth details.
14. **Library decision:** Does product licensing permit AGPL obligations, or
    is a paid Swiss Ephemeris license acceptable? Is Astronomy Engine's stated
    accuracy appropriate for chosen boundary cases? Verify JVM integration,
    data files, deployment, release pinning, and reference test results.
15. **API evolution:** Is this public API expected to be versioned in the URL,
    headers, or schema compatibility policy? What request size/rate limits
    apply to batch calculations?

## Suggested implementation sequence

### M1.3 — Resolve methods and contract

- Answer the method/scope questions above for a small first slice.
- Publish stable system IDs, descriptors, input requirements, statuses,
  methodology IDs, and error semantics.
- Decide which catalog content is versioned seed data versus PostgreSQL-managed
  knowledge.
- Define privacy and retention policy before accepting real birthplace data.

### M1.4 — Modular foundation

- Add package/module boundaries for profile, calculation, knowledge, and API in
  the current application, preserving the modular monolith.
- Add contract types and registry, validation, status mapping, and test
  fixtures; do not add one giant switch or fallback.
- Seed descriptors as `NOT_IMPLEMENTED`; add API contract tests for unknown
  IDs, missing inputs, unsupported systems, partial results, and errors.
- Do not create profile/result persistence unless the product decision requires
  it.

### M1.5 — First calculation vertical slice

- Implement one well-scoped system with a frozen method version and verified
  references. Prefer a date-only calendar method only if its calendar source
  and correlation are resolved; otherwise choose a precisely specified
  Western solar calculation.
- Add boundary, leap-year, timezone, invalid-input, and reproducibility tests.
- Compare astronomical results to independent references when applicable.
- Mark the system `AVAILABLE` only when its input/limitation metadata and
  test/source evidence ship with it.

### M1.6 — Knowledge and frontend integration

- Populate curated system and classification knowledge with source records,
  attribution, and content versions, separate from calculator outputs.
- Adapt the frontend to send ISO date and render returned statuses,
  completeness, warnings and limitations. Keep legacy local calculations
  clearly separated until API results replace them.
- Add end-to-end tests across client, API, and calculator boundary.

### Later — User-owned saved profiles

- Only after explicit product approval, add user consent, authentication,
  authorization, retention/deletion, and persistence for profiles/results.
- Preserve the exact calculation/methodology snapshot needed for reproducible
  saved results; avoid default anonymous calculation history.

## External calculation library notes

- Swiss Ephemeris documents high-precision planetary positions and a Julian
  day/time-scale workflow, but is offered under AGPL or a Professional License.
  The license decision can affect the whole application and public service;
  obtain legal/product approval before dependency adoption.
  [Official overview/licensing](https://www.astro.com/swisseph/swephinfo_e.htm)
- Astronomy Engine documents solar-system positions/events and an approximately
  ±1 arcminute target, with an MIT license. It may be a lower-friction option
  for some astronomy requirements, but must be evaluated against the actual
  boundary precision and historical range required. Its upstream repository
  includes Kotlin support; verify JVM integration and current release.
  [Project](https://github.com/cosinekitty/astronomy)
  · [MIT license](https://raw.githubusercontent.com/cosinekitty/astronomy/master/LICENSE)
- Neither library resolves historical calendar conventions, correlations,
  culturally grounded system definitions, or interpretation content.

## Known repository baseline

- Existing backend files live under `backend/src/main/java/com/astrology`.
  The only API route is `GET /api/health`. Spring Web, Actuator, Data JPA,
  Validation, PostgreSQL and Flyway are configured; the sole migration creates
  the `astrology` schema.
- Existing DTO/error handling and CORS are a foundation, not a calculation
  contract. Entity/repository packages contain only package declarations.
- Existing backend tests cover health response and configured CORS only.
- Current browser calculations live in root `script.js`, require date-only
  input, and are not called by the backend. The styles and result cards are in
  root `style.css` and `index.html`.
- The existing README documents local startup and explicitly says the
  frontend is independent and frontend-only calculations are informational.
