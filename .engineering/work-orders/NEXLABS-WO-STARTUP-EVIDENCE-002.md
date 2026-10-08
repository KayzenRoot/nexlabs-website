# NEXLABS-WO-STARTUP-EVIDENCE-002
Status: IMPLEMENTATION CANDIDATE, pending CI and live audit.
Risk: STANDARD (new public static evidence), no auth or sensitive data.
Context Lock: exact published production 28159c9b916af9a532f7e68f48b445edb065cb23.
Owner direction 2026-10-08: maximize truthful evidence and crawl readability for future startup program reapplication.
Sources: Anthropic Startups official FAQ, Anthropic crawler help article, public HIVE README and release v1.0.2; prior site checkpoint and D-0029/0030.
Scope: /engineering plain semantic server-rendered proof of HIVE version, architecture and limits, planned Claude use visibly distinguished from existing integration; internal links, sitemap route 14, plain /llms.txt navigation aid, tests.
Bot policy: Existing production User-agent:* Allow:/ covers ClaudeBot, Claude-User, Claude-SearchBot; explicit bot allow has no documented extra benefit. No bot cloaking, WAF bypass, aggressive crawler lures.
Out of scope: main redesign, final WO-013 visual PR merge, new CNPJ/legal incorporation, fabricated users, clients, testimonials, paid API use, automatic reapplication or unexplained funding claims.
Acceptance: unit/lint/typecheck/build/full e2e, script-blocked server-readable /engineering, existing pages and noindex previews, production index/follow and 14 URL sitemap, Sonar/Socket gate and live smoke.
STOP: new application NOT submitted. Only production release after gates; full visual PR #20 remains independent.
