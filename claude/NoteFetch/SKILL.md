---
name: NoteFetch
description: Fetch recent meeting transcripts via MCP and save to markdown files.
---

# NoteFetch

**Purpose:** Automate the retrieval of meeting transcripts (e.g., from Granola or a similar MCP server) and save them locally.

## First-Time Setup
On the very first execution, ask the user for their configuration preferences and save them locally (e.g., in `.agent-skills.json` or your persistent memory):
1. **Output Folder:** Where should the transcripts be saved (e.g., `calls/`)?
2. **MCP Tool Name:** What is the specific MCP tool name used to fetch transcripts (e.g., `granola_list_meetings`)?

## Usage
User can invoke with:
- `/note-fetch`
- `/note-fetch <N>` - fetch the last N meetings (default 10)

## Implementation Steps

```steps
1. Call the meeting list MCP tool (e.g., `list_meetings`) with time_range="last_30_days" to get recent meetings.
2. For each meeting not already downloaded locally (check by date and title match):
   a. Call the meeting retrieval tool to get the meeting ID.
   b. Extract the summary or transcript content.
   c. If summary is empty/null, fall back to the raw transcript.
   d. Save to `calls/YYYY-MM-DD-<slug>.md`.
3. Print a summary of what was saved.
```

## Output Format for each meeting

```markdown
# Meeting Title

**Date:** <formatted date>

---

<summary/transcript content>
```

## Filename Convention
`YYYY-MM-DD-<kebab-case-title>.md` - this matches standard daily notes systems.
