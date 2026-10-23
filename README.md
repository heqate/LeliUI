# 🌸 leliUI

<p align="center">
  <img src="https://img.shields.io/badge/version-v1.0.12-f472b6.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/dependencies-0-success.svg" alt="Zero Dependencies">
  <img src="https://img.shields.io/badge/ai--first-llms.txt-purple.svg" alt="AI First">
  <img src="https://img.shields.io/badge/style-Sakura%20Pink-ffb6c1.svg" alt="Sakura Theme">
</p>

<p align="center">
  <strong>Zero-dependency, multi-variant, AI-first HTML/CSS/JS UI library & layout framework.</strong><br>
  Built with modern CSS (<code>@layer</code>, <code>@container</code>, <code>:user-valid</code>, <code>@starting-style</code>), a Sakura & Rose-Quartz Dark Theme aesthetic, and a lightweight accessible runtime engine.
</p>

<p align="center">
  <a href="http://34.2.63.150:5000/"><strong>Live Interactive Documentation »</strong></a>
  &nbsp;|&nbsp;
  <a href="http://34.2.63.150:5000/llms-full.txt"><strong>AI Full Rules (/llms-full.txt) »</strong></a>
  &nbsp;|&nbsp;
  <a href="http://34.2.63.150:5000/ai-manifest.json"><strong>AI Manifest »</strong></a>
</p>

---

## ✨ Features

- 🌸 **Aesthetic by Default**: Refined Sakura Pink (`#f472b6`) with warm plum dark background (`#0c0a0e`) and dark-mode-first architecture.
- ⚡ **Zero Dependencies**: Pure modern HTML, CSS, and vanilla JavaScript. No React, no Tailwind build step, and no heavy runtime required.
- 🤖 **AI-First & Agent-Ready**: Standardized `/llms.txt`, `/llms-full.txt`, and `/ai-manifest.json` endpoints allow AI coding assistants (Cursor, Windsurf, Claude, ChatGPT) to generate accurate code with minimal tokens.
- 💻 **Terminal CLI**: Shadcn-style `npx leli` workflow to inspect, pick, and pull components right into your local project.
- 🧱 **Comprehensive Grid & Bento**: 12-column flexbox grid, auto-fit responsive CSS grid, Bento grid layouts, and page shells.
- ♿ **Accessible**: WAI-ARIA compliant, native HTML5 `<dialog closedby="any">` modal with light dismiss, arrow-key navigation for tabs, and `:user-valid` form validation.

---

## 🚀 Quick Start

### Option 1: Terminal CLI (Recommended)

Initialize the library or pull components directly into your project:

```bash
# Pull the complete library into ./leli-ui
npx leli

# Pull specific components only
npx leli add card button input modal toast tabs

# List all available modules and variants
npx leli list
```

### Option 2: Direct CDN / HTML Include

Add the stylesheet to your `<head>` and the script before `</body>`:

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  
  <!-- leliUI Stylesheet -->
  <link rel="stylesheet" href="http://34.2.63.150:5000/dist/leli.css">
</head>
<body>
  <div class="leli-container">
    <button class="leli-btn" data-variant="solid">Hello leliUI</button>
  </div>

  <!-- leliUI Runtime Engine -->
  <script src="http://34.2.63.150:5000/dist/leli.js" defer></script>
