---
name: creating-gemini-skills
description: Generates high-quality, predictable, and efficient Antigravity agent skill directories based on user requirements. Use this skill when the user asks to create a new skill for the agent.
---

# Gemini Skill Creator

## When to use this skill
- The user asks to create a new skill or a "global skill".
- The user provides instructions for a custom agent capability and wants it saved as a skill.
- The user mentions creating a `.agent/skills/` directory.

## Workflow
1.  **Analyze Request**: Understand the task the user wants the new skill to perform.
2.  **Determine Structure**: Plan the `SKILL.md` and any optional `scripts/`, `examples/`, or `resources/`.
3.  **Draft Frontmatter**: Create the required YAML frontmatter with a gerund-form name and a third-person description with specific triggers.
4.  **Write Body**: Follow the writing principles to draft the body of `SKILL.md`.
5.  **Include Workflows**: Add checklists, validation loops, and error handling instructions where appropriate.
6.  **Output Format**: Output the result using the specified template format or write directly to the skill workspace.

## Instructions
You are an expert developer specializing in creating "Skills" for the Antigravity agent environment. Your goal is to generate high-quality, predictable, and efficient skill directories based on user requirements.

### 1. Core Structural Requirements
Every skill you generate must follow this folder hierarchy:
- `<skill-name>/`
    - `SKILL.md` (Required: Main logic and instructions)
    - `scripts/` (Optional: Helper scripts)
    - `examples/` (Optional: Reference implementations)
    - `resources/` (Optional: Templates or assets)

### 2. YAML Frontmatter Standards
The `SKILL.md` must start with YAML frontmatter following these strict rules:
- **name**: Gerund form describing an action in progress (e.g., `testing-code`). Max 64 chars. Lowercase letters, numbers, and hyphens only. No spaces. No "claude" or "anthropic" in the name.
- **description**: Written in **third person**. Must include specific triggers/keywords. Be "pushy" on triggering to ensure the agent uses the skill when appropriate. Max 1024 chars.

### 3. Writing Principles (The "Claude Way")
When writing the body of `SKILL.md`, adhere to these best practices:
* **Conciseness**: Assume the agent is smart. Do not explain what a PDF or a Git repo is. Focus only on the unique logic of the skill.
* **Progressive Disclosure**: Keep `SKILL.md` under 500 lines. If more detail is needed, link to secondary files (e.g., `[See ADVANCED.md](ADVANCED.md)`) only one level deep.
* **Forward Slashes**: Always use `/` for paths, never `\`.
* **Degrees of Freedom**: 
    - Use **Bullet Points** for high-freedom tasks (heuristics).
    - Use **Code Blocks** for medium-freedom (templates and schemas).
    - Use **Specific Bash Commands** for low-freedom (fragile operations).
    - Use **Tables** for multi-attribute references or comparisons.

### 4. Workflow & Feedback Loops
For complex tasks, include:
1.  **Checklists**: A markdown checklist the agent can copy and update to track state.
2.  **Validation Loops**: A "Plan-Validate-Execute" pattern. (e.g., Run a script to check a config file BEFORE applying changes).
3.  **Error Handling**: Instructions for scripts should be "black boxes"—tell the agent to run `--help` if they are unsure.

### 5. Output Template
When asked to create a skill, output the result in this format:

### [Folder Name]
**Path:** `.agent/skills/[skill-name]/` (or the applicable global workspace directory)

### [SKILL.md]
```markdown
---
name: [gerund-name]
description: [3rd-person description]
---

# [Skill Title]

## When to use this skill
- [Trigger 1]
- [Trigger 2]

## Workflow
[Insert checklist or step-by-step guide here]

## Instructions
[Specific logic, code snippets, or rules]

## Resources
- [Link to scripts/ or resources/]

[Supporting Files]
(If applicable, provide the content for scripts/ or examples/)
```
