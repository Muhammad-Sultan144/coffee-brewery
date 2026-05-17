# REQUIREMENTS.md — Skillmaster Global Workspace
> Architecture Requirements for Defining, Authoring, and Executing Reusable Agent Skills

**Status:** Active Standard | **Version:** 1.0.0 | **Timezone:** +05:00
**Governing Protocols:** B.L.A.S.T. · A.N.T. 3-Layer Architecture · Self-Annealing Rule

---

## 1. Purpose

This document is the **Project Constitution** for the `skills-master` global workspace. It defines every structural, naming, authoring, and execution requirement that must be satisfied when creating, registering, or consuming a reusable agent skill. Any skill that does not comply with this specification is considered malformed and must not be deployed.

> **System Pilot Directive:** Treat this file as law. Never guess at skill structure. Never infer missing fields. Resolve ambiguity here before writing a single line of a `SKILL.md`.

---

## 2. Core Architecture — A.N.T. 3-Layer Model

Every skill must be understood and implemented within the three-layer hierarchy:

| Layer | Role | Artifacts |
|-------|------|-----------|
| **Layer 1 — Architecture** | SOPs, schemas, constitutional docs | `SKILL.md`, `REQUIREMENTS.md`, `gemini.md` |
| **Layer 2 — Navigation** | Reasoning, routing, decision logic | Agent system prompts, `gemini.md` data blueprints |
| **Layer 3 — Tools** | Deterministic Python scripts | `scripts/`, `tools/` directories |

**Rule:** No Layer 3 script may be written before Layer 1 schema is approved. This is the **Data-First Rule** — define the JSON contract in `gemini.md` first.

---

## 3. Skill Folder Hierarchy — Canonical Structure

```
<skill-name>/
├── SKILL.md                ← REQUIRED. Single source of truth for the skill.
├── scripts/                ← Optional. Deterministic Python tools only.
│   └── *.py
├── examples/               ← Optional. Input/output samples for validation.
│   └── *.md / *.json
└── resources/              ← Optional. Reference docs loaded on demand.
    └── *.md / *.json
```

**Critical constraints:**
- `SKILL.md` is the only mandatory file.
- All paths must use forward slashes — no backslashes, ever.
- No loose files at the workspace root. Every artifact belongs inside a named skill folder.
- The `.tmp/` directory is reserved for ephemeral intermediate operations only. Never commit to it.

---

## 4. Naming Requirements

### 4.1 Skill Folder & Frontmatter Name
- Format: **gerund form** — the skill name describes an action in progress (e.g., `creating-gemini-skills`, `implementing-blast-protocol`, `scraping-rss-feeds`).
- Character set: lowercase letters, numbers, hyphens only.
- Maximum length: **64 characters**.
- Forbidden substrings: `claude`, `anthropic`.
- The folder name and the `name:` field in YAML frontmatter **must match exactly**.

### 4.2 Script Files (`scripts/`)
- Use `snake_case.py` naming.
- Each script must have a single, clearly named entry function.
- No scripts named `main.py` or `run.py` — use descriptive verb-noun names (e.g., `fetch_rss_feed.py`, `parse_article_html.py`).

---

## 5. `SKILL.md` Authoring Standard

### 5.1 Mandatory YAML Frontmatter

Every `SKILL.md` must open with a valid YAML block:

```yaml
---
name: <gerund-skill-name>          # Required. Max 64 chars. Gerund form.
description: <third-person-prose>  # Required. Triggers + what it does.
compatibility: <deps-or-tools>     # Optional. Only if non-standard tools needed.
---
```

**Frontmatter rules:**
- `name` — must be identical to the folder name.
- `description` — written in **third person**. Must state both *what* the skill does and *when* to trigger it. Lean toward being "pushy" on triggering — agents undertrigger by default.
- `compatibility` — list required tools, Python packages, or environment constraints only if they are non-obvious.

### 5.2 Body Authoring — The Claude Way

| Principle | Rule |
|-----------|------|
| **Conciseness** | Assume the agent is smart. No padding, no over-explanation. |
| **Progressive Disclosure** | Keep `SKILL.md` under **500 lines**. Overflow goes into `resources/`. |
| **Forward References** | Reference resource files explicitly with a clear statement of *when* to read them. |
| **No Duplication** | Never repeat information that already lives in a resource file. |

### 5.3 Formatting Heuristics

Use the correct format for each content type:

- **Bullet points** → heuristics, rules, lists of considerations
- **Code blocks** → templates, schemas, repeatable patterns
- **Bash commands** → fragile operations, install steps, file moves
- **Tables** → comparisons, multi-attribute references
- **Checklists** → validation gates before proceeding to next phase

### 5.4 Progressive Disclosure — 3-Level Loading

| Level | Content | Size Target |
|-------|---------|-------------|
| Level 1 — Metadata | `name` + `description` only | ~100 words |
| Level 2 — Body | Full `SKILL.md` instructions | < 500 lines |
| Level 3 — Resources | Reference files, scripts, assets | Unlimited |

Scripts in `scripts/` can execute without being fully loaded into context — this is the key efficiency lever for heavy operations.

---

## 6. Design Token & Brand Requirements (UI Skills)

Any skill that produces UI components or front-end output must comply with the global brand identity:

### 6.1 Technology Stack (Mandatory)
- **Framework:** React (TypeScript preferred)
- **Styling:** Tailwind CSS — direct utility classes in JSX, no separate CSS files
- **Component Library:** shadcn/ui
- **Icons:** Lucide React
- **Forbidden:** jQuery, Bootstrap, inline `style={{}}` blocks for layout

