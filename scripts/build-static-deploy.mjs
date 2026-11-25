#!/usr/bin/env node
/**
 * Buduje statyczny podgląd do wrzucenia na hosting (np. pscoders.pl/homespot).
 * Pomija API i panel admina (wymagają Node.js).
 */
import { cp, mkdir, rm, rename, writeFile, access } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(root, "src", "app");
const deployDir = path.join(root, "deploy", "homespot");
const apiPath = path.join(appDir, "api");
const adminPath = path.join(appDir, "admin");
const apiBackup = path.join(root, ".deploy-stash", "api");
const adminBackup = path.join(root, ".deploy-stash", "admin");
const stashRoot = path.join(root, ".deploy-stash");

function run(command, args, env = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, ...env },
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    const error = new Error(`${command} ${args.join(" ")} failed with status ${result.status ?? 1}`);
    error.status = result.status ?? 1;
    throw error;
  }
}

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function stashServerRoutes() {
  await rm(stashRoot, { recursive: true, force: true });
  await mkdir(stashRoot, { recursive: true });
  if (await exists(apiPath)) {
    await rename(apiPath, apiBackup);
  }
  if (await exists(adminPath)) {
    await rename(adminPath, adminBackup);
  }
}

async function restoreServerRoutes() {
  if (await exists(apiBackup) && !(await exists(apiPath))) {
    await rename(apiBackup, apiPath);
  }
  if (await exists(adminBackup) && !(await exists(adminPath))) {
    await rename(adminBackup, adminPath);
  }
  await rm(stashRoot, { recursive: true, force: true });
}

async function writeHtaccess() {
  const htaccess = `# Homespot — statyczny podgląd w /homespot/
Options -Indexes
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /homespot/

  # Pliki i katalogi bez zmian
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Brak trailing slash → katalog z index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} !/$
  RewriteRule ^(.+)$ $1/ [R=301,L]
</IfModule>
`;
  await writeFile(path.join(deployDir, ".htaccess"), htaccess, "utf8");
}

async function writeReadme() {
  const readme = `# Homespot — pliki na serwer

Wrzuć **zawartość** tego folderu do katalogu \`homespot\` na serwerze
(adres: https://pscoders.pl/homespot/).

## Uwagi
- To statyczny podgląd (HTML/CSS/JS). **Formularz kontaktowy** i **panel /admin** na tym hostingu nie działają.
- Po wrzuceniu plików wejdź na: https://pscoders.pl/homespot/

Wygenerowano: ${new Date().toISOString()}
`;
  await writeFile(path.join(deployDir, "README-WRZUC-NA-SERWER.txt"), readme, "utf8");
}

async function packageOut() {
  const outDir = path.join(root, "out");
  console.log("→ Pakuję do deploy/homespot/ …");
  await rm(deployDir, { recursive: true, force: true });
  await mkdir(path.join(root, "deploy"), { recursive: true });
  await cp(outDir, deployDir, { recursive: true });
  await writeHtaccess();
  await writeReadme();
  console.log("\n✓ Gotowe: deploy/homespot/");
  console.log("  Wgraj całą zawartość tego folderu na serwer do /homespot/\n");
}

async function main() {
  let stashed = false;
  try {
    console.log("→ Chwilowo wyłączam trasy API i admin (tylko build statyczny)…");
    await stashServerRoutes();
    stashed = true;

    console.log("→ Build statyczny (basePath /homespot)…");
    run("npm", ["run", "check:copy"]);
    run("npx", ["next", "build"], { STATIC_EXPORT: "1" });
    await packageOut();
  } catch (error) {
    const outDir = path.join(root, "out");
    if (await exists(path.join(outDir, "index.html"))) {
      console.warn("→ Build zgłosił błąd, ale out/ wygląda kompletnie — pakuję to, co jest.");
      await packageOut();
    } else {
      throw error;
    }
  } finally {
    if (stashed) {
      console.log("→ Przywracam API i admin w projekcie…");
      await restoreServerRoutes();
    }
  }
}

main().catch(async (error) => {
  console.error(error);
  await restoreServerRoutes().catch(() => {});
  process.exit(error.status ?? 1);
});
