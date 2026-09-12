---
name: lunatic
description: 'Plan, investigate, and execute engineering tickets or bugs with cost-aware model routing: quick Sol complexity triage, Sol-or-Astra planning, Luna implementation lanes, and Sol review gates. Use when the user says phrases such as "do this ticket", "plan this ticket", "find the RCF", or "fix the bug", or clearly asks for the same ticket/bug workflow.'
---

# Lunatic

Turn an engineering request into a small, explicit work graph; assign implementation to economical agents; and keep planning and review in stronger-model gates. Optimize total task cost, not agent count.

## Preserve the user's verb

Route the workflow without expanding authorization:

- **Plan**: inspect and return the plan only. Do not implement.
- **Find the RCF / diagnose / investigate**: establish the root cause and evidence only. Do not fix unless the user also asks for a fix. If “RCF” is ambiguous in context, ask what it means.
- **Do / implement / fix**: plan, execute, validate, and review within the requested scope.
- Never push, open or modify a PR, post comments, deploy, merge, or mutate external systems unless the user explicitly authorizes that action.

## 1. Run a fast complexity gate

Use `gpt-5.6-sol` at `xhigh` for one tightly scoped triage pass. If the current orchestrator is already that model and effort, perform the gate directly; otherwise delegate it. Give the gate only the request and the minimum context needed to classify it—do not duplicate a full repository investigation.

Return a compact decision record:

```text
Complexity: low | medium | high | critical
Drivers: <up to 5 concrete factors>
Planner: gpt-5.6-sol | gpt-6-astra
Why: <one sentence>
Suggested Luna lanes: <range>
```

Assess blast radius, ambiguity, number of affected subsystems, state or data migration, concurrency, security/privacy, financial or customer impact, reversibility, edge-case density, and validation difficulty.

### Astra gate

Choose `gpt-6-astra` for planning **only when all three are present**:

1. Failure has serious consequences, such as security/privacy exposure, data loss, monetary error, compliance risk, production outage, or a hard-to-reverse migration.
2. The change has dense edge cases or interacting invariants across multiple boundaries.
3. Material ambiguity remains after a quick evidence pass, or the plan requires unusually difficult end-to-end reasoning.

Otherwise choose `gpt-5.6-sol`. Do not use Astra merely because a ticket is large, unfamiliar, or spans many files.

Use exact model IDs and requested efforts when model overrides are available. If one is unavailable, disclose that briefly and use the closest available capability tier; do not claim the requested routing occurred.

## 2. Produce one execution-grade plan

Have the selected planner use `xhigh` reasoning and create a concise plan containing:

- outcome, scope, non-goals, and known assumptions;
- evidence gathered and unresolved questions that could change the solution;
- numbered implementation lanes with dependencies and exact ownership boundaries;
- acceptance criteria and tests for each lane;
- integration order, review points, final validation, and rollback or recovery notes where relevant.

Each lane must be independently actionable and should name likely files, modules, APIs, or behaviors when known. Split by ownership boundary, not by arbitrary file count. Combine tiny coupled changes. Identify shared files and assign each to one owner to prevent edit collisions.

Do not spend tokens writing multiple competing plans unless a real architectural choice requires user input. If an unanswered question materially changes behavior or creates meaningful risk, stop after the plan and ask one focused question.

## 3. Size the Luna swarm

Use `gpt-5.6-luna` at `high` for implementation and focused investigation lanes.

- Small or tightly coupled work: 1–5 Luna lanes.
- Substantial, separable work: 6–10 Luna lanes.
- Large program-level work: 11–20 Luna lanes only when the plan demonstrates that many independent ownership boundaries.

These are ceilings, not quotas. Never create agents merely to reach 5, 10, or 20. Keep one agent responsible for each coherent concern and avoid redundant repository scans. Delegated agents must not create their own subagents unless the plan explicitly requires nested delegation.

Respect the runtime's actual concurrency limit. Keep the orchestrator available and run excess lanes in dependency-aware waves. A plan may contain up to 20 lanes even when only a few agents can run simultaneously.

Every Luna assignment must include:

- the lane goal and acceptance criteria;
- owned files or subsystem and explicit out-of-scope boundaries;
- relevant evidence and dependencies from the plan;
- required focused tests or checks;
- delivery format: summary, changed files, validation results, risks, and commit SHA when committing.

## 4. Isolate mutation and integrate deliberately

Before implementation, inspect repository status and preserve unrelated user changes.

For a Git repository, prefer an isolated branch and worktree per mutating lane when lanes may overlap or parallel agents would share a checkout. Use clear lane-specific names. The orchestrator creates the worktrees and gives each agent its exact path. Agents edit only their assigned lane and make a narrow commit when commits are authorized by the task.

For truly disjoint lanes, a shared task worktree is acceptable only with explicit file ownership. Never let multiple agents edit the same file concurrently. Do not rewrite, discard, stage, or commit unrelated user changes.

Integrate in the dependency order from the plan. Resolve only well-understood mechanical conflicts; stop and ask when a conflict requires a product or architectural choice. Do not push or merge remotely without authorization.

## 5. Gate work with Sol

Use `gpt-5.6-sol` at `xhigh` as a read-only reviewer after each meaningful batch of Luna work. Review high-risk lanes individually; batch independent low-risk lanes to reduce cost. The reviewer must inspect the actual diff and relevant surrounding behavior, not only agent summaries.

Review for:

- conformance to the plan and acceptance criteria;
- correctness across callers, persistence, APIs, background effects, UI/client state, migrations, and configuration where applicable;
- missed edge cases, security/privacy risks, regressions, and ownership collisions;
- focused test adequacy and whether reported validation really ran.

The Sol reviewer does not implement. It returns prioritized, evidence-backed findings with file/line references when possible and a gate result: `PASS`, `PASS WITH FOLLOW-UPS`, or `REWORK`.

Send `REWORK` findings back to the owning Luna agent for one focused repair pass, then re-review. If the same lane fails twice or the failure reveals a wrong architecture, pause implementation and have the original planner revise the plan. Re-run the Astra gate only if the newly discovered facts now satisfy all Astra criteria.

## 6. Close the task

After integration, run the narrowest meaningful checks first, then the appropriate broader validation. Have Sol perform one final holistic review of the integrated diff for medium, high, or critical work; for low-risk work, the last passing batch review may serve as the final gate.

Report:

- what changed or, for diagnosis-only work, the evidenced root cause;
- the final gate result and any residual risks;
- tests/checks run and their results, clearly separating local validation from remote CI;
- commits/worktrees created and whether anything remains unintegrated;
- any action requiring user authorization.

Keep orchestration updates brief. Do not dump agent transcripts or repeat the full plan after it has been accepted.
