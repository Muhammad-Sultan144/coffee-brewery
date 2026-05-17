# 💎 Glaido Brand Identity & Design System
> The Official Project Constitution for Glaido's Visual Identity, Typography, Components, and Tech Stack.

**Brand Name:** Glaido  
**Design Theme:** Ultra-Modern, High Energy, Elite Obsidian  
**Target Audience:** Tech-savvy individuals seeking high-performance, efficient dictation solutions.  

---

## 🎨 1. Core Color System

Glaido utilizes a dark mode scheme dominated by an intense, high-energy lime green accent and a deep obsidian background.

| Token | CSS Variable / Utility | Hex Code | Visual Preview / Description |
| :--- | :--- | :--- | :--- |
| **Primary** | `bg-primary` / `text-primary` | `#BFF549` | Vibrant Lime Green (High Energy Accent) |
| **Accent** | `bg-accent` | `#BFF549` | Used for links, highlights, and primary CTAs |
| **Background** | `bg-background` | `#0D0D0D` | Elite Obsidian Dark (Core background) |
| **Text Primary** | `text-foreground` | `#FFFFFF` | Clear, high-contrast white on dark backgrounds |
| **Text Inverted**| `text-primary-foreground` | `#0D0D0D` | Deep black used strictly for readability on lime-green buttons |
| **Link** | `text-link` | `#BFF549` | Lime green anchor elements with smooth underline hover |
| **Secondary Border** | `border-border` | `#252525` | Deep charcoal grey for secondary borders and outlines |
| **Secondary Text** | `text-muted-foreground` | `#B6B6B6` | Soft grey for body text, muted details, and inactive states |

---

## 📐 2. Layout, Grid & Spacing

Glaido embraces a sharp, high-tech, and precise geometry. Curves are rejected in favor of rigid, structural, and professional 90-degree layouts.

*   **Base Spacing Unit:** `4px` (`gap-1` = 4px, `gap-4` = 16px, `p-6` = 24px)
*   **Border Radius:** `0px` (Strictly sharp container edges, cards, and input fields)
*   **Exceptions:** Buttons use a micro-radius of `2px` for refined clickable affordance.

---

## ✍️ 3. Typography & Font Stacks

Glaido uses a single, premium, custom geometric sans-serif typeface: **Aspekta**. It provides extreme clarity, high technology, and modern appeal.

### Font Family Stacks
*   **Headings:** `"Aspekta", ui-sans-serif, system-ui, sans-serif`
*   **Body & Copy:** `"Aspekta", ui-sans-serif, system-ui, sans-serif`

### Type Scale Invariants
*   **H1 (Mega Hero):** `76px` (`text-[76px]`), line height `1.1`, font weight `700` (Bold)
*   **H2 (Section Header):** `52px` (`text-[52px]`), line-height `1.2`, font weight `700`
*   **Body Text:** `14px` (`text-[14px]`), line-height `1.5`, font weight `400` (Normal)

```css
/* Tailwind Font Configuration Example */
@theme {
  --font-family-headings: "Aspekta", ui-sans-serif, system-ui, sans-serif;
  --font-family-body: "Aspekta", ui-sans-serif, system-ui, sans-serif;
}
```

---

## ⚡ 4. Premium Components & Code Standards

Every Glaido component is designed using React, TypeScript, and native Tailwind utility classes. No custom CSS files are allowed.

### 4.1 Primary CTA Button
High-contrast, high-energy green block with black text, zero shadow, and 2px border radius.
```tsx
import React from 'react';

export const ButtonPrimary: React.FC<{ label: string; onClick?: () => void }> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#BFF549] text-[#000000] font-bold text-sm px-6 py-3 rounded-[2px] transition-all hover:bg-[#A6D83F] duration-200 active:scale-95 shadow-none"
    >
      {label}
    </button>
  );
};
```

### 4.2 Secondary Button
Transparent, outlined charcoal-bordered button with muted gray text.
```tsx
import React from 'react';

export const ButtonSecondary: React.FC<{ label: string; onClick?: () => void }> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-transparent text-[#B6B6B6] border border-[#252525] font-bold text-sm px-6 py-3 rounded-[2px] transition-all hover:text-[#FFFFFF] hover:border-[#BFF549] duration-200 active:scale-95 shadow-none"
    >
      {label}
    </button>
  );
};
```

### 4.3 Form Inputs
Input fields must always have labels placed **above** the field, with sharp 0px borders.
```tsx
import React from 'react';

export const FormInput: React.FC<{ label: string; placeholder: string; id: string }> = ({ label, placeholder, id }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-[#B6B6B6] text-xs font-bold uppercase tracking-wider">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="bg-[#1A1A1A] text-[#FFFFFF] border border-[#252525] rounded-[0px] px-4 py-3 text-sm placeholder-[#555555] focus:outline-none focus:border-[#BFF549] transition-colors"
      />
    </div>
  );
};
```

---

## 🛡️ 5. Brand Logo Assets

The Glaido brand logo is a modern, custom geometric SVG. It features a lime-green "G" symbol paired with clean white lettering.

- **SVG Path:** [`brand-identity/resources/logo.svg`](brand-identity/resources/logo.svg)
- **PNG Alt Path:** [`brand-identity/resources/logo.png`](brand-identity/resources/logo.png)

```tsx
import React from 'react';

export const BrandLogo: React.FC<{ className?: string }> = ({ className = "h-6 w-auto" }) => {
  return (
    <img
      src="/brand-identity/resources/logo.svg"
      alt="Glaido Logo"
      className={className}
    />
  );
};
```

---

## 🗣️ 6. Copywriting: Voice & Tone

Glaido sounds like a premium developer tool built by engineers for elite dictation.

*   **Personality:** Professional but approachable, direct, tech-savvy, high-energy.
*   **Rule 1:** Main headings (H1, H2) must use **Title Case**.
*   **Rule 2:** Subheadings (H3+) must use **sentence case**.
*   **Rule 3:** **Never** use exclamation points in standard interface copy.
*   **Rule 4:** Prefer active, efficient voice ("dictate and deploy") over passive voice ("dictation can be performed").

---

*This document is the absolute visual law of the Glaido project ecosystem.*
