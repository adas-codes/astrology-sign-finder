# M1.3 Research Source Register

**Access date for sources consulted in this milestone:** 2026-11-03, unless a
specific research note says otherwise. “Not stated” means the consulted source
did not display a publication date; it is not an inferred date.

The register records the evidence used by the methodology notes, not a blanket
endorsement of every source's interpretation. A source may be authoritative
for its own tables or software claims without establishing universal cultural
or historical agreement.

## Western Tropical Geocentric Sun Sign

| Source | Publisher / institution | Publication date | Claim supported | Conflicts, limits, and access notes |
|---|---|---|---|---|
| [Horizons System](https://ssd.jpl.nasa.gov/horizons/) | NASA Jet Propulsion Laboratory, Solar System Dynamics Group | Not stated on the consulted landing page | JPL's planetary ephemeris service; reference data for the test vectors | Service output is an oracle/reference, not a production library commitment. Record query parameters and archive responses for reproducibility. |
| [Horizons API documentation](https://ssd-api.jpl.nasa.gov/doc/horizons.html) | NASA/JPL Solar System Dynamics Group | Version 1.3, June 2025 (as displayed by the consulted documentation) | API parameters, observer ephemerides, time and quantity options used to reproduce the Sun longitude samples | `TIME_TYPE='UT'` and quantity definitions must be preserved with each fixture; distinguish the service's time-tag semantics by epoch. |
| [Converting Between Julian Dates and Gregorian Calendar Dates](https://aa.usno.navy.mil/faq/JD_formula) | United States Naval Observatory | Source formula cited as the 1990 *Almanac for Computers*; web page publication date not stated | Julian Date's continuous day count from Greenwich mean noon and the UT1-based example/conversion formula | The page's conversion formula is limited to stated date ranges and is not an ephemeris-accuracy statement. The binary64 spacing estimate in the Western research note is independently derived from IEEE 754 representation at the stated JD magnitude. |
| [2024 geocentric apparent-Sun query](https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND='10'&OBJ_DATA='NO'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'&CENTER='500@399'&START_TIME='2024-01-15%2000:00'&STOP_TIME='2025-01-01%2000:00'&STEP_SIZE='30%20d'&QUANTITIES='31'&TIME_TYPE='UT'&CAL_TYPE='GREGORIAN') | NASA/JPL Horizons API | Generated response; accessed 2026-11-03 | Monthly 2024 apparent ecliptic longitude samples, DE441 source label, and the sampled classifications in the Western research note | The query is reproducible but the API is mutable; archive its full text response and checksum before using as a permanent release fixture. The separate one-minute ingress sweep and leap-day query should also be archived with their exact requests. |
| [The JPL Planetary and Lunar Ephemerides DE440 and DE441](https://doi.org/10.3847/1538-3881/abd414) | *The Astronomical Journal*, American Astronomical Society | Published online 2021-02-08; print issue 2021-03-01 | Description and evaluation of JPL DE440/DE441 ephemerides; the paper states DE441 covers a longer interval but is less accurate than DE440 for the current century | The ephemeris paper does not by itself establish the exact apparent-place options returned by a specific Horizons request. |
| [Swiss Ephemeris documentation and licensing](https://www.astro.com/swisseph/swephinfo_e.htm) | Astrodienst AG | Not stated on the consulted page | Swiss Ephemeris capabilities, data/model options, and dual AGPL/professional licensing requiring a product decision | Accuracy and licensing statements in the research note are vendor documentation claims; review the exact release and license text before adoption. |
| [Astronomy Engine repository](https://github.com/cosinekitty/astronomy) and [MIT license](https://raw.githubusercontent.com/cosinekitty/astronomy/master/LICENSE) | Don Cross / Astronomy Engine upstream project | Repository release date is version-specific; page consulted 2026-11-03 | Project-supported languages, bundled model approach, stated accuracy, Kotlin/JVM option, and license | Accuracy is an upstream-stated target, not an independent guarantee. Pin an immutable release/commit and validate apparent/geometric conventions against independent references. |
| [NOVAS: Naval Observatory Vector Astrometry Software](https://aa.usno.navy.mil/software/novas_info) | United States Naval Observatory | Not stated on the consulted page | NOVAS as an independent astrometric calculation/reference implementation | It is not a single drop-in Java ephemeris dependency; confirm exact release, licensing and data provider. |
| [IAU Standards of Fundamental Astronomy (SOFA)](https://www.iausofa.org/) | International Astronomical Union, SOFA Board | Release-specific | SOFA's stated purpose as an authoritative set of algorithms and procedures implementing standard models in fundamental astronomy | The consulted landing page does not itself establish the license terms. Review the license and notices distributed with the exact release before adoption. |

### Western research gaps

- The JPL test requests and full responses must be preserved as immutable
  fixtures; a live API URL alone is not a durable golden test artifact.
- The retrieved ingress sweep brackets the 2024 Aries crossing but does not
  establish an exact transition instant. Do not label an interpolated crossing
  as a reference value.
- Production library selection remains conditional on boundary accuracy,
  licensing, Java/JVM packaging, date range and model/convention comparisons.
- The 1900 and 2100 proposed range endpoints remain unverified golden cases in
  the Western research note.
- The consulted JPL response's apparent-place flags and reference-frame
  definition must be matched by any production library before claiming
  like-for-like output.

## Chinese Zodiac Year Animal

| Source | Publisher / institution | Publication date | Claim supported | Conflicts, limits, and access notes |
|---|---|---|---|---|
| [The Chinese Agricultural Calendar (Nongli)](https://www.hko.gov.hk/en/gts/time/calendarinfo.htm) | Hong Kong Observatory (HKO), Government of the Hong Kong Special Administrative Region | Not stated on the consulted page | HKO's description of the lunisolar calendar and the relationship between lunar months and solar terms | This describes HKO's calendar reference; it does not establish that every region/community uses an identical convention. |
| [Gregorian-Lunar Calendar Conversion Tables](https://www.hko.gov.hk/en/gts/time/conversion.htm) | Hong Kong Observatory | Not stated on the consulted page; annual records are separately listed | HKO's available conversion-table coverage, including 1901–2100, and table-use notes | HKO warns that calculated new-moon/solar-term times decades ahead may be uncertain by minutes and may differ by one civil day near midnight. |
| [24 Solar Terms](https://www.hko.gov.hk/en/gts/time/24solarterms.htm) | Hong Kong Observatory | Not stated on the consulted page | HKO's explanation of the 24 solar terms and calendar context | A solar-term boundary is not interchangeable with the first day of the first lunar month. |
| [HKO Gregorian-lunar conversion table, 1901](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T1901e.txt) | Hong Kong Observatory | Table for 1901; publication date not stated | Table marks 1901-02-19 as the first day of the first lunar month; annual heading identifies the year as Ox | Use the published table convention; don't infer an exact local new-moon instant. |
| [HKO Gregorian-lunar conversion table, 2100](https://www.hko.gov.hk/en/gts/time/calendar/text/files/T2100e.txt) | Hong Kong Observatory | Table for 2100; publication date not stated | Table marks 2100-02-09 as the first day of the first lunar month; annual heading identifies the year as Monkey | Future table calculations carry HKO's stated minute/day-boundary caveat. |
| [HKO annual tables, 2014–2025](https://www.hko.gov.hk/en/gts/time/conversion.htm) | Hong Kong Observatory | Individual table years 2014–2025; publication dates not stated | Gregorian boundary dates and annual animal headings used by the 12-animal test cases; each year is a separate text table linked from the HKO conversion page | The Chinese research note links each annual text table directly. Preserve the individual files as fixtures. |

### Chinese calendar research gaps

- The accessible evidence is strongest for HKO's own modern conversion tables
  and annual animal labels. Obtain scholarly/authoritative Chinese-language
  evidence for the full branch-to-animal mapping and regional naming
  differences before public release.
- Archive the full 2023 HKO table for the repeated second-month test; the
  consulted text table repeats the `2nd Lunar Month` label rather than
  explicitly labelling the second occurrence “leap.”
- The date-only convention intentionally follows HKO's published Gregorian
  date. Exact instant/local-zone behavior needs a separately named method and
  evidence.
- Historical calendar conversions before 1901, regional calendars, and
  competing local boundary practices are outside the evidence reviewed here.

## Mayan Tzolk'in

Research and source metadata to be added with the Mayan methodology report.
The correlation choice, archaeological evidence, independent validation
sources, and test-vector derivations are not yet approved by this register.

## Citation and reproducibility policy

Each method report must link a claim to the exact source record(s) that
support it. A citation to a source does not validate unrelated claims on the
same page. Dynamic calendars and astronomical APIs should be archived with
their exact request, response, retrieval date, and checksum before becoming
release fixtures. When sources disagree or are inaccessible, preserve the
disagreement or research gap instead of presenting a synthetic consensus.