### 6.2 Visual Standards
- Dark mode is **required** for all UI outputs.
- Primary buttons: solid fill with primary brand color.
- Secondary buttons: ghost or outline variant.
- Input fields: label always above the field, never inside as placeholder.
- No exclamation points in copy.

### 6.3 Copywriting Standards
- H1 / H2: **Title Case**
- H3 and below: **sentence case**
- Voice: professional, approachable, jargon-free, active voice
- Tone: direct and empathetic — never corporate-flat, never casual-sloppy

---

## 7. B.L.A.S.T. Protocol Compliance

Every skill that involves automation or multi-step execution must be structured against the B.L.A.S.T. framework:

| Phase | Meaning | Skill Obligation |
|-------|---------|-----------------|
| **B — Blueprint** | Define schema and architecture before any code | `gemini.md` JSON schema written and approved |
| **L — Link** | Identify all data sources and API contracts | Documented in `resources/` or `SKILL.md` preamble |
| **A — Architect** | Design the Layer 3 tool pipeline | Tool functions named and sequenced in `SKILL.md` |
| **S — Stylize** | Apply brand and UI standards | Verified against `brand-identity` skill |
| **T — Trigger** | Define exact trigger conditions | `description` frontmatter field finalized and tested |

A skill that skips any B.L.A.S.T. phase is **incomplete** and must not be published to the workspace.

---

## 8. Data-First Rule — JSON Schema Before Code

This is the single most important efficiency requirement in the entire system.

```
❌ WRONG:  Write scripts → discover data shape → patch schema
✅ RIGHT:  Define schema in gemini.md → approve blueprint → write scripts
```

**Mandatory sequence for any data-handling skill:**

1. Identify all data inputs and outputs.
2. Define a complete JSON schema for each.
3. Record the schema in `gemini.md` (or `resources/schema.json`).
4. Get blueprint approval (explicit or implicit from task plan).
5. Only then write scripts in `scripts/`.

Violating this order triggers the **Self-Annealing Rule** — see Section 9.

---

## 9. Self-Annealing Rule — Error Recovery Protocol

When any script or skill execution fails:

```
1. ANALYZE  → Read error output. Identify root cause precisely.
2. PATCH    → Fix the script. Do not rewrite from scratch unless the schema was wrong.
3. TEST     → Re-run the patched script with the same inputs.
4. UPDATE   → Record the fix in the Architecture SOP (SKILL.md or progress.md).
```

**Project memory files — always kept current:**

| File | Purpose |
|------|---------|
| `progress.md` | Current state, completed phases, next step |
| `findings.md` | Discoveries, data shape surprises, API quirks |
| `task_plan.md` | Ordered task list with status flags |

---

## 10. Triggering Efficiency Requirements

A skill that never fires is a dead skill. The following are required to maximize trigger accuracy:

- **Description must be "pushy"** — explicitly instruct the agent to use this skill even when the user doesn't name it directly.
- Include both positive trigger phrases ("use when user asks to...") and contextual signals ("even if they don't mention X explicitly").
- For skills with complex or broad domains, add a **trigger table** inside the body listing example user phrases that should fire the skill.
- Run description optimization via `run_loop.py` before finalizing any skill intended for production use.

---

## 11. Validation Checklist — Pre-Publish Gate

Before any skill is committed to the `skills-master` workspace, verify:

```
STRUCTURE
☐ Folder name matches SKILL.md `name:` field exactly
☐ Folder name is gerund form, lowercase, hyphens only, ≤ 64 chars
☐ No "claude" or "anthropic" in the name
☐ SKILL.md exists at the root of the skill folder
☐ All referenced resource files exist at declared paths

FRONTMATTER
☐ `name:` present and valid
☐ `description:` present, third-person, includes trigger conditions
☐ `compatibility:` present if non-standard tools are required

BODY
☐ Body is under 500 lines
☐ Heuristics use bullet points
☐ Templates use code blocks
☐ Fragile operations use bash blocks
☐ Resource files are referenced with explicit load instructions

DATA & TOOLS (if applicable)
☐ JSON schema defined in gemini.md before any script was written
☐ Scripts follow snake_case naming
☐ Scripts have a single named entry function
☐ Self-Annealing record updated after any patching

B.L.A.S.T. COMPLIANCE
☐ Blueprint phase complete (schema approved)
☐ Link phase complete (data sources documented)
☐ Architect phase complete (pipeline sequenced)
☐ Stylize phase complete (brand standards verified)
☐ Trigger phase complete (description tested)

UI/BRAND (if applicable)
☐ React + Tailwind + shadcn/ui stack used
☐ Dark mode implemented
☐ No jQuery, Bootstrap, or separate CSS files
☐ Copywriting follows Title Case / sentence case rules
```

---

## 12. Most Critical Requirements — Priority Stack

If only one thing is enforced, enforce these in order:

1. **Data-First Rule** — No script before schema. This prevents the most expensive class of rework.
2. **Trigger Accuracy** — A skill that doesn't fire is worse than no skill. Description quality is non-negotiable.
3. **Progressive Disclosure** — Under 500 lines in `SKILL.md`. Overflow kills context efficiency.
4. **Self-Annealing** — Every error must produce a permanent patch to the SOP. Repeating the same error is a system failure.
5. **B.L.A.S.T. Sequence** — Never skip a phase. Order is the system.

---

*This document is maintained as law. Any deviation requires explicit approval and an update to this file before proceeding.*
