# Non-qualifying production-candidate attempt

This folder records a discarded diagnostic sequence on candidate source commit `86505817683af00cdecf312d6ca73b2ed1a7fb52` and image digest `sha256:4683dc97c38db8d3ff0e37a954eb09391f873f636dfc6a95e29df9781d806114`.

- Run 01 passed 28/28 with retries=0, but it was not part of the final proof sequence.
- Run 02 passed 26/28. The breakpoint test exposed that the browser may blur a hidden trigger before dispatching the media-query listener; the test therefore did not observe focus transferred to the active desktop route. The same run hit one Chromium `net::ERR_NO_BUFFER_SPACE` navigating to `/technology`.
- The focus handling was corrected in `a665a7dd74992d4109a19ef4bb88de3a7761309a`; the targeted breakpoint test then passed 10/10 local repetitions, and the final candidate passed three consecutive full 28/28 suites.
- The Chromium buffer error did not recur in that final sequence. A post-failure host snapshot showed 44 total TCP `TIME_WAIT` entries and 7 to port 3002 while the candidate stayed healthy; no persistent socket exhaustion was observed.

These runs are retained for audit context and are excluded from `candidate-performance-variance.json`'s final three-run result set. The review-corrected sequence was later superseded by the final proof set at `verified-after-final-review-corrections/run-01` through `run-03`; those are the qualifying receipts.

The captured Playwright logs were normalized only to remove trailing whitespace for repository diff hygiene; test lines and reported outcomes are unchanged.
