# SKILLS

Reusable, powerful agent skills by [@aashutoshrathi](https://github.com/aashutoshrathi), organized by where they run.

## Installation

### 1. Quick Install (All Skills)

You can quickly install all skills to your local machine using `npx`. This is the recommended way to set up everything at once:

```bash
npx @aashutoshrathi/agent-skills
```

**What this does:**
- Copies all `agnostic` skills into `~/.agent-skills/`
- Copies all `claude` skills into `~/.claude/skills/`

Your AI coding agents (Claude Code, Windsurf, Cursor, etc.) can then be directed to read from `~/.agent-skills/` to utilize these commands!

### 2. Install a Specific Skill Manually

If you only want a single skill (for example, `DayWrap`), you can clone the repository and copy just that folder to your desired location:

```bash
git clone https://github.com/aashutoshrathi/SKILLS.git
cp -R SKILLS/agnostic/DayWrap ~/.agent-skills/DayWrap
```

### 3. Agent-Assisted Installation

You can also just ask your agent to install a specific skill directly from GitHub. Just prompt your agent with:

```text
Please install the DayWrap skill from https://github.com/aashutoshrathi/SKILLS/tree/main/agnostic/DayWrap into my local skills directory.
```

## Available Skills

### Agnostic Skills (Global)
- **[DayWrap](agnostic/DayWrap/SKILL.md)**: Auto-generates an end-of-day update for Slack by fetching data from GitHub, Linear, etc.
- **[Shipper](agnostic/Shipper/SKILL.md)**: Automates release PR creation and release notes drafting across multiple repositories.
- **[BoardSync](agnostic/BoardSync/SKILL.md)**: Syncs local markdown todo lists with your live issue tracker and GitHub PR statuses.
- **[ReviewRadar](agnostic/ReviewRadar/SKILL.md)**: Fetches and prioritizes pending pull requests that need your review.

### Claude Skills
- **[NoteFetch](claude/NoteFetch/SKILL.md)**: Connects via MCP to fetch and transcribe recent meeting notes directly to markdown files.

### Codex Skills
- **[Lunatic](codex/lunatic/SKILL.md)**: Routes engineering tickets through Sol/Astra planning, Luna implementation lanes, and Sol review gates.

## First-Time Setup
When you invoke any of these skills for the first time, your agent will automatically ask you a few setup questions (like your ticket prefixes or GitHub handle) and save those preferences locally so they "just work" on subsequent runs.

## License
[MIT](LICENSE)
