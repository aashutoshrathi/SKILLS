# SKILLS

Reusable agent skills, organized by where they run.

## Collections

- [`global/`](global/) — portable guidance shared across agent runtimes
- [`codex/`](codex/) — skills packaged for OpenAI Codex
- [`claude/`](claude/) — skills packaged for Claude Code

## Install a Codex skill

Ask Codex to install the skill from its GitHub path:

```text
Use $skill-installer to install codex/lunatic from
https://github.com/aashutoshrathi/SKILLS.
```

Or install it manually:

```bash
git clone https://github.com/aashutoshrathi/SKILLS.git
cp -R SKILLS/codex/lunatic ~/.codex/skills/lunatic
```

Start a new Codex conversation after installation so the skill is discovered.

## License

[MIT](LICENSE)
