# Definition of Done

## GEF bootstrap increment

The increment is complete for review when:

1. The correct repository and base SHA are recorded and the branch starts from main without destructive synchronization.
2. Node.js >=22, npm, Git, and available GitHub CLI identity/capabilities are recorded.
3. Only @gef-bootstrap/cli@1.1.2 is a direct GEF dependency, fixed exactly in the manifest and lockfile.
4. The required version, help, preview, apply, doctor, and status commands have recorded outputs; preview precedes apply.
5. The canonical governance documents and Source Pack index are present, internally consistent, and identify unvalidated or unknown state explicitly.
6. Relevant checks pass or every failure/capability gap is stated with evidence; no HIGH or CRITICAL finding is known.
7. A commit is pushed to gef/bootstrap-v1.1.2 and a PR against main is open.
8. The PR remains unmerged.

## Website product increments

Product-specific completion criteria are NOT_DEFINED and must be admitted in a future product Work Order.
