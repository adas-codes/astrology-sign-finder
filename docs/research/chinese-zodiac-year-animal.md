# Research: Chinese Zodiac Year Animal

## Decision

**READY_WITH_LIMITATIONS** for an initial date-only implementation using the
named Hong Kong Observatory (HKO) Gregorian-lunar conversion-table convention,
limited to dates covered by HKO's published 1901–2100 tables. This decision
does not validate other regional/calendar conventions or full Chinese
astrological systems. It is not a BaZi calculation.

Proposed identity:

- `systemId`: `chinese-zodiac`
- `methodId`: `chinese-zodiac-year-animal`
- `methodologyVersion`: `1.0.0`
- Calendar boundary: Gregorian civil date of the first day of the first lunar
  month in the selected HKO annual conversion table.

## Method definition

### Calendar basis

HKO describes the traditional Agricultural Calendar (`Nongli`) as an
integrated lunar-solar calendar. Lunar months begin at new moon; the tropical
year and synodic months are both involved. Since twelve synodic months are
shorter than the tropical year, leap months keep the calendar aligned with
seasons. HKO describes the rule that a lunar month without a major solar term
is a leap month of the preceding month. Its 24 solar terms divide the ecliptic
into 24 equal 15-degree positions; the major solar terms are tied to the
twelve Earthly Branches.

For this method, “Chinese New Year” means the start of the first lunar month
in the selected HKO Gregorian-lunar table. The calculation does not compute a
new moon or solar term itself: it consumes HKO's published date conversion
data. The method is a calendar-date lookup, not an astronomical ephemeris
calculation.

### Animal cycle and mapping

The twelve Earthly Branches are conventionally paired with a repeating
twelve-animal sequence. HKO's successive annual table headers independently
identify the cycle labels and Gregorian-lunar conversions (for example 2023
Rabbit, 2024 Dragon, 2025 Snake; see the linked annual tables in the source
register). Common English animal translations vary—HKO uses “Mouse” for the
first animal in its 2020 table; other English references often use “Rat.”
The normalized display label should be a Knowledge-domain localization choice,
while the branch/animal identifier remains stable.

| Branch | Animal identifier | Common English label |
|---|---|---|
| 子 (`zi`) | `rat` | Rat / Mouse |
| 丑 (`chou`) | `ox` | Ox |
| 寅 (`yin`) | `tiger` | Tiger |
| 卯 (`mao`) | `rabbit` | Rabbit |
| 辰 (`chen`) | `dragon` | Dragon |
| 巳 (`si`) | `snake` | Snake |
| 午 (`wu`) | `horse` | Horse |
| 未 (`wei`) | `goat` | Goat / Sheep |
| 申 (`shen`) | `monkey` | Monkey |
| 酉 (`you`) | `rooster` | Rooster |
| 戌 (`xu`) | `dog` | Dog |
| 亥 (`hai`) | `pig` | Pig |

This table states the standard 12-position cycle; before implementation, bind
the branch names and translations to the curated source record and retain
source-specific aliases.

### Explicit date-only semantics

`chinese-zodiac-year-animal` consumes `dateOfBirth` as a Gregorian civil date
and compares it to the HKO table's Gregorian date for the first day of the
first lunar month. It needs no birth time, timezone, birthplace, or
coordinates. It must not convert the input date to an instant or use the
server's timezone.

This is an explicit date-convention method: a user-provided civil date is
compared with HKO's published calendar date. It does **not** claim to identify
the exact instant of the new moon in the user's birthplace timezone. A future
instant-based variant would be a different `methodId`, would require a local
time and explicit IANA timezone, and would resolve the actual new-year
boundary instant under a separately named calendar convention.

### Boundary and coverage behavior

- Dates before the first lunar month in a Gregorian year use the prior lunar
  year's animal; the first lunar-month date and later dates use the new
  animal.
- The boundary is date-inclusive: the HKO date labelled “1st Lunar Month” is
  the first civil date of the new animal under this method.
- Leap months do not independently change the year animal; the same animal
  applies throughout that lunar year.
- Proposed supported input range: `1901-01-01` through `2100-12-31`, using
  HKO's published conversion tables. Values outside the range are
  per-result `INVALID_INPUT`, not extrapolated by a modulo year cycle.
- A method-specific catalog descriptor must identify the HKO dataset edition,
  table checksum/release, and the calendar convention. HKO notes that
  computed new-moon/solar-term times decades ahead may be uncertain by a few
  minutes, with a possible one-day table discrepancy when events are close to
  midnight. Preserve that qualification for future years.

The HKO date tables and boundaries are an authoritative, reproducible source
for this *named implementation convention*. They do not prove that every
Chinese community or historical period uses exactly the same new-year
boundary.

## Keep distinct from other systems

- **Chinese Zodiac Year Animal:** One annual animal label from the selected
  lunar-year boundary. It is the only result in this method.
- **BaZi Four Pillars:** A chart of year, month, day, and hour pillars under a
  named school and its own time/day-boundary rules. It requires more inputs
  and is not implemented by this method.
- **BaZi year pillar using Li Chun:** Some BaZi methods define the year pillar
  transition at Li Chun (Spring Commences), a solar term. That boundary is
  not Chinese New Year. If supported, define a separate method ID and
  methodology version with its own inputs/conventions.
- **Full Chinese astrological chart:** Includes additional pillars/structures
  and method settings; not equivalent to this year-animal lookup.

Do not expose a “boundary” setting that silently toggles between Chinese New
Year and Li Chun within one version.

## Independent test corpus

