---
name: DayWrap
description: Fetch today's activity from GitHub, Linear, Slack, and Granola to generate an EOD summary.
---

# DayWrap

**Purpose:** Auto-generate an end-of-day (EOD) update ready for team visibility.

## First-Time Setup
On the very first execution, ask the user for their configuration preferences and save them locally (e.g., in `.agent-skills.json` or your persistent memory):
1. **Ticket Prefix:** What is the prefix for your issue tracker (e.g., `PROJ-`)?
2. **Daily Work Folder:** Where should backup logs be saved (e.g., `daily-work/`)?

## What It Does

1. **Scans today's activity:**
   - Completed todo items
   - Linear tickets updated or completed
   - PRs merged in GitHub
   - Meetings attended (from Granola transcripts or calendar)
   - Documentation created

2. **Formats in EOD mode:**
   - ✅ COMPLETED TODAY (what shipped)
   - 🎯 KEY MEETINGS (important discussions)
   - 📋 ACTION ITEMS (from standup/meetings)
   - 🔨 IN PROGRESS (what's ongoing)
   - 🚩 BLOCKERS (what's stuck)

3. **Automatically outputs** as rich markdown for Slack/Teams.

4. **Saves backup** to `daily-work` folder.

## Output Format

```markdown
**EOD Update - [Date]**

**✅ Completed Today**
- **PROJ-123** - Fixed core performance issue in data processing
- **PROJ-124** - Triggers verified, moved to QA on Prod
- **Documentation** - Created Audit Logs documentation

**🎯 Key Meetings**
- Team 1:1 - Architecture discussion
- Daily standup - Release readiness, stage testing

**📋 Action Items from Standup**
- Review ready list PR (pending)
- Clean up inactive credentials (pending)

**🔨 In Progress**
- Interview candidate assignment prep

**🚩 No Blockers**
```

## How It Works

**Processing:**
1. Filters for today's date only (no yesterday's work).
2. Groups by category (tickets, PRs, meetings, docs).
3. Prioritizes high-impact items (releases, hotfixes, urgent tickets).
4. Formats with standard markdown.

**Deduplication:**
- If PR and ticket both completed, show once with PR link.
- Skip duplicate entries across sources.
