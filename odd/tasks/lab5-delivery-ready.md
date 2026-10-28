# Lab 5 delivery readiness
Objective: prepare the complete local submission package and presentation evidence for Lab 5.
Branch: `chore/lab5-delivery-ready` | Delivery: `ask-on-risk` | Runner: Mocha, Playwright, and the local harness | Forecast: under 400 authored lines.

## Specs

S1. The requested outcome is: “empieza entonces, deja todo listo ya, hasta las capturas guardalas en las carpetas del proyecto y crar el txt con lo que debe llevar adentro”.

S2. Store standalone JPG evidence files inside the project for script injection, unit tests, integration tests, Playwright E2E tests, and the Snyk scan.

S3. Create `repositorio.txt` containing the repository URL required by the assignment.

S4. Stabilize and verify the unit, integration, E2E, and harness checks before generating final evidence.

S5. Make the harness locally ready for publication: conventional commit messages, no AI attribution, three isolated requirement branches, persistent evidence, and a combined verification command. Remote push and PR creation remain pending explicit authorization.

S6. Keep generated reports and transient test output out of version control while preserving source tests, Playwright configuration, OpenSpec assets, the harness, and presentation assets.

S7. The final package must follow the assignment instruction not to upload Word or PDF files; the local deliverables are JPG evidence files and `repositorio.txt`.

## Tasks

- T1 — S4 — inline — complete — RED: integration setup timed out on the first run; GREEN: 3 consecutive integration runs passed, 25 unit tests passed, and 3 Playwright tests passed.
- T2 — S2, S3, S7 — inline — complete — five standalone JPG files created under `evidencias/`; `repositorio.txt` contains the GitHub repository URL.
- T3 — S5 — inline — pending — harness publication and combined-verification readiness.
- T4 — S6 — inline — pending — repository hygiene, full verification, and final local package audit.

## Log

L1. “empieza entonces, deja todo listo ya, hasta las capturas guardalas en las carpetas del proyecto y crar el txt con lo que debe llevar adentro”

L2. Initial audit: the Word document contains evidence 1–4 and Snyk screenshots, but no standalone JPG files exist. `repositorio.txt` is missing. The integration suite failed once with a 2-second setup timeout and passed on rerun. The local branch was two commits ahead of the local `origin/main` reference, with 21 untracked paths. The three requirement commits contained Copilot co-author trailers and non-conventional messages. Remote publishing is not authorized in the request.

L3. Engram mirror pending because the workspace has no configured Engram project key.

L4. Stabilized the integration setup with a 10-second hook timeout. Verification observed three consecutive integration passes, 25 passing unit tests, and 3 passing Playwright tests.

L5. Created `evidencias/evidencia-1-inyeccion.jpg` through `evidencia-5-snyk.jpg`. Browser-rendered evidence uses a 1600×900 viewport; the original injection capture is preserved at 955×971. Created `repositorio.txt` with the required GitHub URL.
