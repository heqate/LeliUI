/**
 * leliUI Build & Registry Generator Script
 * Bundles all CSS/JS into `dist/leli.css` and `dist/leli.js`,
 * and creates `registry/components.json` for the CLI (`npx leli`).
 * Generates /llms.txt, /llms-full.txt, and /ai-manifest.json for AI agents.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const REGISTRY = path.join(ROOT, 'registry');

if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
if (!fs.existsSync(REGISTRY)) fs.mkdirSync(REGISTRY, { recursive: true });

const COMPONENT_META = [
  {
    name: 'grid',
    title: 'Grid & Layout System',
    category: 'Layout & Structure',
    file: 'components/grid.css',
    jsRequired: false,
    variants: ['container', '12-col', 'responsive (sm/md/lg/xl)', 'gutters', 'css-grid', 'bento', 'flex-layouts'],
    sizes: ['sm', 'md', 'lg', 'xl', 'fluid'],
    description: 'Centered container, 12-column row/col grid, responsive auto-fit CSS grid, Bento grid, and holy-grail page shells.'
  },
  {
    name: 'navbar',
    title: 'Header & Navigation Bar',
    category: 'Layout & Structure',
    file: 'components/navbar.css',
    jsRequired: false,
    variants: ['default', 'glass', 'elevated', 'floating', 'contrast', 'brutal'],
    sizes: ['sm', 'md', 'lg'],
    description: 'Brand header with navigation links, search trigger, action buttons, glassmorphism, and responsive wrapping.'
  },
  {
    name: 'button',
    title: 'Button & Button Group',
    category: 'Forms & Actions',
    file: 'components/button.css',
    jsRequired: false,
    variants: ['solid', 'outlined', 'soft', 'ghost', 'glass', 'gradient', 'brutal', 'link'],
    sizes: ['sm', 'md', 'lg', 'xl', 'icon'],
    description: 'Interactive button system with spinner loading state, icon buttons, Sakura Pink focus rings, and joined button groups.'
  },
  {
    name: 'input',
    title: 'Form Inputs & Floating Labels',
    category: 'Forms & Actions',
    file: 'components/input.css',
    jsRequired: true,
    variants: ['default', 'glass', 'soft', 'brutal', 'floating-label', 'input-group'],
    sizes: ['sm', 'md', 'lg'],
    description: 'Form inputs, textarea, select dropdowns, input groups with addons/icons, and :user-valid / :user-invalid state validation.'
  },
  {
    name: 'form-controls',
    title: 'Switch, Checkbox & Radio',
    category: 'Forms & Actions',
    file: 'components/form-controls.css',
    jsRequired: false,
    variants: ['switch', 'checkbox', 'radio', 'choice-card', 'brutal'],
    sizes: ['sm', 'md', 'lg'],
    description: 'Custom accessible toggle switches, checkboxes with indeterminate state, radio buttons, and interactive choice cards.'
  },
  {
    name: 'badge',
    title: 'Badge & Status Indicator',
    category: 'Data & Display',
    file: 'components/badge.css',
    jsRequired: false,
    variants: ['solid', 'soft', 'outlined', 'glass', 'brutal', 'pill', 'dot'],
    sizes: ['sm', 'md', 'lg'],
    description: 'Pill tags, status indicators, live pulsing dots, removable badges, and semantic color accents.'
  },
  {
    name: 'modal',
    title: 'Modal & Dialog',
    category: 'Overlays & Feedback',
    file: 'components/modal.css',
    jsRequired: true,
    variants: ['default', 'glass', 'brutal', 'accent-top'],
    sizes: ['sm', 'md', 'lg', 'xl', 'full'],
    description: 'Accessible HTML5 <dialog> modal with @starting-style animations, light-dismiss backdrop, escape key handler, and clean layout.'
  },
  {
    name: 'toast',
    title: 'Toast Notification',
    category: 'Overlays & Feedback',
    file: 'components/toast.css',
    jsRequired: true,
    variants: ['primary', 'success', 'warning', 'danger', 'glass', 'brutal'],
    sizes: ['md'],
    description: 'Floating notification alerts with auto-dismiss countdown bar, corner positioning, and event-driven JavaScript engine.'
  },
  {
    name: 'card',
    title: 'Card Component',
    category: 'Data & Display',
    file: 'components/card.css',
    jsRequired: false,
    variants: ['elevated', 'outlined', 'soft', 'glass', 'gradient', 'brutal', 'accent-top', 'horizontal'],
    sizes: ['sm', 'md', 'lg'],
    description: 'Flexible content containers with header, body, footer, glassmorphism, neo-brutalist border, and gradient rims.'
  },
  {
    name: 'tabs',
    title: 'Tabs Navigation',
    category: 'Data & Display',
    file: 'components/tabs.css',
    jsRequired: true,
    variants: ['underline', 'pills', 'segmented', 'soft', 'lifted', 'brutal', 'vertical'],
    sizes: ['md'],
    description: 'Accessible tabs with arrow-key keyboard navigation, find-in-page hidden="until-found" integration, and modern active states.'
  },
  {
    name: 'accordion',
    title: 'Accordion & Collapse',
    category: 'Data & Display',
    file: 'components/accordion.css',
    jsRequired: false,
    variants: ['bordered', 'separated', 'flush', 'soft', 'glass', 'brutal'],
    sizes: ['md'],
    description: 'Native <details name="..."> accordions with zero mandatory JavaScript, animated chevron indicators, and card styling.'
  },
  {
    name: 'table',
    title: 'Responsive Data Table',
    category: 'Data & Display',
    file: 'components/table.css',
    jsRequired: true,
    variants: ['default', 'striped', 'hoverable', 'bordered', 'glass', 'brutal'],
    sizes: ['sm', 'md', 'lg'],
    description: 'Sticky-header data table with column click sorting and container query (@container) mobile card transformation.'
  },
  {
    name: 'pagination',
    title: 'Pagination Bar',
    category: 'Data & Display',
    file: 'components/pagination.css',
    jsRequired: true,
    variants: ['default', 'pills', 'outlined', 'minimal', 'joined', 'brutal'],
    sizes: ['sm', 'md', 'lg'],
    description: 'Page switcher controls with active states, previous/next handlers, and joined or rounded pill shapes.'
  },
  {
    name: 'progress',
    title: 'Progress Bar',
    category: 'Data & Display',
    file: 'components/progress.css',
    jsRequired: false,
    variants: ['solid', 'gradient', 'striped', 'animated', 'indeterminate', 'glow', 'brutal'],
    sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
    description: 'Linear progress bars with striped animations, indeterminate loading states, and glowing Sakura Pink styling.'
  },
  {
    name: 'skeleton',
    title: 'Skeleton Loader',
    category: 'Data & Display',
    file: 'components/skeleton.css',
    jsRequired: false,
    variants: ['shimmer', 'pulse', 'static', 'brutal'],
    shapes: ['text', 'title', 'circle', 'media', 'button'],
    description: 'Shimmer and pulse skeleton placeholders preserving page layout while content loads.'
  },
  {
    name: 'avatar',
    title: 'Avatar & Avatar Group',
    category: 'Data & Display',
    file: 'components/avatar.css',
    jsRequired: false,
    variants: ['soft', 'solid', 'outlined', 'ring', 'gradient', 'brutal'],
    shapes: ['circle', 'rounded', 'squircle', 'square'],
    sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
    description: 'User avatars with online/busy/away status indicators, fallback initials, and overlapping avatar stack groups.'
  }
];

const PKG_PATH = path.join(ROOT, 'package.json');
const pkg = JSON.parse(fs.readFileSync(PKG_PATH, 'utf8'));

// Auto-increment patch version on every build unless --no-bump is passed
if (!process.argv.includes('--no-bump')) {
  const parts = (pkg.version || '1.0.0').split('.').map(Number);
  parts[2] = (parts[2] || 0) + 1;
  pkg.version = parts.join('.');
  fs.writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
}
const VERSION = pkg.version;

// 1. Read Core CSS
const coreCss = fs.readFileSync(path.join(SRC, 'core/leli-core.css'), 'utf8');

// 2. Concatenate all component CSS
let fullCss = `/*!\n * leliUI v${VERSION} - Complete Multi-Variant UI Library\n * Zero-Dependency Modern CSS & JS Framework\n * Built: ${new Date().toISOString()}\n */\n\n` + coreCss + '\n';

const registryData = {
  name: 'leliUI',
  version: VERSION,
  core: {
    css: coreCss,
    js: fs.readFileSync(path.join(SRC, 'js/leli.js'), 'utf8')
  },
  components: {}
};

for (const comp of COMPONENT_META) {
  const cssPath = path.join(SRC, comp.file);
  if (!fs.existsSync(cssPath)) {
    console.error(`[ERROR] Missing component file: ${cssPath}`);
    continue;
  }
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  fullCss += `\n/* --- Component: ${comp.name} --- */\n` + cssContent + '\n';
  registryData.components[comp.name] = {
    ...comp,
    css: cssContent
  };
}

// 3. Write dist/leli.css and dist/leli.js
fs.writeFileSync(path.join(DIST, 'leli.css'), fullCss, 'utf8');
fs.copyFileSync(path.join(SRC, 'js/leli.js'), path.join(DIST, 'leli.js'));

// 4. Write registry/components.json
fs.writeFileSync(path.join(REGISTRY, 'components.json'), JSON.stringify(registryData, null, 2), 'utf8');

// 5. Generate AI-Discovery Files (llms.txt, llms-full.txt, ai-manifest.json)
const SERVER_URL = 'http://34.2.63.150:5000';

const llmsTxt = `# leliUI v${VERSION} — AI-First & Educational HTML/CSS/JS Component Library