Expected outputs below are read from HKO's Gregorian-lunar conversion tables:
the `1st Lunar Month` date provides the boundary; the annual header identifies
the animal. All date-only cases require no timezone. Accessed 2026-11-03.

| # | Gregorian input date | Expected animal | Test purpose | Source |
|---:|---|---|---|---|
| 1 | 2014-01-31 | Horse | New-year boundary date; first lunar month | [HKO 2014 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2014e.txt) |
| 2 | 2015-02-19 | Goat | Boundary and next animal | [HKO 2015 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2015e.txt) |
| 3 | 2016-02-08 | Monkey | Boundary and next animal | [HKO 2016 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2016e.txt) |
| 4 | 2017-01-28 | Rooster | Boundary and next animal | [HKO 2017 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2017e.txt) |
| 5 | 2018-02-16 | Dog | Boundary and next animal | [HKO 2018 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2018e.txt) |
| 6 | 2019-02-05 | Pig | Boundary and next animal | [HKO 2019 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2019e.txt) |
| 7 | 2020-01-25 | Rat / HKO “Mouse” | Boundary and translation alias | [HKO 2020 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2020e.txt) |
| 8 | 2021-02-12 | Ox | Boundary and next animal | [HKO 2021 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2021e.txt) |
| 9 | 2022-02-01 | Tiger | Boundary and next animal | [HKO 2022 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2022e.txt) |
| 10 | 2023-01-22 | Rabbit | Boundary and next animal | [HKO 2023 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2023e.txt) |
| 11 | 2024-02-10 | Dragon | Boundary and next animal | [HKO 2024 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2024e.txt) |
| 12 | 2025-01-29 | Snake | Boundary and next animal | [HKO 2025 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2025e.txt) |
| 13 | 2024-02-09 | Rabbit | Day before 2024 boundary | [HKO 2024 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2024e.txt) |
| 14 | 2024-02-11 | Dragon | Day after 2024 boundary | [HKO 2024 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2024e.txt) |
| 15 | 2023-01-21 | Tiger | Day before 2023 boundary | [HKO 2023 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2023e.txt) |
| 16 | 2023-01-23 | Rabbit | Day after 2023 boundary | [HKO 2023 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2023e.txt) |
| 17 | 2025-01-28 | Dragon | Day before 2025 boundary | [HKO 2025 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2025e.txt) |
| 18 | 2025-01-30 | Snake | Day after 2025 boundary | [HKO 2025 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2025e.txt) |
| 19 | 2023-03-22 | Rabbit | Date in the repeated second-lunar-month period; animal does not change | [HKO 2023 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2023e.txt), which labels this date `2nd Lunar Month` after the earlier second-month period |
| 20 | 2024-02-29 | Dragon | Valid Gregorian leap day after new year | [HKO 2024 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2024e.txt) |
| 21 | 1901-02-19 | Ox | Lower supported year; first lunar month | [HKO 1901 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T1901e.txt) |
| 22 | 2100-12-31 | Monkey | Upper supported year, after new year | [HKO 2100 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2100e.txt) |
| 23 | 1900-12-31 | `INVALID_INPUT` | Before supported range | Method descriptor's proposed range; no extrapolation |
| 24 | 2101-01-01 | `INVALID_INPUT` | After supported range | Method descriptor's proposed range; no extrapolation |
| 25 | 2023-02-29 | Top-level HTTP 400 | Impossible Gregorian date | ISO/Gregorian input validation; no classification |
| 26 | 1901-01-01 | Rat / Mouse | Inclusive lower supported date; before the 1901 first-lunar-month boundary | [HKO 1901 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T1901e.txt) for the boundary; HKO 2020 and [2021 table](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2021e.txt) demonstrate the repeating Rat/Mouse-to-Ox succession |

Cases 1–12 cover every animal once. Cases 13–18 exercise both sides of three
new-year boundaries. Case 19 uses the repeated second-lunar-month period
visible in HKO's 2023 table; retain the full table as a fixture because the
text labels both occurrences by month number rather than adding an explicit
“leap” marker. Case 25 is a request/profile error, not a per-method
`INVALID_INPUT`, because the Gregorian date itself is impossible.

For a complete release fixture, archive the annual source text and calculate
all dates in each table by the explicit civil-date boundary rule; the selected
tests above are a focused minimum corpus, not a substitute for full-year
coverage and non-regression checks.

## Research gaps and limitations

- HKO tables provide a clear modern source and 1901–2100 coverage; older
  historical calendar conversion needs another specialist source and
  convention review.
- HKO warns of minute-scale uncertainty and possible one-day differences in
  years ahead when new moons/solar terms are close to midnight. Date-only
  results should carry a source/table caveat for future years.
- HKO annual English names differ (“Mouse” versus “Rat”; “Goat” versus
  “Sheep”). Select canonical IDs and translations through Knowledge metadata.
- A date-only HKO convention does not resolve an exact new-moon instant at a
  birthplace. If product semantics require local civil birth-time
  interpretation, specify a separate instant-based method.
- Independently verify the 12 animal/branch mapping with a scholarly or
  authoritative Chinese-language source before public release; current
  accessible HKO evidence reviewed here is strongest for annual animal names
  and lunar-calendar boundaries, not all regional translation practices.
- Archive the full 2023 HKO table and preserve the repeated-month evidence;
  the text format does not add a separate “leap” marker to the repeated month
  label.
- Do not infer this method's results from the existing browser's
  `getChineseAnimal` fallback table; it is unverified and only has explicit
  new-year dates for 2020–2052.

## Sources

See [`source-register.md`](./source-register.md) for complete citation
metadata, access dates, supported claims, and access gaps.
