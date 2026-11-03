# System methodology and implementation matrix

## Reading this matrix

All 12 systems are currently represented in the browser UI and `script.js`.
None has a backend calculation module. Browser output is not treated as an
accuracy oracle. “Date-only viable” means a narrowly specified date-based
classification can be calculated from the civil date once its calendar and
method are chosen; it does not mean the existing calculation is historically
or astronomically validated.

“Traditional,” “historical,” and “modern reconstruction” are descriptive
categories, not judgments that all communities used one method. Each method
version must identify the source, region/school, calendar convention,
conversion/correlation, and any uncertainty. Do not merge systems because
they share a 12-year animal cycle or similar labels.

## Existing implementation snapshot

The browser UI requires a `DD/MM/YYYY` string. It validates Gregorian field
round-tripping, creates a local JavaScript `Date` at noon, and computes all
cards synchronously. A common helper compares month/day against inclusive
fixed ranges, including year-wrapping ranges; if no range matches it returns
the first entry. This fallback can manufacture a plausible but invalid result.
Other functions use hard-coded year cycles or a day count. No location, birth
time, timezone, selected school, or boundary convention is collected.

The frontend cards provide symbols and interpretive prose alongside
classifications. Those should become Knowledge-domain content with distinct
source/provenance metadata, not be used as evidence for calculation validity.

## Method-level descriptors and method IDs

The rows below describe system families, not one universal method per system.
Each system may publish multiple method descriptors. Unless identified as an
M1.3 researched method below, the `methodId` examples remain candidates for
design discussion, not approved methods. Research approval does not mean a
backend calculator is implemented or available. A descriptor is specific to one immutable
`methodologyVersion` and must state its own required/optional inputs,
precision requirements, calendar conventions, timezone and
location/coordinate requirements, supported date range, implementation
status, and known limitations. Do not place one set of requirements on the
system when its methods differ.

The `systemId` identifies the tradition, `methodId` selects a distinct
calculation approach within it, and `methodologyVersion` pins immutable rules
and configuration. Requests select all three; the server must not silently
select a default method or the latest version. Candidate methods may be omitted
from the catalog until their methodology and sources are approved.

| System ID | Researched or candidate `methodId` variants | Input distinctions that belong in each method descriptor |
|---|---|---|
| `western-tropical` | `western-tropical-solar-sign` (geocentric apparent solar longitude; v1.0.0 researched); a separate chart method if scoped later | The researched solar-sign method needs date, time and explicit IANA timezone; no location for geocentric longitude. It has a provisional 1900–2100 product range and returns insufficient input without a defensible instant interval. |
| `vedic-jyotish` | `solar-rashi`; `full-chart` | Each pins the ayanamsa and chart settings. Solar rashi needs instant/timezone for precise ingress; full chart requires explicit time, timezone and coordinates. |
| `true-sidereal` | `equal-sign-sidereal`; `iau-constellation-membership` | Distinguish equal 30-degree signs from constellation boundaries. The latter pins a boundary catalog/epoch and target body; both declare time-scale/frame, and topocentric claims require location. |
| `chinese-zodiac` | `chinese-zodiac-year-animal` (HKO published lunar-new-year civil-date convention; v1.0.0 researched); a separate Li Chun method only after research | The researched method consumes the civil date directly, uses the HKO Gregorian-lunar tables for 1901–2100, and requires no timezone. It is not a BaZi year-pillar method. |
| `bazi` | `four-pillars-solar-terms`; other school-specific names only after research | Pin solar-term source, year/month transition, hour/day boundary, timezone, and whether local apparent solar time and coordinates are required. |
| `tibetan` | A named calendar/school conversion, not a generic `animal-cycle` | Pin calendar tradition/source, epoch, intercalation and repeated/omitted-date rules, day boundary, and any time/location needs. |
| `mayan-tzolkin` | `tzolkin-{named-correlation}` | Each pins a specifically sourced correlation, calendar convention and day boundary. Date-only is possible only if the selected conversion is defined directly on that civil date. |
| `aztec-tonalpohualli` | `tonalpohualli-{named-correlation}` | Independently research and pin the Mexica correlation, day names, calendar and day boundary; do not borrow the Mayan method ID/settings. |
| `native-earth` | No candidate until nation/community, source, permission and scope are identified | Requirements depend on the specifically reviewed method. Do not expose a generic method based on a pan-Indigenous label. |
| `celtic-tree` | `modern-tree-date-table-{source}`; a separate historical reconstruction only if substantiated | The modern mapping needs a civil date and explicit source/reconstruction label. Historical methods must declare era, calendar, source and limitations. |
| `egyptian-decan` | `modern-birthday-mapping-{source}`; a separate era-specific observational reconstruction | The modern mapping may use civil date only. Historical star/visibility reconstruction may require era, location/horizon, calendar and time. |
| `burmese-mahabote` | `mahabote-{named-school}`; weekday-animal zodiac as a separate system/method | Pin Myanmar calendar conversion, weekday/year rules, day boundary and school; do not implement it as a generic Chinese animal-year cycle. |

