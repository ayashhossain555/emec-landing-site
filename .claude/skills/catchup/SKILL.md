---
name: catchup
description: Catch up at the start of a session — read the progress log, recent git history and working-tree state, then summarize where the EMEC landing site work stands and what to do next. Use when the user says "catchup", "where were we", or starts a new session.
---

# Catchup

Rebuild context for this repo quickly, without re-reading the whole codebase.

1. Read `PROGRESS.md` at the repo root (and skim `CLAUDE.md` if this is your first session). Focus on the most recent session entry and the **Next up** / **Open questions** lists. If the file is missing, say so and continue.
2. Run `git log --oneline -15` and `git status --short` to see what changed since the last logged session (commits after the last entry's date, plus uncommitted work).
3. If uncommitted changes exist, skim `git diff --stat` and only open files whose purpose isn't obvious from the log.
4. Report to the user in under ~15 lines:
   - **Last session:** date + one-line summary
   - **Since then:** commits / uncommitted changes not covered by the log
   - **Next up:** the top 1–3 items from the log
   - **Blockers / open questions:** anything waiting on the user (e.g. design re-imports, missing assets, content decisions)
5. Ask which item to start on only if the next step is genuinely ambiguous; otherwise propose the first item and proceed when the user agrees.

Do not edit `PROGRESS.md` during catchup — that is `/wrap`'s job.
