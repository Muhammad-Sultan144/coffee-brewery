# Preferred Tech Stack & Implementation Rules (Glaido)

When generating code or UI components for Glaido, you **MUST** strictly adhere to the following technology choices and styling rules.

## Core Stack
* **Framework:** React (TypeScript preferred)
* **Styling Engine:** Tailwind CSS (Mandatory. Never use plain CSS or styled-components.)
* **Component Library:** shadcn/ui (primitives with custom overrides to match Glaido tokens)
* **Icons:** Lucide React

## Implementation Guidelines

### 1. Tailwind Usage
* Use Tailwind utility classes directly in JSX.
* Map all colors to the Glaido design tokens:
  - Background: `bg-[#0D0D0D]` (or `bg-background`)
  - Primary CTA: `bg-[#BFF549] text-[#000000]`
  - Accent/Highlights: `text-[#BFF549]` (or `text-primary`)
  - Secondary Text: `text-[#B6B6B6]`
  - Borders: `border-[#252525]`
* **Dark Mode:** Since Glaido is a dark-theme-first brand, all pages should use `#0D0D0D` as the base background by default.

### 2. Component Patterns & Geometry
* **Border Radii:** Always enforce strict sharp angles:
  - Containers, cards, tables, inputs: `rounded-none` (`0px`)
  - Buttons (Primary/Secondary): `rounded-[2px]` (micro-affordance)
* **Buttons:**
  - **Primary:** `bg-[#BFF549] text-[#000000] font-bold rounded-[2px] transition-all hover:bg-[#A6D83F] shadow-none`
  - **Secondary:** `bg-transparent text-[#B6B6B6] border border-[#252525] font-bold rounded-[2px] hover:text-white hover:border-[#BFF549] transition-all shadow-none`
* **Forms:** Labels must always be placed *above* the input fields, uppercase, extra-small tracking-wider font.
* **Layout:** Leverage CSS Grid and Flexbox with strict unit multiplies of `4px` (e.g., `gap-1` = 4px, `gap-4` = 16px, `p-6` = 24px).

### 3. Forbidden Patterns
* Do NOT use jQuery.
* Do NOT use Bootstrap or other utility frameworks.
* Do NOT create separate `.css` files. All styles belong inside JSX components via Tailwind.
* Do NOT use border radius values larger than `2px` (no `rounded-md`, `rounded-lg`, etc.).