</body>
</html>
```

---

## 📦 Available Modules (16 Components)

| Module | Category | Variants | Engine | Description |
| :--- | :--- | :--- | :--- | :--- |
| **grid** | Layout | `container`, `12-col`, `css-grid`, `bento`, `page-shells` | Pure CSS | Centered container, 12-col grid, auto-fit responsive CSS grid & Bento layouts. |
| **navbar** | Layout | `default`, `glass`, `elevated`, `floating`, `contrast`, `brutal` | Pure CSS | Responsive header with brand, nav links, search trigger, and action buttons. |
| **button** | Forms | `solid`, `outlined`, `soft`, `ghost`, `glass`, `gradient`, `brutal`, `link` | Pure CSS | Multi-variant buttons, spinner loading state, sizes (`sm`–`xl`), and button groups. |
| **input** | Forms | `default`, `glass`, `soft`, `brutal`, `floating-label`, `input-group` | CSS + JS | Inputs, textarea, select dropdowns, input groups, and `:user-valid` validation. |
| **form-controls** | Forms | `switch`, `checkbox`, `radio`, `choice-card`, `brutal` | Pure CSS | Custom Sakura toggle switches, SVG checkboxes, radio buttons, and choice cards. |
| **badge** | Display | `solid`, `soft`, `outlined`, `glass`, `brutal`, `pill`, `dot` | Pure CSS | Pill tags, pulsing live status dots (`.leli-status-dot`), and removable badge chips. |
| **modal** | Overlays | `default`, `glass`, `brutal`, `accent-top` | CSS + JS | Native `<dialog>` modal with `@starting-style` transitions and light dismiss (`closedby="any"`). |
| **toast** | Overlays | `primary`, `success`, `warning`, `danger`, `glass`, `brutal` | CSS + JS | Notification toasts with countdown progress bar and corner positioning. |
| **card** | Display | `outlined`, `elevated`, `soft`, `glass`, `gradient`, `brutal`, `accent-top` | Pure CSS | Versatile content cards with header, body, footer, and glassmorphism. |
| **tabs** | Display | `underline`, `pills`, `segmented`, `soft`, `lifted`, `brutal`, `vertical` | CSS + JS | Accessible tabs with keyboard arrows and `hidden="until-found"` page search. |
| **accordion** | Display | `bordered`, `separated`, `flush`, `soft`, `glass`, `brutal` | Pure CSS | Native `<details name="...">` accordions with zero mandatory JavaScript. |
| **table** | Display | `default`, `striped`, `hoverable`, `bordered`, `glass`, `brutal` | CSS + JS | Sticky-header table with column sorting and container-query mobile cards. |
| **pagination** | Display | `default`, `pills`, `outlined`, `minimal`, `joined`, `brutal` | CSS + JS | Page navigation bar with active states and previous/next handlers. |
| **progress** | Display | `solid`, `gradient`, `striped`, `animated`, `indeterminate`, `glow` | Pure CSS | Animated striped bars, indeterminate loaders, and Sakura Pink glows. |
| **skeleton** | Display | `shimmer`, `pulse`, `static`, `brutal` | Pure CSS | Content placeholders with text, circle, media, and button shapes. |
| **avatar** | Display | `soft`, `solid`, `outlined`, `ring`, `gradient`, `brutal` | Pure CSS | Profile avatars with online/busy/away status dots and overlap groups. |

---

## 🤖 AI & LLM Integration (.cursorrules / Claude / ChatGPT)

leliUI is engineered from the ground up to be easily referenced by AI coding models. Copy and paste the following snippet into your project's `.cursorrules`, `AGENTS.md`, or AI system prompt:

```markdown
Use leliUI (http://34.2.63.150:5000/llms-full.txt) for all UI components.
Assets:
<link rel="stylesheet" href="http://34.2.63.150:5000/dist/leli.css">
<script src="http://34.2.63.150:5000/dist/leli.js" defer></script>

Rules:
1. Always use <html data-theme="dark"> by default.
2. Structure layouts with .leli-container, .leli-row > .leli-col-*, or .leli-bento.
3. Use .leli-navbar for top navigation.
4. Style interactive buttons with .leli-btn (data-variant="solid|outlined|soft|ghost|glass|brutal").
5. Use .leli-field > .leli-input with :user-valid validation.
6. Trigger modals via <dialog class="leli-modal" closedby="any"> or LeliUI.Modal.open('id').
7. Trigger toasts via LeliUI.Toast.success(msg) or LeliUI.Toast.show({...}).
```

---

## 🛠️ CLI Reference

```bash
# Initialize core CSS and JS in your project
npx leli init

# Pull specific components
npx leli add card table tabs modal toast

# Pull all components into a custom directory
npx leli add --all --dir ./src/ui

# Show details for a specific component
npx leli info modal

# Bundle the entire library into a single standalone leli.min.css + leli.js
npx leli bundle ./dist
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/heqate/LeliUI/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.