> leliUI is a zero-dependency, multi-variant UI and layout library built with modern CSS (@layer, @container, light-dark(), :user-valid, :has()) and a lightweight accessible JavaScript engine. It is designed both for humans learning modern web architecture and for AI coding agents (Cursor, Windsurf, Claude, ChatGPT, Antigravity) to generate clean UI with minimal tokens.

## Quick CDN & Direct Pull URLs (For AI Agents & Humans)
- Full CSS Bundle: ${SERVER_URL}/dist/leli.css
- Full JS Runtime: ${SERVER_URL}/dist/leli.js
- Full AI Context & Source Rules: ${SERVER_URL}/llms-full.txt
- Machine-Readable Component Registry: ${SERVER_URL}/registry/components.json
- AI Manifest: ${SERVER_URL}/ai-manifest.json

## Terminal CLI Usage
\`\`\`bash
# Pull the entire library into ./leli-ui
npx leli

# Pull specific components
npx leli grid navbar button input modal toast
\`\`\`

## Core Architecture Rules for AI Agents
1. **Include Assets**:
   \`\`\`html
   <link rel="stylesheet" href="${SERVER_URL}/dist/leli.css">
   <script src="${SERVER_URL}/dist/leli.js" defer></script>
   \`\`\`
2. **Theme System**: Defaults to Dark Mode (\`<html data-theme="dark">\`). Switch to light mode with \`data-theme="light"\` or \`LeliUI.Theme.toggle()\`.
3. **Universal Attributes**:
   - \`data-variant="..."\`: Changes visual style without extra CSS classes.
   - \`data-size="sm | md | lg | xl"\`: Adjusts component density and scale.
   - \`data-accent="primary | success | warning | danger | info"\`: Applies semantic brand accents.

## Available Modules (${COMPONENT_META.length})
${COMPONENT_META.map((c) => `- **${c.name}** (${c.title}): ${c.description}\n  - Variants: \`${c.variants.join('`, `')}\`\n  - Direct CSS: ${SERVER_URL}/src/${c.file}`).join('\n')}
`;

const llmsFullTxt = `${llmsTxt}

