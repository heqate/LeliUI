const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Update Sidebar
const targetSidebar = `<div class="docs-nav-section">
        <div class="docs-nav-heading">Data & Layout Components</div>`;

const newSidebarSections = `<div class="docs-nav-section">
        <div class="docs-nav-heading">Forms & Actions</div>
        <button type="button" class="docs-nav-item" data-doc-page="button">Button & Group</button>
        <button type="button" class="docs-nav-item" data-doc-page="input">Inputs & Labels</button>
        <button type="button" class="docs-nav-item" data-doc-page="form-controls">Switch & Checkbox</button>
      </div>

      <div class="docs-nav-section">
        <div class="docs-nav-heading">Overlays & Feedback</div>
        <button type="button" class="docs-nav-item" data-doc-page="modal">Modal Dialog</button>
        <button type="button" class="docs-nav-item" data-doc-page="toast">Toast Notification</button>
        <button type="button" class="docs-nav-item" data-doc-page="badge">Badges & Tags</button>
      </div>

      <div class="docs-nav-section">
        <div class="docs-nav-heading">Data & Layout Components</div>`;

if (!content.includes('data-doc-page="button"')) {
  content = content.replace(targetSidebar, newSidebarSections);
}

// 2. Add Documentation Pages
const newPagesCode = `,

      button: {
        category: 'Forms & Actions',
        title: 'Button & Button Group',
        lead: 'Multi-variant interactive buttons with Sakura Pink focus states, loading spinners, size scales, and joined button groups.',
        content: \`
          <section class="bd-section" id="sec-btn-variants">
            <h2 class="bd-heading">1. Button Variants</h2>
            <p class="bd-text">Switch visual appearances using <code>data-variant="solid | outlined | soft | ghost | glass | brutal"</code>:</p>
            \${exampleBox(
              \`<div class="leli-cluster">
                <button type="button" class="leli-btn" data-variant="solid">Solid (Brand)</button>
                <button type="button" class="leli-btn" data-variant="outlined">Outlined</button>
                <button type="button" class="leli-btn" data-variant="soft">Soft Pink</button>
                <button type="button" class="leli-btn" data-variant="ghost">Ghost</button>
                <button type="button" class="leli-btn" data-variant="glass">Glass</button>
                <button type="button" class="leli-btn" data-variant="brutal">Brutal</button>
              </div>\`,
              \`<button class="leli-btn" data-variant="solid">Solid (Brand)</button>\\n<button class="leli-btn" data-variant="outlined">Outlined</button>\\n<button class="leli-btn" data-variant="soft">Soft Pink</button>\\n<button class="leli-btn" data-variant="ghost">Ghost</button>\\n<button class="leli-btn" data-variant="glass">Glass</button>\\n<button class="leli-btn" data-variant="brutal">Brutal</button>\`
            )}
          </section>

          <section class="bd-section" id="sec-btn-sizes">
            <h2 class="bd-heading">2. Button Sizes</h2>
            <p class="bd-text">Scale buttons uniformly with <code>data-size="sm | md | lg | xl"</code> or use icon buttons:</p>
            \${exampleBox(
              \`<div class="leli-cluster leli-items-center">
                <button type="button" class="leli-btn" data-variant="solid" data-size="sm">Small</button>
                <button type="button" class="leli-btn" data-variant="solid">Default (md)</button>
                <button type="button" class="leli-btn" data-variant="solid" data-size="lg">Large</button>
                <button type="button" class="leli-btn" data-variant="solid" data-size="xl">Extra Large</button>
              </div>\`,
              \`<button class="leli-btn" data-variant="solid" data-size="sm">Small</button>\\n<button class="leli-btn" data-variant="solid">Default</button>\\n<button class="leli-btn" data-variant="solid" data-size="lg">Large</button>\\n<button class="leli-btn" data-variant="solid" data-size="xl">Extra Large</button>\`
            )}
          </section>

          <section class="bd-section" id="sec-btn-states">
            <h2 class="bd-heading">3. States (Loading & Disabled)</h2>
            <p class="bd-text">Add <code>.is-loading</code> to display an accessible, centered Sakura spinner, or <code>disabled</code> to prevent clicks:</p>
            \${exampleBox(
              \`<div class="leli-cluster">
                <button type="button" class="leli-btn is-loading" data-variant="solid">Saving</button>
                <button type="button" class="leli-btn" data-variant="solid" disabled>Disabled Solid</button>
                <button type="button" class="leli-btn" data-variant="outlined" disabled>Disabled Outlined</button>
              </div>\`,
              \`<button class="leli-btn is-loading" data-variant="solid">Saving</button>\\n<button class="leli-btn" data-variant="solid" disabled>Disabled Solid</button>\`
            )}
          </section>

          <section class="bd-section" id="sec-btn-group">
            <h2 class="bd-heading">4. Button Group</h2>
            <p class="bd-text">Join multiple buttons together into a single cohesive control group using <code>.leli-btn-group</code>:</p>
            \${exampleBox(
              \`<div class="leli-cluster">
                <div class="leli-btn-group" role="group" aria-label="Action options">
                  <button type="button" class="leli-btn">Years</button>
                  <button type="button" class="leli-btn" data-variant="solid">Months</button>
                  <button type="button" class="leli-btn">Days</button>
                </div>
              </div>\`,
              \`<div class="leli-btn-group" role="group">\\n  <button class="leli-btn">Years</button>\\n  <button class="leli-btn" data-variant="solid">Months</button>\\n  <button class="leli-btn">Days</button>\\n</div>\`
            )}
          </section>
        \`
      },

      input: {
        category: 'Forms & Actions',
        title: 'Form Inputs & Floating Labels',
        lead: 'Modern HTML5 form inputs, textareas, custom selects, and input groups with native :user-valid and :user-invalid state feedback.',
        content: \`
          <div class="bd-callout">
            <strong>Modern Non-Premature Validation</strong>
            leliUI uses modern CSS <code>:user-valid</code> and <code>:user-invalid</code> pseudo-classes. Error states are never shown while the user is first typing—only after blurring or submitting!
          </div>

          <section class="bd-section" id="sec-input-basic">
            <h2 class="bd-heading">1. Standard Field with Validation</h2>
            <p class="bd-text">Try typing an invalid email below and clicking away to see the Sakura Pink/Red validation ring and error message:</p>
            \${exampleBox(
              \`<div class="leli-row">
                <div class="leli-col-12 leli-col-md-6">
                  <div class="leli-field">
                    <label class="leli-label" for="demo-email">Email Address <span class="leli-required">*</span></label>
                    <span class="leli-hint">Format: name@domain.com</span>
                    <input type="email" id="demo-email" class="leli-input" placeholder="you@domain.com" required autocomplete="email">
                    <div class="leli-error-msg"><span aria-hidden="true">✕</span> Please provide a valid email address.</div>
                    <div class="leli-success-msg"><span aria-hidden="true">✓</span> Email format is valid!</div>
                  </div>
                </div>
                <div class="leli-col-12 leli-col-md-6">
                  <div class="leli-field">
                    <label class="leli-label" for="demo-password">Password <span class="leli-required">*</span></label>
                    <span class="leli-hint">Must be at least 6 characters</span>
                    <input type="password" id="demo-password" class="leli-input" placeholder="••••••••" required minlength="6">
                    <div class="leli-error-msg"><span aria-hidden="true">✕</span> Minimum 6 characters required.</div>
                  </div>
                </div>
              </div>\`,
              \`<div class="leli-field">\\n  <label class="leli-label" for="user-email">Email Address <span class="leli-required">*</span></label>\\n  <span class="leli-hint">Format: name@domain.com</span>\\n  <input type="email" id="user-email" class="leli-input" placeholder="you@domain.com" required autocomplete="email">\\n  <div class="leli-error-msg">Please provide a valid email address.</div>\\n  <div class="leli-success-msg">Email format is valid!</div>\\n</div>\`
            )}
          </section>

          <section class="bd-section" id="sec-input-groups">
            <h2 class="bd-heading">2. Input Groups & Addons</h2>
            <p class="bd-text">Attach prefixes, suffixes, or action buttons directly to inputs with <code>.leli-input-group</code>:</p>
            \${exampleBox(
              \`<div class="leli-stack" style="max-width: 480px;">
                <div class="leli-input-group">
                  <span class="leli-addon">https://</span>
                  <input type="text" class="leli-input" placeholder="your-site.com">
                </div>
                <div class="leli-input-group">
                  <input type="text" class="leli-input" placeholder="Search components...">
                  <button type="button" class="leli-btn" data-variant="solid">Search</button>
                </div>
              </div>\`,
              \`<div class="leli-input-group">\\n  <span class="leli-addon">https://</span>\\n  <input type="text" class="leli-input" placeholder="your-site.com">\\n</div>\\n\\n<div class="leli-input-group">\n  <input type="text" class="leli-input" placeholder="Search components...">\\n  <button class="leli-btn" data-variant="solid">Search</button>\\n</div>\`
            )}
          </section>

          <section class="bd-section" id="sec-input-floating">
            <h2 class="bd-heading">3. Floating Labels</h2>
            <p class="bd-text">Labels that glide effortlessly to the top edge when focused using pure modern CSS:</p>
            \${exampleBox(
              \`<div class="leli-row" style="max-width: 600px;">
                <div class="leli-col-12 leli-col-md-6">
                  <div class="leli-field-floating">
                    <input type="text" id="fl-name" class="leli-input" placeholder="Name" required>
                    <label class="leli-label" for="fl-name">Full Name</label>
                  </div>
                </div>
                <div class="leli-col-12 leli-col-md-6">
                  <div class="leli-field-floating">
                    <input type="text" id="fl-company" class="leli-input" placeholder="Company" required>
                    <label class="leli-label" for="fl-company">Company</label>
                  </div>
                </div>
              </div>\`,
              \`<div class="leli-field-floating">\\n  <input type="text" id="fl-name" class="leli-input" placeholder="Name" required>\\n  <label class="leli-label" for="fl-name">Full Name</label>\\n</div>\`
            )}
          </section>

          <section class="bd-section" id="sec-select-textarea">
            <h2 class="bd-heading">4. Custom Select & Textarea</h2>
            <p class="bd-text">Styled native select with Sakura Pink arrow indicator and resizable textarea:</p>
            \${exampleBox(
              \`<div class="leli-row" style="max-width: 600px;">
                <div class="leli-col-12 leli-col-md-6">
                  <div class="leli-field">
                    <label class="leli-label">Framework</label>
                    <select class="leli-select">
                      <option>Vanilla HTML / CSS</option>
                      <option>React / Next.js</option>
                      <option>Vue / Nuxt</option>
                      <option>Svelte</option>
                    </select>
                  </div>
                </div>
                <div class="leli-col-12">
                  <div class="leli-field">
                    <label class="leli-label">Project Bio</label>
                    <textarea class="leli-textarea" rows="3" placeholder="Tell us about what you are building..."></textarea>
                  </div>
                </div>
              </div>\`,
              \`<select class="leli-select">\\n  <option>Vanilla HTML / CSS</option>\\n  <option>React</option>\\n</select>\\n\\n<textarea class="leli-textarea" rows="3"></textarea>\`
            )}
          </section>
        \`
      },

      'form-controls': {
        category: 'Forms & Actions',
        title: 'Switch, Checkbox & Radio',
        lead: 'Zero-JS accessible toggles, custom SVG checkboxes, radio buttons, and interactive choice cards.',
        content: \`
          <section class="bd-section" id="sec-switches">
            <h2 class="bd-heading">1. Toggle Switches (.leli-switch)</h2>
            <p class="bd-text">Smooth sliding toggle switches available in small, medium, large, and brutal variants:</p>
            \${exampleBox(
              \`<div class="leli-stack" style="gap: 1.25rem;">
                <label class="leli-switch">
                  <input type="checkbox" checked>
                  <span>Email notifications (Default)</span>
                </label>
                <label class="leli-switch" data-size="sm">
                  <input type="checkbox" checked>
                  <span>Compact switch (sm)</span>
                </label>
                <label class="leli-switch" data-size="lg">
                  <input type="checkbox" checked>
                  <span>Large switch (lg)</span>
                </label>
                <label class="leli-switch" data-variant="brutal">
                  <input type="checkbox" checked>
                  <span>Neo-brutalist switch</span>
                </label>
              </div>\`,
              \`<label class="leli-switch">\\n  <input type="checkbox" checked>\\n  <span>Email notifications</span>\\n</label>\\n\\n<label class="leli-switch" data-size="sm">\\n  <input type="checkbox" checked>\\n  <span>Compact switch</span>\\n</label>\`
            )}
          </section>

          <section class="bd-section" id="sec-checkboxes-radios">
            <h2 class="bd-heading">2. Checkboxes & Radio Buttons</h2>
            <p class="bd-text">Accessible native checkboxes and radios styled with Sakura Pink checkmarks and dots:</p>
            \${exampleBox(
              \`<div class="leli-row">
                <div class="leli-col-12 leli-col-md-6">
                  <div class="leli-stack" style="gap: 0.85rem;">
                    <label class="leli-checkbox">
                      <input type="checkbox" checked>
                      <span>Enable dark mode sync</span>
                    </label>
                    <label class="leli-checkbox">
                      <input type="checkbox">
                      <span>Send weekly summary</span>
                    </label>
                    <label class="leli-checkbox">
                      <input type="checkbox" disabled checked>
                      <span>Locked preference (Disabled)</span>
                    </label>
                  </div>
                </div>
                <div class="leli-col-12 leli-col-md-6">
                  <div class="leli-stack" style="gap: 0.85rem;">
                    <label class="leli-radio">
                      <input type="radio" name="demo-radio" value="1" checked>
                      <span>Public repository</span>
                    </label>
                    <label class="leli-radio">
                      <input type="radio" name="demo-radio" value="2">
                      <span>Internal team only</span>
                    </label>
                    <label class="leli-radio">
                      <input type="radio" name="demo-radio" value="3">
                      <span>Private / Confidential</span>
                    </label>
                  </div>
                </div>
              </div>\`,
              \`<label class="leli-checkbox">\\n  <input type="checkbox" checked>\\n  <span>Enable dark mode sync</span>\\n</label>\\n\\n<label class="leli-radio">\\n  <input type="radio" name="visibility" checked>\\n  <span>Public repository</span>\\n</label>\`
            )}
          </section>

          <section class="bd-section" id="sec-choice-cards">
            <h2 class="bd-heading">3. Interactive Choice Cards</h2>
            <p class="bd-text">Selection cards with modern <code>:has()</code> highlight states:</p>
            \${exampleBox(
              \`<div class="leli-row leli-g-2">
                <div class="leli-col-12 leli-col-md-6">
                  <label class="leli-choice-card">
                    <span class="leli-radio"><input type="radio" name="tier" checked></span>
                    <div>
                      <span class="leli-choice-title">Starter Plan (Free)</span>
                      <span class="leli-choice-desc">Best for personal prototypes and indie projects.</span>
                    </div>
                  </label>
                </div>
                <div class="leli-col-12 leli-col-md-6">
                  <label class="leli-choice-card">
                    <span class="leli-radio"><input type="radio" name="tier"></span>
                    <div>
                      <span class="leli-choice-title">Enterprise (\$49/mo)</span>
                      <span class="leli-choice-desc">Dedicated support, SLAs, and custom AI tools.</span>
                    </div>
                  </label>
                </div>
              </div>\`,
              \`<label class="leli-choice-card">\\n  <span class="leli-radio"><input type="radio" name="tier" checked></span>\\n  <div>\\n    <span class="leli-choice-title">Starter Plan (Free)</span>\\n    <span class="leli-choice-desc">Best for personal prototypes.</span>\\n  </div>\\n</label>\`
            )}
          </section>
        \`
      },

      modal: {
        category: 'Overlays & Feedback',
        title: 'Modal Dialog Component',
        lead: 'Modern HTML5 <dialog> with smooth @starting-style top-layer entry/exit transitions, light dismiss (closedby="any"), and zero layout reflows.',
        content: \`
          <div class="bd-callout">
            <strong>Native Top Layer & Light Dismiss</strong>
            leliUI modals use the official browser <code>&lt;dialog&gt;</code> element with <code>closedby="any"</code>. Clicking the blurred backdrop or pressing <kbd>Esc</kbd> automatically dismisses the dialog!
          </div>

          <section class="bd-section" id="sec-modal-demo">
            <h2 class="bd-heading">1. Interactive Live Modals</h2>
            <p class="bd-text">Click the buttons below to trigger live dialog modals:</p>
            \${exampleBox(
              \`<div class="leli-cluster">
                <button type="button" class="leli-btn" data-variant="solid" data-modal-target="demoModalStandard">Open Standard Modal</button>
                <button type="button" class="leli-btn" data-variant="glass" data-modal-target="demoModalGlass">Open Glass Modal</button>
                <button type="button" class="leli-btn" data-variant="brutal" data-modal-target="demoModalBrutal">Open Brutal Modal</button>
              </div>

              <!-- Standard Modal -->
              <dialog id="demoModalStandard" class="leli-modal" closedby="any" aria-labelledby="stdModalTitle">
                <div class="leli-modal-header">
                  <h3 id="stdModalTitle" class="leli-modal-title">Edit Project Details</h3>
                  <button type="button" class="leli-modal-close" aria-label="Close dialog">&times;</button>
                </div>
                <div class="leli-modal-body">
                  <p>Welcome to <strong>leliUI Modals</strong>! This dialog rendered in the native top layer with automatic backdrop blur, focus trapping, and keyboard escape handling.</p>
                  <div class="leli-field" style="margin-top: 1rem; margin-bottom: 0;">
                    <label class="leli-label">Project Name</label>
                    <input type="text" class="leli-input" value="leliUI Sakura Core">
                  </div>
                </div>
                <div class="leli-modal-footer">
                  <button type="button" class="leli-btn" data-variant="outlined" data-modal-close="demoModalStandard">Cancel</button>
                  <button type="button" class="leli-btn" data-variant="solid" onclick="LeliUI.Modal.close('demoModalStandard'); LeliUI.Toast.success('Project details saved!');">Save Changes</button>
                </div>
              </dialog>

              <!-- Glass Modal -->
              <dialog id="demoModalGlass" class="leli-modal" data-variant="glass" closedby="any">
                <div class="leli-modal-header">
                  <h3 class="leli-modal-title">Glassmorphism Overlay</h3>
                  <button type="button" class="leli-modal-close" aria-label="Close dialog">&times;</button>
                </div>
                <div class="leli-modal-body">
                  <p>Glass variant with 20px frosted backdrop filter and glowing Sakura Pink border accents.</p>
                </div>
                <div class="leli-modal-footer">
                  <button type="button" class="leli-btn" data-variant="solid" data-modal-close="demoModalGlass">Close</button>
                </div>
              </dialog>

              <!-- Brutal Modal -->
              <dialog id="demoModalBrutal" class="leli-modal" data-variant="brutal" closedby="any">
                <div class="leli-modal-header">
                  <h3 class="leli-modal-title">Neo-Brutalist Dialog</h3>
                  <button type="button" class="leli-modal-close" aria-label="Close dialog">&times;</button>
                </div>
                <div class="leli-modal-body">
                  <p>Bold 3px solid black outlines with hard drop shadow.</p>
                </div>
                <div class="leli-modal-footer">
                  <button type="button" class="leli-btn" data-variant="brutal" data-modal-close="demoModalBrutal">Understood</button>
                </div>
              </dialog>\`,
              \`<!-- Trigger Button -->\\n<button class="leli-btn" data-variant="solid" data-modal-target="myDialog">Open Modal</button>\\n\\n<!-- Native <dialog> Modal -->\\n<dialog id="myDialog" class="leli-modal" closedby="any" aria-labelledby="dialogTitle">\\n  <div class="leli-modal-header">\\n    <h3 id="dialogTitle" class="leli-modal-title">Modal Title</h3>\\n    <button type="button" class="leli-modal-close" aria-label="Close">&times;</button>\\n  </div>\\n  <div class="leli-modal-body">\\n    <p>Modal body content.</p>\\n  </div>\\n  <div class="leli-modal-footer">\n    <button class="leli-btn" data-variant="outlined" data-modal-close="myDialog">Cancel</button>\\n    <button class="leli-btn" data-variant="solid">Confirm</button>\\n  </div>\\n</dialog>\`
            )}
          </section>

          <section class="bd-section" id="sec-modal-js">
            <h2 class="bd-heading">2. JavaScript API</h2>
            <p class="bd-text">Programmatically control modals using <code>LeliUI.Modal</code>:</p>
            \${exampleBox('', \`// Open a modal\\nLeliUI.Modal.open('myDialogId');\\n\\n// Close a modal (with smooth @starting-style exit animation)\\nLeliUI.Modal.close('myDialogId');\`, 'javascript')}
          </section>
        \`
      },

      toast: {
        category: 'Overlays & Feedback',
        title: 'Toast Notification System',
        lead: 'Lightweight, event-driven floating toast notifications with auto-dismiss countdown progress bar and corner positioning.',
        content: \`
          <section class="bd-section" id="sec-toast-live">
            <h2 class="bd-heading">1. Interactive Toast Demos</h2>
            <p class="bd-text">Click any of the buttons below to generate live toasts:</p>
            \${exampleBox(
              \`<div class="leli-cluster">
                <button type="button" class="leli-btn" data-variant="solid" onclick="LeliUI.Toast.success('Files successfully deployed to GCP VDS.', 'Build Succeeded!')">Show Success Toast</button>
                <button type="button" class="leli-btn" data-variant="soft" onclick="LeliUI.Toast.info('New components registered in registry/components.json.', 'Library Update')">Show Info Toast</button>
                <button type="button" class="leli-btn" data-variant="outlined" onclick="LeliUI.Toast.warning('Database storage reached 84% capacity.', 'Storage Warning')">Show Warning Toast</button>
                <button type="button" class="leli-btn" data-variant="brutal" onclick="LeliUI.Toast.error('Could not authenticate SSH session on port 22.', 'Connection Error')">Show Error Toast</button>
              </div>\`,
              \`// Trigger toasts with clean helper functions:\\nLeliUI.Toast.success('Operation completed successfully!', 'Success');\\nLeliUI.Toast.info('Here is some useful context.', 'Information');\\nLeliUI.Toast.warning('Please review your quota.', 'Warning');\\nLeliUI.Toast.error('Something went wrong.', 'Error');\`
            )}
          </section>

          <section class="bd-section" id="sec-toast-api">
            <h2 class="bd-heading">2. Full Configuration API</h2>
            <p class="bd-text">Customize toast duration, title, type, and screen positioning:</p>
            \${exampleBox('', \`LeliUI.Toast.show({\\n  title: 'Notification Title',\\n  message: 'Your custom notification message here.',\\n  type: 'primary', // 'primary' | 'success' | 'warning' | 'danger'\\n  duration: 4000,   // milliseconds (0 = sticky / no auto dismiss)\\n  position: 'top-right', // 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left'\\n  dismissible: true\\n});\`, 'javascript')}
          </section>
        \`
      },

      badge: {
        category: 'Overlays & Feedback',
        title: 'Badge & Status Indicator',
        lead: 'Pill tags, live pulsing status indicators, count badges, and removable tags with semantic color accents.',
        content: \`
          <section class="bd-section" id="sec-badge-variants">
            <h2 class="bd-heading">1. Badge Variants</h2>
            <p class="bd-text">Use <code>data-variant="solid | soft | outlined | glass | brutal"</code>:</p>
            \${exampleBox(
              \`<div class="leli-cluster">
                <span class="leli-badge" data-variant="solid">Solid (Brand)</span>
                <span class="leli-badge" data-variant="soft">Soft Pink</span>
                <span class="leli-badge" data-variant="outlined">Outlined</span>
                <span class="leli-badge" data-variant="glass">Glass</span>
                <span class="leli-badge" data-variant="brutal">Brutal</span>
              </div>\`,
              \`<span class="leli-badge" data-variant="solid">Solid</span>\\n<span class="leli-badge" data-variant="soft">Soft Pink</span>\\n<span class="leli-badge" data-variant="outlined">Outlined</span>\\n<span class="leli-badge" data-variant="glass">Glass</span>\\n<span class="leli-badge" data-variant="brutal">Brutal</span>\`
            )}
          </section>

          <section class="bd-section" id="sec-badge-accents">
            <h2 class="bd-heading">2. Semantic Accents & Status Dots</h2>
            <p class="bd-text">Combine semantic accents with internal dots or standalone pulsing dots:</p>
            \${exampleBox(
              \`<div class="leli-cluster leli-items-center">
                <span class="leli-badge" data-accent="success"><span class="leli-dot"></span> Online</span>
                <span class="leli-badge" data-accent="warning"><span class="leli-dot"></span> In Progress</span>
                <span class="leli-badge" data-accent="danger"><span class="leli-dot"></span> Offline</span>
                <span class="leli-badge" data-accent="info"><span class="leli-dot"></span> Reviewing</span>
                <span class="leli-badge is-pill" data-variant="solid">99+</span>
                <span class="leli-status-dot" title="Live status"></span>
              </div>\`,
              \`<span class="leli-badge" data-accent="success"><span class="leli-dot"></span> Online</span>\\n<span class="leli-badge" data-accent="warning"><span class="leli-dot"></span> In Progress</span>\\n<span class="leli-badge" data-accent="danger"><span class="leli-dot"></span> Offline</span>\\n<span class="leli-badge is-pill" data-variant="solid">99+</span>\\n<span class="leli-status-dot"></span>\`
            )}
          </section>

          <section class="bd-section" id="sec-badge-removable">
            <h2 class="bd-heading">3. Removable Tag Badges</h2>
            <p class="bd-text">Include a <code>.leli-badge-remove</code> button for filter tags and interactive chips:</p>
            \${exampleBox(
              \`<div class="leli-cluster">
                <span class="leli-badge" data-variant="soft">React <button type="button" class="leli-badge-remove" onclick="this.parentElement.remove()">&times;</button></span>
                <span class="leli-badge" data-variant="soft">TypeScript <button type="button" class="leli-badge-remove" onclick="this.parentElement.remove()">&times;</button></span>
                <span class="leli-badge" data-variant="soft">Sakura Pink <button type="button" class="leli-badge-remove" onclick="this.parentElement.remove()">&times;</button></span>
              </div>\`,
              \`<span class="leli-badge" data-variant="soft">\\n  React <button class="leli-badge-remove" onclick="this.parentElement.remove()">&times;</button>\\n</span>\`
            )}
          </section>
        \`
      }
`;

// Insert right before `const PAGE_KEYS = Object.keys(PAGES);`
const targetPageEnd = 'const PAGE_KEYS = Object.keys(PAGES);';
if (!content.includes('button: {')) {
  content = content.replace(targetPageEnd, newPagesCode + '\n    };\n\n    ' + targetPageEnd);
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully updated index.html with new components and sidebar links.');
