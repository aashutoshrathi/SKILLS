---
name: Shipper
description: Prepare and orchestrate release PRs across multiple repositories seamlessly.
---

# Shipper

**Purpose:** Automate release PR creation for deployment pipelines across multiple repositories and draft release notes.

## First-Time Setup
On the very first execution, ask the user for their configuration preferences and save them locally (e.g., in `.agent-skills.json` or your persistent memory):
1. **Repositories:** Which repositories should be included in the release pipeline?
2. **Release Notes Path:** Where should the draft release notes be saved (e.g., `releases/`)?

## What It Does

1. **Creates Release PRs:**
   - Identifies source and target deployment branches.
   - Creates a pull request for the upcoming release across defined repos.
   - Avoids creating duplicates if a release PR already exists.

2. **Drafts Release Notes:**
   - Scans completed tickets and PRs for the current sprint.
   - Categorizes by Features, Bugs, Performance, and Breaking Changes.
   - Generates two versions: Internal (technical) and External (customer-facing).

## Instructions for Execution

When running the release preparation:

### Step 1: Request Release Target
Ask the user for the release date/version, like "v1.2.0" or "December 16th".

### Step 2: Check Existing PRs
Check if a PR already exists before attempting to create one:
```bash
gh pr list --repo OWNER/REPO --base TARGET_BRANCH --head SOURCE_BRANCH --state open
```
If a PR is open, skip creation and append its URL to the summary.

### Step 3: Find Labels
List available repository labels to find exact matches for release tagging before applying them.

### Step 4: Draft Release Notes
Generate the release notes and save them locally for review. Ensure the tone is clear and concise.

## Summary Output
Provide a unified markdown summary linking all generated PRs and the generated release notes file.
