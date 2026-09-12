---
name: ReviewRadar
description: Show pending pull requests needing code review with live CI/CD status.
---

# ReviewRadar

**Purpose:** Aggregate and present pending pull requests that need your review, organized by urgency.

## First-Time Setup
On the very first execution, ask the user for their configuration preferences and save them locally (e.g., in `.agent-skills.json` or your persistent memory):
1. **Repositories:** Which repositories should be scanned for PRs?
2. **GitHub Handle:** What is your GitHub handle (so the agent can filter out your own reviews)?

## What It Does

1. **Fetches live PRs:** Uses the GitHub CLI (`gh`) to pull open PRs across active repositories.
2. **Shows CI/CD status:** Checks if tests are passing, failing, or pending.
3. **Cross-references tickets:** Pulls priority context from issue trackers.
4. **Detects stale PRs:** Highlights PRs open for more than 7 days.
5. **Organizes by urgency:** Sorts based on CI status, staleness, and priority.
6. **Filters appropriately:** Hides PRs you have already approved.

## Execution Steps

Run the following for all relevant repositories:

```bash
gh pr list --repo OWNER/REPO --state open --json number,title,author,headRefName,createdAt,statusCheckRollup,reviewDecision,reviews
```

Analyze the JSON output and build a prioritized review queue.

## Priority Rules
1. **Failing CI on high priority tickets:** Needs immediate attention or closure.
2. **Stale PRs (> 7 days):** Needs to be merged or closed.
3. **Passing CI, ready for review:** Standard queue.
4. **Drafts / WIP:** Ignore unless explicitly asked.
