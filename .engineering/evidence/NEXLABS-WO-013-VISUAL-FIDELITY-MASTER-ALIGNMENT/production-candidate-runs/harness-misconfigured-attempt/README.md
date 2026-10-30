Harness preflight only; not counted as a production-candidate result.
The internal performance test opens the endpoint derived from E2E_PORT. The first diagnostic attempt left that variable at its default 3100 while the candidate listened on 3002, so it ended with ECONNREFUSED before the full suite finished. The result is retained for transparency.
All three counted runs were then executed back-to-back against the same image digest with E2E_PORT=3002, NEXLABS_RELEASE_PORT=3002, 1 worker and retries=0. Each completed all 27 tests and met the unchanged Home mobile LCP budget.
