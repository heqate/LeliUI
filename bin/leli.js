#!/usr/bin/env node

/**
 * ==========================================================================
 * leliUI CLI Tool (npx leli / node bin/leli.js)
 * Zero-dependency, shadcn-style CLI package manager to initialize and pull
 * leliUI components into any web project directly from your terminal.
 * ==========================================================================
 */

const fs = require('fs');
const path = require('path');

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  indigo: '\x1b[38;5;99m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
};

const REGISTRY_PATH = path.resolve(__dirname, '..', 'registry', 'components.json');

function loadRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    console.error(`${C.red}✖ Error: Component registry (registry/components.json) not found. Run 'node scripts/build.js' first.${C.reset}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
}

function printBanner() {
  console.log(`
${C.bold}  leliUI CLI — Modern Zero-Dependency Multi-Variant UI Library${C.reset}
  -------------------------------------------------------------`);
}

function printHelp() {
  printBanner();
  console.log(`${C.bold}Usage:${C.reset}
  ${C.cyan}npx leli <command> [options]${C.reset}

${C.bold}Commands:${C.reset}
  ${C.green}init${C.reset} [target-dir]            Installs leliUI core (core CSS & runtime JS) into your project
  ${C.green}add${C.reset} <component...> [--dir path] Pulls specified components (or ${C.yellow}--all${C.reset}) into your project
  ${C.green}list${C.reset}                         Lists all available components and their variants
  ${C.green}info${C.reset} <component>             Shows detailed metadata and variant specs for a component
  ${C.green}bundle${C.reset} [target-dir]          Exports the complete standalone library (leli.css + leli.js)

${C.bold}Examples:${C.reset}
  ${C.dim}$${C.reset} npx leli init
  ${C.dim}$${C.reset} npx leli add card table tabs avatar button modal
  ${C.dim}$${C.reset} npx leli add --all --dir ./ui
  ${C.dim}$${C.reset} npx leli list
`);
}

function getTargetDir(args) {
  const dirIndex = args.indexOf('--dir');
  if (dirIndex !== -1 && args[dirIndex + 1]) {
    return path.resolve(process.cwd(), args[dirIndex + 1]);
  }
  const configPath = path.resolve(process.cwd(), 'leli.config.json');
  if (fs.existsSync(configPath)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (cfg.outDir) return path.resolve(process.cwd(), cfg.outDir);
    } catch (_) {}
  }
  return path.resolve(process.cwd(), 'leli-ui');
}

function cmdList() {
  const reg = loadRegistry();
  printBanner();
  console.log(`\n${C.bold}Available Components (${Object.keys(reg.components).length} total):${C.reset}\n`);
  for (const [key, comp] of Object.entries(reg.components)) {
    const jsBadge = comp.jsRequired ? `${C.yellow}[CSS + JS]${C.reset}` : `${C.green}[Pure CSS]${C.reset}`;
    console.log(`  ${C.cyan}${C.bold}${key.padEnd(14)}${C.reset} ${jsBadge}  ${comp.title}`);
    console.log(`  ${''.padEnd(14)} ${C.dim}${comp.description}${C.reset}`);
    console.log(`  ${''.padEnd(14)} Variants: ${comp.variants.join(', ')}\n`);
  }
  console.log(`${C.bold}Quick install tip:${C.reset} Run ${C.cyan}npx leli add card table tabs button modal${C.reset}`);
}

function cmdInfo(compName) {
  const reg = loadRegistry();
  const comp = reg.components[compName];
  if (!comp) {
    console.error(`${C.red}✖ Component '${compName}' not found.${C.reset} To view all components: ${C.cyan}npx leli list${C.reset}`);
    process.exit(1);
  }
  printBanner();
  console.log(`${C.bold}${C.cyan}${comp.title} (${comp.name})${C.reset}`);
  console.log(`${comp.description}\n`);
  console.log(`  ${C.bold}Category:${C.reset}    ${comp.category}`);
  console.log(`  ${C.bold}Variants:${C.reset}    ${comp.variants.join(', ')}`);
  if (comp.sizes) console.log(`  ${C.bold}Sizes:${C.reset}       ${comp.sizes.join(', ')}`);
  if (comp.shapes) console.log(`  ${C.bold}Shapes:${C.reset}      ${comp.shapes.join(', ')}`);
  console.log(`  ${C.bold}JS Engine:${C.reset}   ${comp.jsRequired ? 'Required (interactive with leli.js)' : 'None (Zero-JS pure CSS)'}`);
  console.log(`\n${C.bold}Installation Command:${C.reset}\n  ${C.green}npx leli add ${comp.name}${C.reset}\n`);
}

function cmdInit(args) {
  const reg = loadRegistry();
  const targetDir = getTargetDir(args);
  printBanner();

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const coreCssPath = path.join(targetDir, 'leli-core.css');
  const coreJsPath = path.join(targetDir, 'leli.js');
  const configPath = path.resolve(process.cwd(), 'leli.config.json');

  fs.writeFileSync(coreCssPath, reg.core.css, 'utf8');
  fs.writeFileSync(coreJsPath, reg.core.js, 'utf8');

  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(
      configPath,
      JSON.stringify(
        {
          $schema: 'https://34.2.63.150:5000/schema.json',
          outDir: path.relative(process.cwd(), targetDir) || './leli-ui',
          defaultTheme: 'dark',
          installedComponents: []
        },
        null,
        2
      ),
      'utf8'
    );
  }

  console.log(`${C.green}✔ leliUI core setup completed successfully!${C.reset}`);
  console.log(`  ${C.dim}├─${C.reset} ${path.relative(process.cwd(), coreCssPath)}`);
  console.log(`  ${C.dim}├─${C.reset} ${path.relative(process.cwd(), coreJsPath)}`);
  console.log(`  ${C.dim}╰─${C.reset} leli.config.json\n`);
  console.log(`${C.bold}Now you can pull components:${C.reset}`);
  console.log(`  ${C.cyan}npx leli add card tabs table button modal toast${C.reset}\n`);
}

function cmdAdd(args) {
  const reg = loadRegistry();
  const targetDir = getTargetDir(args);
  const compDir = path.join(targetDir, 'components');

  const isAll = args.includes('--all') || args.includes('all');
  const requested = isAll
    ? Object.keys(reg.components)
    : args.filter((a, idx) => !a.startsWith('--') && args[idx - 1] !== '--dir');

  if (requested.length === 0) {
    console.error(`${C.red}✖ Please provide at least one component name or use --all.${C.reset}`);
    console.log(`  Example: ${C.cyan}npx leli add card table button modal${C.reset}`);
    process.exit(1);
  }

  printBanner();

  if (!fs.existsSync(compDir)) {
    fs.mkdirSync(compDir, { recursive: true });
  }

  // Ensure core files exist
  const coreCssPath = path.join(targetDir, 'leli-core.css');
  const coreJsPath = path.join(targetDir, 'leli.js');
  if (!fs.existsSync(coreCssPath)) {
    fs.writeFileSync(coreCssPath, reg.core.css, 'utf8');
    console.log(`${C.dim}ℹ Core styles generated: ${path.relative(process.cwd(), coreCssPath)}${C.reset}`);
  }
  if (!fs.existsSync(coreJsPath)) {
    fs.writeFileSync(coreJsPath, reg.core.js, 'utf8');
    console.log(`${C.dim}ℹ Runtime engine generated: ${path.relative(process.cwd(), coreJsPath)}${C.reset}`);
  }

  const added = [];
  for (const name of requested) {
    const key = name.toLowerCase();
    const comp = reg.components[key];
    if (!comp) {
      console.warn(`${C.yellow}⚠ '${name}' not found, skipping. (Available: ${Object.keys(reg.components).join(', ')})${C.reset}`);
      continue;
    }
    const destFile = path.join(compDir, `${key}.css`);
    fs.writeFileSync(destFile, comp.css, 'utf8');
    added.push(key);
    console.log(`${C.green}✔ Installed:${C.reset} ${C.bold}${comp.title}${C.reset} → ${C.cyan}${path.relative(process.cwd(), destFile)}${C.reset}`);
  }

  // Update index.css inside targetDir that imports core + installed components
  const installedFiles = fs.readdirSync(compDir).filter((f) => f.endsWith('.css'));
  const indexImports = [
    `/* leliUI Auto-Generated Entrypoint */`,
    `@import "./leli-core.css";`,
    ...installedFiles.map((f) => `@import "./components/${f}";`)
  ].join('\n');
  const entryCssPath = path.join(targetDir, 'index.css');
  fs.writeFileSync(entryCssPath, indexImports + '\n', 'utf8');

  // Update leli.config.json if present
  const configPath = path.resolve(process.cwd(), 'leli.config.json');
  if (fs.existsSync(configPath)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const set = new Set([...(cfg.installedComponents || []), ...added]);
      cfg.installedComponents = Array.from(set);
      fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2), 'utf8');
    } catch (_) {}
  }

  console.log(`\n${C.indigo}${C.bold}✨ Ready to go! Add these two lines to your HTML:${C.reset}`);
  console.log(`  ${C.cyan}<link rel="stylesheet" href="./${path.relative(process.cwd(), entryCssPath).replace(/\\/g, '/')}">${C.reset}`);
  console.log(`  ${C.cyan}<script src="./${path.relative(process.cwd(), coreJsPath).replace(/\\/g, '/')}" defer></script>${C.reset}\n`);
}

function cmdBundle(args) {
  const reg = loadRegistry();
  const targetDir = getTargetDir(args);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  let fullCss = reg.core.css + '\n';
  for (const comp of Object.values(reg.components)) {
    fullCss += `\n/* --- ${comp.name} --- */\n` + comp.css + '\n';
  }

  const cssOut = path.join(targetDir, 'leli.min.css');
  const jsOut = path.join(targetDir, 'leli.js');
  fs.writeFileSync(cssOut, fullCss, 'utf8');
  fs.writeFileSync(jsOut, reg.core.js, 'utf8');

  printBanner();
  console.log(`${C.green}✔ Complete leliUI library bundled successfully:${C.reset}`);
  console.log(`  - ${path.relative(process.cwd(), cssOut)}`);
  console.log(`  - ${path.relative(process.cwd(), jsOut)}\n`);
}

const [, , command, ...restArgs] = process.argv;

const cmdLower = (command || '').toLowerCase();

if (!command) {
  cmdBundle([]);
} else if (['list', 'ls'].includes(cmdLower)) {
  cmdList();
} else if (cmdLower === 'info') {
  cmdInfo(restArgs[0]);
} else if (cmdLower === 'init') {
  cmdInit(restArgs);
} else if (['add', 'install', 'i'].includes(cmdLower)) {
  cmdAdd(restArgs);
} else if (cmdLower === 'bundle') {
  cmdBundle(restArgs);
} else if (['help', '--help', '-h'].includes(cmdLower)) {
  printHelp();
} else {
  // Direct component add: `leli card table button modal`
  cmdAdd([command, ...restArgs]);
}
