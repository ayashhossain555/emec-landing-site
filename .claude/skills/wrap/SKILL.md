---
name: wrap
description: Wrap up a work session — append a dated entry to PROGRESS.md recording what was done, decisions made, and what's next, then optionally commit. Use when the user says "wrap", "wrap up", "end session", or "log progress".
---

# Wrap

Record this session so the next `/catchup` can resume cleanly.

1. Gather facts (don't guess):
   - `git status --short` and `git diff --stat` for uncommitted work
   - `git log --oneline` for commits made this session (since the last entry's date in `PROGRESS.md`)
   - What was discussed/decided in this conversation
2. Prepend a new entry directly under the `## Sessions` heading in `PROGRESS.md` (newest first), using today's date in absolute form:

   ```markdown
   ### YYYY-MM-DD — <short title>
   **Done**
   - <concrete change, with file paths>
   **Decisions**
   - <decision> — <why>
   **Next up**
   - [ ] <next task>
   **Open questions**
   - <anything blocked on the user>
   ```

   Omit empty sections. Keep each bullet to one line. Carry forward unfinished **Next up** items from the previous entry unless they were completed or dropped (say which).
3. If the session changed facts or copy, check that `knowledge/` still agrees, and record any new client questions under **Open questions**. Also update the top-level **Status** line in `PROGRESS.md` if the overall state changed.
4. Show the user the new entry. Ask before committing; if they agree, commit `PROGRESS.md` together with any related work they want included (branch first if on `main` and the user prefers branches).