Except for the methods covered by M1.3 research, these examples omit concrete
versions, sources, date-range values, and availability because those remain
unresolved research decisions. The M1.3 method findings and test evidence are
linked in the [`M1.3 research status`](#m13-research-status) section. Every
approved descriptor must fill in, at minimum:

- `requiredInputs` and `optionalInputs`, including conditional time-accuracy
  and coordinate fields.
- `precisionRequirements`, including resolution of time and boundaries;
  `EXACT` user time does not imply infinite precision.
- `calendarConventions`, time-zone policy (including whether timezone is not
  applicable to a genuinely civil-date method), and location/coordinate
  requirements.
- A closed `supportedDateRange`; out-of-range values are not mapped by a
  fallback.
- `implementationStatus`, sources, known limitations, and immutable
  `methodologyVersion`.

## System matrix

Date-only support must be declared per method version, not inferred from the
system name:

- **Civil-date calculation:** The method consumes the supplied civil date as
  such, and its convention explicitly does not require a timezone. It must not
  convert the date to an instant or consult the server timezone.
- **Astronomical calculation:** The method needs an instant or a bounded
  interval of instants. A local time requires an explicit timezone. Without
  the data needed to form that interval, return `INSUFFICIENT_INPUT`; never
  substitute UTC, server timezone, or inferred place timezone.
- **Qualified partial calculation:** A method may calculate when some
  optional detail is absent only if its descriptor defines the supported
  interval/precision and the result communicates incompleteness. For example,
  a whole-day astronomical interval can return a classification only when all
  possible instants map to it, or when the method explicitly returns an
  ambiguity set.
- **Insufficient input:** Return this when a required input is missing, the
  interval cannot be formed under the declared convention, or uncertainty
  crosses a boundary that the method cannot represent.

For `timeAccuracy: APPROXIMATE`, the API requires `timeUncertaintyMinutes`
from 1 through 1440 inclusive. The method evaluates the full symmetric
uncertainty interval in elapsed minutes around the instant resolved using the
explicit timezone. If it crosses a calendar/astronomical boundary, the method
must represent that ambiguity as a qualified partial result or return
`INSUFFICIENT_INPUT`; it must not choose one side. `EXACT` is not unlimited
precision, and `UNKNOWN` time gives no usable instant interval.

| System | Method-specific inputs and precision requirements | Calendar/method and boundary requirements | Current browser behavior and limitations | Date-only viable? / external library? | Recommended tests |
|---|---|---|---|---|---|
| **Western Tropical** (`western-tropical`) | `western-tropical-solar-sign` v1.0.0 requires civil date, local time, and explicit IANA timezone. Birthplace/coordinates are not required for geocentric longitude. Approximate time requires bounded uncertainty; exact is not unlimited precision. | Geocentric apparent solar ecliptic longitude of date; half-open 30-degree tropical sign intervals. Resolve local time and declared time scales explicitly. Proposed product range 1900-01-01–2100-12-31 is unverified at endpoints. | Fixed Gregorian month/day intervals only. It cannot resolve year-varying ingress dates or exact-time boundaries; no time/location. Returns first sign on unmatched ranges. | No: date-only `western-tropical-solar-sign` returns `INSUFFICIENT_INPUT`; a civil-date lookup would be a different method and is not recommended as equivalent. Astronomy library needed; Astronomy Engine is conditional, Swiss Ephemeris conditional on license/packaging, and JPL Horizons is a reference oracle. | Independent JPL comparisons; before/after ingress; 2024 leap day; timezone-equivalent instants; approximate intervals crossing a boundary; error-budget behavior; verify supported-range endpoints before release. |
| **Vedic / Jyotish** (`vedic-jyotish`) | Birth date/time/timezone for precise solar rashi boundary. Location plus time are required for ascendant and many chart computations. The method must name its ayanamsa and chart settings. | Sidereal zodiac with selected ayanamsa (e.g. Lahiri is a possible setting, not a universal default), declared coordinate frame and time scale. Jyotish is a family of practices; do not silently equate one solar-sign calculation with a full Jyotish chart. | Fixed recurring date ranges, with no planetary positions, selected ayanamsa, chart scope, time, zone, or location. Labels and descriptions are generic. | Date-only only as a clearly qualified coarse lookup, not a precise chart result. Astronomy/ephemeris library needed for reproducible boundary computation; it does not decide the tradition's settings. | Ayanamsa-specific reference longitudes; ingress boundary tests; compare same instant across settings; time-zone conversion; date-only ambiguity; location-dependent ascendant tests if added. |
| **True Sidereal / Astronomical** (`true-sidereal`) | Birth time and timezone for precise sky position; location only for topocentric/visibility claims. The system definition must say whether it means sidereal ecliptic signs or IAU constellations. | “True sidereal” is ambiguous. A 12 equal 30-degree sidereal zodiac is not the same as unequal IAU constellation boundaries. For actual constellation membership specify coordinate frame, epoch, official boundary set, precession, and Sun/planet target. | Fixed date ranges plus an Ophiuchus interval overlapping Scorpio/Sagittarius, but first-match array ordering means Ophiuchus is unreachable on overlapping dates. It calls itself astronomical without computing the sky or defining constellation boundaries. | Date-only is not robust at variable astronomical boundaries; whole-day classification might be partial. Astronomy library is required for actual celestial positions; constellation boundaries need a defined boundary dataset/convention. | Test Ophiuchus overlap/unreachability against explicitly chosen intended semantics; actual Sun positions at each boundary; boundary sides, leap-year/date rollover, coordinate-frame tests. |
| **Chinese Zodiac** (`chinese-zodiac`) | `chinese-zodiac-year-animal` v1.0.0 consumes required Gregorian civil date only; time, timezone and location are not used. Supported range is proposed as 1901-01-01–2100-12-31. | HKO table's Gregorian date for the first day of the first lunar month is an inclusive boundary. This is a published-date lookup, not an exact new-moon instant. Leap months do not change the animal. Li Chun year-pillar boundaries are a distinct method. | 12-year animal cycle anchored to 2008 and a hard-coded Chinese New Year table for 2020–2052. Outside it, uses a fixed February 15 approximation. The code names individual dates but its boundary table is not validated here. | Yes, date-only with no timezone under this explicitly named HKO civil-date convention. Use versioned, archived source tables; no astronomy library is required at runtime for lookup. Do not extrapolate outside the published range. | 12 animal boundaries; previous/boundary/next date for multiple years; HKO range endpoints; repeated lunar month; Gregorian leap day; out-of-range and impossible dates; no fallback. |
| **BaZi / Four Pillars** (`bazi`) | Date, time, timezone; birthplace/coordinates may be needed if local apparent solar time is part of the selected school. A full four-pillar result needs a declared hour-pillar and day-boundary rule. | Heavenly stems/earthly branches over year, month, day, and hour. Year/month transitions may use solar terms (including Li Chun/Jieqi), rather than Jan 1 or lunar new year. State school, time scale, conversion and day-boundary convention. | Produces a purported three-part summary from Gregorian year/month/day modular arithmetic. Stem array contains a non-cyclic ordering (Latin values followed by Chinese characters), month/day indexes are simplistic, and no hour pillar is calculated. Its text acknowledges time/timezone are needed for full BaZi. | Date-only can yield only a qualified subset under a declared method, not the full Four Pillars. For solar-term boundaries use astronomy/verified calendar tables; no generic lookup is sufficient. | Validate 60-cycle pairings; year/month solar-term boundaries; day-cycle known references; hour branch boundaries; timezone and local-solar-time policy; leap days; missing hour result completeness. |
| **Tibetan** (`tibetan`) | Civil birth date converted under a named Tibetan calendar tradition. Time/location requirements depend on chosen calendar and day-boundary method; do not presume one universal Tibetan zodiac. | Tibetan calendrical astrology includes distinct calendar/element/animal cycles and regional/school conventions, including intercalary and repeated/omitted dates. Specify calendar source, epoch, conversion and convention. | Uses a simple 12-animal sequence anchored to Gregorian 2008, with Gregorian year alone. It does not calculate Tibetan calendar date, elements, lunar conventions, or year boundary; the current sequence/anchor is not evidenced. | Gregorian date-only can be an input to a supported calendar converter but not enough to decide a tradition-specific result absent its convention. A verified calendar converter/source is necessary; astronomy may be required by a specific method but not automatically. | Known source-calendar conversions; Tibetan new-year transition; repeated/skipped dates; leap/intercalary year cases; year cycle and element pairings; date-only near local transition. |
| **Mayan Tzolk'in** (`mayan-tzolkin`) | Civil date plus explicitly selected calendar conversion and correlation. Birth time/location are not needed for a method defined as a direct civil-day count; if its local-day boundary uses an instant, it must declare timezone/time requirements. | 260-day Tzolk'in combines 20 day names with 13 numbers. Conversion from Gregorian date needs a declared correlation constant, calendar (proleptic/historical), and day-number convention. Competing correlations must remain selectable/versioned. | Converts an integer Julian day number with constant `584283`, then independently computes sign and tone using `floor(day % 20)` and `floor(day % 13)+1`. The selected correlation and indexing are unverified, and the same offset is reused by Aztec code. | Date-only is viable without timezone only when the selected conversion takes the supplied civil date directly and declares its calendar convention. If a local instant boundary is part of the method, timezone is required and never defaulted. Calendar arithmetic is sufficient; astronomy library is not inherently needed. | Verify known calendar round trips and historically sourced anchor dates; every day-name/number transition; negative/ancient dates; leap/calendar reform conversions; correlation alternatives; ensure both cycles advance correctly together. |
| **Aztec / Mexica Tonalpohualli** (`aztec-tonalpohualli`) | Civil date and a separately researched Mexica calendar correlation/conversion. Any local day boundary assumption must be stated. | Distinct 260-day count with 20 signs and 13 numbers. Do not assume the Tzolk'in correlation or sign associations apply unchanged. Select source/epoch, calendar conversion, naming, and day-start rules. | Uses the same `584283` Julian-day offset as Mayan, then the same modular approach, with an Aztec sign-name table. This does not establish a historically correct Aztec correlation or equivalence. | Yes, date-only for a documented conversion and correlation. Calendar arithmetic suffices; no ephemeris required by the day-count alone. | Separate, independent sourced anchor dates; number/sign progression; historical calendar conversion; correlation sensitivity; prove no shared Mayan constants by accidental code reuse. |
| **Native Earth** (`native-earth`) | No meaningful universal input contract until a specific Indigenous nation/community, source, and practice are identified. The current popular animal-date mappings would take only date, but that is not a representative pan-Indigenous method. | There is no single pan-Native American zodiac. Community knowledge, local calendars, and contemporary popular interpretations differ; any implementation needs respectful source review, attribution/permission where appropriate, and scope explicitly named. | A subset of 13 popular animal date ranges (Jan 1–Jun 17); later dates fall back to Wolf. It is presented broadly as “Native American Earth Astrology” without a nation or source. | Date-only only for a named, sourced, authorized interpretation, not for a generalized category. No astronomy dependency can resolve the provenance issue. | Confirm scope and source with qualified/community input; range coverage/non-overlap; test every boundary and unmatched dates; reject a catch-all mapping; content attribution/permission review. |
| **Celtic Tree** (`celtic-tree`) | Civil date for a specified modern interpretation. A historically grounded reconstruction needs source, era, calendar, and linguistic context; no birth time is implied by simple popular tables. | “Celtic tree zodiac” is commonly presented in modern popular sources and should not be passed off as one established ancient Celtic birth-sign system. Identify the exact contemporary reconstruction and its tree/date mapping. | Fixed date ranges for 12 trees. Gaps exist (e.g. Nov 25–Dec 23) and `findSign` silently returns Birch for gaps. Descriptions are unsourced personality interpretations. | Date-only for an explicitly labelled modern date-range interpretation. No astronomy library needed for that fixed lookup; historical claims need source evaluation, not ephemeris. | Full-year coverage audit; each boundary ±1 day; unmatched date returns no result; leap day; source/license and historical-claim review; rendering identifies modern interpretation. |
| **Egyptian Decan** (`egyptian-decan`) | For an ancient observational/calendrical reconstruction: era, location/horizon, calendar date, and often time/night observation context. For a modern birthday mapping: date plus explicit named mapping only. | Ancient decans are star groups/timekeeping structures in changing historical contexts, not inherently the modern 12-month birthday zodiac shown here. State dynasty/era, calendar and observational model before claiming historical output. | Twelve named decan intervals cover Jan 1–May 10 only; no remaining annual entries. Any other date falls back to Isis. Historical associations in prose are not sourced or validated. | Date-only only for an explicitly framed modern lookup. Reconstructing historic visibility/timekeeping may require astronomical models and geographic/epoch data. | Coverage test; all gaps must yield unsupported/no result; compare selected epoch/location observations with cited sources; Gregorian conversion and historical calendar policy; no fallback to first decan. |
| **Burmese Mahabote** (`burmese-mahabote`) | At minimum a date mapped through the explicitly selected Myanmar calendar/weekday convention. Some traditions use birth weekday and may distinguish Wednesday; confirm local day-boundary and interpretation requirements from sources. | Mahabote is a specific Burmese astrological system and should not be equated to a generic Chinese 12-animal year cycle. Define the actual calculation, Myanmar calendar era/conversion, weekday rules, and any school. Keep the separate Burmese weekday-animal zodiac distinct if offered. | Uses a generic 12-animal cycle anchored to 2008, shared structurally with other zodiac tables. It does not calculate Mahabote houses/weekday/year or documented Burmese calendar rules. The name therefore overstates what is calculated. | Date-only may support a clearly specified weekday/year subset once the correct method is sourced; a full interpretation may require additional inputs. Calendar conversion library/verified tables may be needed; astronomy is method-dependent. | Compare sourced reference years/weekdays; Myanmar year conversion and new-year boundaries; Wednesday split if relevant; historical calendar cases; test that this module cannot accidentally reuse the Chinese 12-year animal mapping. |

## M1.3 research status

Research readiness is separate from deployment implementation status. These
decisions select documented methodology candidates only; they do not enable
backend calculations. Both methods remain `NOT_IMPLEMENTED` until their
M1.4/M1.5 implementation and release gates are complete.

| System / method | Methodology version | Research decision | Deployment implementation status | Basis and remaining gate |
|---|---|---|---|---|
| `western-tropical` / `western-tropical-solar-sign` | `1.0.0` | `READY_WITH_LIMITATIONS` | `NOT_IMPLEMENTED` | Geocentric apparent solar longitude, sign partition, time-input rules, and a JPL reference corpus are specified. Production library/license, exact convention matching, boundary error budget, and proposed range endpoints remain unresolved. See [`western-tropical-solar-sign.md`](../research/western-tropical-solar-sign.md). |
| `chinese-zodiac` / `chinese-zodiac-year-animal` | `1.0.0` | `READY_WITH_LIMITATIONS` | `NOT_IMPLEMENTED` | HKO civil-date conversion-table convention and 1901–2100 range have reproducible boundary data. Regional/local-time variants, historical coverage outside that range, and independently reviewed branch/animal knowledge remain out of scope. See [`chinese-zodiac-year-animal.md`](../research/chinese-zodiac-year-animal.md). |

## Research and release gate by tradition

Before calling a result “available,” each module needs:

1. A method record naming the tradition/school or explicitly modern
   reconstruction, source references, version, supported date range, inputs,
   calendar convention, and uncertainty.
2. A documented test corpus with provenance (including at least one source for
   each reference result) and tests for boundaries, leap/calendar edge cases,
   and unsupported inputs.
3. A public descriptor that accurately distinguishes a calculation from its
   separately curated interpretation.
4. Review of culturally sensitive content, naming, attribution, and permission
   where applicable. In particular, do not ship a generalized
   “Native American” method without a named, reviewed scope.

## Current system IDs and implementation state

Proposed stable IDs: `western-tropical`, `vedic-jyotish`, `true-sidereal`,
`chinese-zodiac`, `bazi`, `tibetan`, `mayan-tzolkin`,
`aztec-tonalpohualli`, `native-earth`, `celtic-tree`, `egyptian-decan`, and
`burmese-mahabote`. Initially, every catalogued backend method version should
report `NOT_IMPLEMENTED`; the system-level status is only a summary of its
method statuses. The legacy frontend can remain available while being clearly
labelled as an unverified prototype until its calculations are replaced or
wired to the API.
