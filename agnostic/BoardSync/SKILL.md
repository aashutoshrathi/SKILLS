---
name: BoardSync
description: Sync local todo items with current Linear and GitHub status.
---

# BoardSync

**Purpose:** Fetch the current status for all tracked tickets and auto-update your todo lists if they are resolved.

## First-Time Setup
On the very first execution, ask the user for their configuration preferences and save them locally (e.g., in `.agent-skills.json` or your persistent memory):
1. **Ticket Prefix:** What is the prefix for your issue tracker (e.g., `PROJ-`)?
2. **Issue Tracker:** Which issue tracker are you using (e.g., Linear, Jira)?

## What It Does

1. **Scans current tasks:** Reads your current todo list for any ticket references (e.g., PROJ-100).
2. **Queries Issue Tracker:** Fetches current status of each ticket from your issue tracker (like Linear).
3. **Cross-checks with GitHub:** Verifies PR status (merged, open, draft) for the linked tickets.
4. **Compares and Syncs:**
   - If ticket is marked "Done", marks the local todo item as completed.
   - If ticket is in QA or Review, flags it for verification.
   - If ticket is marked Done but the PR is not merged, warns about the data mismatch.
5. **Updates your list:** Automatically overwrites your todo list with the refreshed statuses.
6. **Outputs a changelog:** Summarizes what changed so you stay aware.

## Execution Steps

- Retrieve all ticket IDs mentioned in the user's current workspace or notes.
- Use the issue tracker CLI/API (e.g., Linear) to bulk fetch statuses.
- Use `gh pr list` or search to check linked PR statuses.
- Diff the changes and update the corresponding markdown or text files.

## Output Format

```markdown
🔄 SYNCING TICKET STATUS...

- **PROJ-100**: Marked Done (PR #402 Merged). Updated in notes.
- **PROJ-105**: Moved to QA. Needs verification.
- **PROJ-110**: WARNING - Marked Done but PR is still open!
```
