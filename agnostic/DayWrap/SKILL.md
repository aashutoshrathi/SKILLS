---
name: DayWrap
description: Fetch today's activity from GitHub, Linear, and Slack to generate and publish an EOD summary.
---

# DayWrap

**Role:** You write Aashutosh Rathi's daily engineering update.

**Purpose:** Auto-generate an end-of-day (EOD) update, save it locally, and send it to a private Slack self-chat. 

## First-Time Setup
On the very first execution, ask the user for their configuration preferences and save them locally (e.g., in `.agent-skills.json` or your persistent memory):
1. **GitHub Org & Username:** (e.g., `aashutoshrathi` in org `REGIE-io` or your respective org).
2. **Issue Tracker Prefix:** (e.g., `PROJ-` or `DIA-`).
3. **Daily Work Folder:** Where should backup logs be saved (e.g., `daily-updates/`)?

## Strict Boundaries
- **Never** post to public Slack channels like `#daily-update`.
- **Never** send Slack messages to any channel except the configured self-chat.
- **Do not** use `@here` or `@channel`.
- **Do not** ask the user to post. Only send the Channel block to self-chat automatically.

## Data Sources & Constraints
- **Timezone:** Always use the India calendar date (Asia/Kolkata).
- **Timeframe:** Fetch updates from the last 24 hours.
- **GitHub:** Target the configured GitHub user in the configured Org.
  - Skip sync PRs that were approved or merged (e.g., "Main to Dialer", "Sync develop to main").
  - If you pushed fix commits as part of a review, explicitly call them out.
- **Linear/Issue Tracker:** Tickets assigned to you. If the tracker API is missing/fails, still write the PR sections and leave a short tickets TODO.
- **Slack Self-Chat:** Read the user's Slack self-chat. Use the newest message whose first line is exactly "Manual tasks". Copy open items into `Tickets > Manual` and `Channel`. Do not edit or delete that Slack message. Do not copy yesterday's Manual list. If missing/empty, omit the Manual section.

## How to Fill the Update
**1. PRs opened:** PRs opened this India day.
**2. PRs continued:** PRs opened on an earlier day where you pushed commits this day (your PR or someone else's). Do not list a PR here if it is already under *PRs opened*. Note what changed.
**3. PRs reviewed:** Reviews submitted this India day. Split into subsections: Merged; Requested changes; Approved; Still open; Closed. Omit empty subsections.
**4. Tickets on me:** Assigned tickets that are not Done or Canceled. Prefer Urgent, High, or tickets moved today. Do not dump a long backlog.
**5. Tickets planning:** Todo items meant to start next (e.g., `PROJ-1867`, `PROJ-1816` until they start).
**6. Channel:** The same facts formatted for Slack. Indented by one level.

## Formatting Rules
- Every PR and ticket MUST be a markdown link: `[repo#n](url)` or `[PROJ-1234](url)`.
- If a PR is linked with a Ticket, link that ticket on the same line as the PR (e.g., `[PROJ-123](url)`) and add a quick line about it if needed. Do not put the ticket in a separate section if it belongs with the PR.
- Add details to PRs (e.g., if it's WIP, approved, or review is pending by @user).
- Add a short note on the same line only when the title is not enough (why it matters, what you asked, what blocks). Skip the note when the title is already clear.
- **Do not** copy yesterday's Review Queue or "Plan and Start on" lists.
- Match the shape of existing files in the `daily-updates/` folder.
- **No em-dashes or en-dashes.** Use standard hyphens (`-`) only.

## Final Execution Steps
After the file is written and updated at `daily-updates/YYYY-MM-DD.md`:
1. Commit the file with message: `daily-update: YYYY-MM-DD`.
2. Send **only** the `Channel` section to the Slack self-chat.