==========================================================================
COMPLETE COMPONENT SYNTAX & HTML TEMPLATES FOR AI CODE GENERATION
==========================================================================

### 1. Layout & 12-Column Grid (grid)
- Container: \`<div class="leli-container">...</div>\` (or \`.leli-container-narrow\`, \`.leli-container-fluid\`)
- 12-Col Row: \`<div class="leli-row leli-g-3"><div class="leli-col-12 leli-col-md-6 leli-col-lg-4">...</div></div>\`
- Auto Row Columns: \`<div class="leli-row leli-row-cols-2 leli-row-cols-md-4">...</div>\`
- Auto-Fit CSS Grid (Zero media queries): \`<div class="leli-grid-auto-md">...</div>\`
- Bento Grid:
  \`\`\`html
  <div class="leli-bento">
    <div class="leli-bento-item leli-bento-hero">Hero 2x2</div>
    <div class="leli-bento-item leli-bento-tall">Tall 1x2</div>
    <div class="leli-bento-item leli-bento-wide">Wide 2x1</div>
  </div>
  \`\`\`
- Page Shells: \`.leli-layout-sidebar\`, \`.leli-layout-holy-grail\`, \`.leli-layout-split\`

### 2. Header & Navbar (navbar)
\`\`\`html
<header class="leli-navbar" data-position="sticky" data-variant="glass">
  <a href="#" class="leli-navbar-brand">BrandName</a>
  <ul class="leli-navbar-nav">
    <li><a href="#" class="leli-nav-link is-active">Home</a></li>
    <li><a href="#" class="leli-nav-link">Docs</a></li>
  </ul>
  <div class="leli-navbar-actions">
    <button class="leli-btn leli-btn-sm leli-btn-primary">Get Started</button>
  </div>
</header>
\`\`\`

### 3. Button & Button Group (button)
Variants: \`solid\`, \`outlined\`, \`soft\`, \`ghost\`, \`glass\`, \`gradient\`, \`brutal\`, \`link\`
Sizes: \`sm\`, \`md\`, \`lg\`, \`xl\`, \`icon\`
\`\`\`html
<!-- Solid Primary Button -->
<button class="leli-btn" data-variant="solid">Save Changes</button>

<!-- Outlined Button with Size -->
<button class="leli-btn" data-variant="outlined" data-size="sm">Cancel</button>

<!-- Loading State Button -->
<button class="leli-btn is-loading" data-variant="solid">Loading</button>

<!-- Button Group -->
<div class="leli-btn-group" role="group">
  <button class="leli-btn">Left</button>
  <button class="leli-btn">Middle</button>
  <button class="leli-btn">Right</button>
</div>
\`\`\`

### 4. Form Inputs & Floating Labels (input)
Variants: \`default\`, \`glass\`, \`soft\`, \`brutal\`, \`floating-label\`, \`input-group\`
Validation: Uses modern CSS \`:user-valid\` and \`:user-invalid\` (only triggers after user interaction).
\`\`\`html
<!-- Standard Field with Hint and Error -->
<div class="leli-field">
  <label class="leli-label" for="user-email">Email Address <span class="leli-required">*</span></label>
  <span class="leli-hint">We will never share your email with third parties.</span>
  <input type="email" id="user-email" class="leli-input" placeholder="you@example.com" required autocomplete="email">
  <div class="leli-error-msg">Please enter a valid email address.</div>
  <div class="leli-success-msg">Looks good!</div>
</div>

<!-- Input Group with Addons -->
<div class="leli-input-group">
  <span class="leli-addon">https://</span>
  <input type="text" class="leli-input" placeholder="subdomain.domain.com">
  <button class="leli-btn" data-variant="solid">Connect</button>
</div>

<!-- Floating Label Field -->
<div class="leli-field-floating">
  <input type="text" id="fl-username" class="leli-input" placeholder="Your Name" required>
  <label class="leli-label" for="fl-username">Your Name</label>
</div>
\`\`\`

### 5. Switch, Checkbox & Radio (form-controls)
\`\`\`html
<!-- Toggle Switch -->
<label class="leli-switch">
  <input type="checkbox" checked>
  <span>Enable Notifications</span>
</label>

<!-- Custom Checkbox -->
<label class="leli-checkbox">
  <input type="checkbox" checked>
  <span>Remember this device</span>
</label>

<!-- Choice Card Option -->
<label class="leli-choice-card">
  <span class="leli-radio">
    <input type="radio" name="plan" checked>
  </span>
  <div>
    <span class="leli-choice-title">Pro Plan (\$29/mo)</span>
    <span class="leli-choice-desc">Unlimited projects and team members.</span>
  </div>
</label>
\`\`\`

### 6. Badges & Status Indicators (badge)
Variants: \`solid\`, \`soft\`, \`outlined\`, \`glass\`, \`brutal\`, \`pill\`
\`\`\`html
<span class="leli-badge" data-variant="solid">New</span>
<span class="leli-badge is-pill" data-accent="success"><span class="leli-dot"></span> Online</span>
<span class="leli-badge" data-accent="danger">Error</span>
\`\`\`

### 7. Modal & Dialog (modal)
Accessible native \`<dialog>\` supporting \`closedby="any"\` light dismiss and \`@starting-style\` entry/exit animations.
\`\`\`html
<!-- Trigger Button -->
<button class="leli-btn" data-variant="solid" data-modal-target="demoModal">Open Modal</button>

<!-- Modal Dialog -->
<dialog id="demoModal" class="leli-modal" closedby="any" aria-labelledby="modalTitle">
  <div class="leli-modal-header">
    <h3 id="modalTitle" class="leli-modal-title">Account Settings</h3>
    <button type="button" class="leli-modal-close" aria-label="Close dialog">&times;</button>
  </div>
  <div class="leli-modal-body">
    <p>Modal content with Sakura Pink accents and smooth animations.</p>
  </div>
  <div class="leli-modal-footer">
    <button type="button" class="leli-btn" data-variant="outlined" data-modal-close="demoModal">Cancel</button>
    <button type="button" class="leli-btn" data-variant="solid">Save Changes</button>
  </div>
</dialog>
\`\`\`

### 8. Toast Notifications (toast)
\`\`\`javascript
// Trigger via JavaScript API
LeliUI.Toast.show({
  title: 'Saved Successfully',
  message: 'Your profile preferences have been updated.',
  type: 'success', // 'primary', 'success', 'warning', 'danger'
  duration: 4000,
  position: 'top-right'
});

// Or quick shortcuts:
LeliUI.Toast.success('File uploaded successfully!');
LeliUI.Toast.error('Failed to connect to database.');
\`\`\`

### 9. Card (card)
Variants: \`outlined\`, \`elevated\`, \`soft\`, \`glass\`, \`gradient\`, \`brutal\`, \`accent-top\`
\`\`\`html
<article class="leli-card" data-variant="outlined">
  <div class="leli-card-header">
    <div>
      <h3 class="leli-card-title">Title</h3>
      <p class="leli-card-subtitle">Subtitle</p>
    </div>
    <span class="leli-badge" data-accent="success">Active</span>
  </div>
  <div class="leli-card-body">Main content body.</div>
  <div class="leli-card-footer">
    <button class="leli-btn leli-btn-sm" data-variant="solid">Action</button>
  </div>
</article>
\`\`\`

### 10. Tabs (tabs)
Variants: \`underline\`, \`segmented\`, \`pills\`, \`soft\`, \`lifted\`, \`brutal\`
\`\`\`html
<div class="leli-tabs" data-variant="underline">
  <div class="leli-tab-list" role="tablist">
    <button class="leli-tab is-active" role="tab" aria-selected="true" aria-controls="panel-1">Tab 1</button>
    <button class="leli-tab" role="tab" aria-selected="false" aria-controls="panel-2">Tab 2</button>
  </div>
  <div id="panel-1" class="leli-tab-panel"><div class="leli-tab-panel-inner">Content 1</div></div>
  <div id="panel-2" class="leli-tab-panel" hidden="until-found"><div class="leli-tab-panel-inner">Content 2</div></div>
</div>
\`\`\`

### 11. Accordion (accordion)
Variants: \`bordered\`, \`separated\`, \`flush\`, \`soft\`, \`glass\`, \`brutal\`
\`\`\`html
<div class="leli-accordion" data-variant="bordered">
  <details class="leli-accordion-item" name="faq-group" open>
    <summary class="leli-accordion-trigger">Section 1</summary>
    <div class="leli-accordion-content">Content 1</div>
  </details>
</div>
\`\`\`

### 12. Responsive Data Table (table)
Variants: \`default\`, \`striped\`, \`hoverable\`, \`bordered\`, \`glass\`, \`brutal\`
\`\`\`html
<div tabindex="0" role="region" class="leli-table-wrapper">
  <table class="leli-table" data-variant="striped hoverable">
    <thead>
      <tr>
        <th data-sortable="true">Name</th>
        <th data-sortable="true">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr><th>Sarah Jenkins</th><td>Engineer</td></tr>
    </tbody>
  </table>
</div>
\`\`\`

### 13. Pagination, Progress, Skeleton & Avatar
- Pagination: \`<div class="leli-pagination" data-variant="default"><button class="leli-page-item is-active" data-page="1">1</button></div>\`
- Progress: \`<div class="leli-progress" data-variant="striped animated" style="--progress-value: 75%;"><div class="leli-progress-bar"></div></div>\`
- Skeleton: \`<span class="leli-skeleton" data-shape="circle"></span>\`, \`data-shape="title | text | media | button"\`
- Avatar: \`<div class="leli-avatar" data-variant="solid" data-status="online">SJ</div>\`
`;

const aiManifest = {
  schema_version: '1.0',
  name_for_human: 'leliUI Component Library',
  name_for_model: 'leli_ui',
  version: VERSION,
  description_for_model:
    'Zero-dependency multi-variant HTML/CSS/JS UI component library with Sakura Pink theme and dark mode default. Use leliUI classes (.leli-container, .leli-row, .leli-col-*, .leli-bento, .leli-navbar, .leli-btn, .leli-input, .leli-switch, .leli-checkbox, .leli-badge, .leli-modal, .leli-toast, .leli-card, .leli-tabs, .leli-accordion, .leli-table, .leli-pagination, .leli-progress, .leli-skeleton, .leli-avatar) and data-variant attributes to build clean responsive interfaces.',
  endpoints: {
    llms_txt: `${SERVER_URL}/llms.txt`,
    llms_full_txt: `${SERVER_URL}/llms-full.txt`,
    registry_json: `${SERVER_URL}/registry/components.json`,
    css_bundle: `${SERVER_URL}/dist/leli.css`,
    js_bundle: `${SERVER_URL}/dist/leli.js`
  },
  components: COMPONENT_META.map((c) => ({
    name: c.name,
    title: c.title,
    category: c.category,
    variants: c.variants,
    jsRequired: c.jsRequired,
    css_url: `${SERVER_URL}/src/${c.file}`
  }))
};

fs.writeFileSync(path.join(ROOT, 'llms.txt'), llmsTxt, 'utf8');
fs.writeFileSync(path.join(ROOT, 'llms-full.txt'), llmsFullTxt, 'utf8');
fs.writeFileSync(path.join(ROOT, 'ai-manifest.json'), JSON.stringify(aiManifest, null, 2), 'utf8');

// 6. Update version badge in index.html if present
const indexPath = path.join(ROOT, 'index.html');
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');
  html = html.replace(/id="leliVersionBadge"[^>]*>v[0-9.]+</g, `id="leliVersionBadge">v${VERSION}<`);
  fs.writeFileSync(indexPath, html, 'utf8');
}

console.log(`[OK] leliUI v${VERSION} Build Complete (with AI llms.txt & ai-manifest.json):`);
console.log('   - dist/leli.css (' + (Buffer.byteLength(fullCss, 'utf8') / 1024).toFixed(1) + ' KB)');
console.log('   - dist/leli.js (' + (Buffer.byteLength(fs.readFileSync(path.join(DIST, 'leli.js')), 'utf8') / 1024).toFixed(1) + ' KB)');
console.log('   - registry/components.json (' + COMPONENT_META.length + ' components registered)');
