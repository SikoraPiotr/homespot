import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const BANNED = /[\u2013\u2014]/;
const SCAN_DIRS = ["data", join("src", "app"), join("src", "components")];
const EXTENSIONS = new Set([".json", ".tsx", ".ts"]);

const violations = [];

function scanFile(filePath) {
  const text = readFileSync(filePath, "utf8");
  if (!BANNED.test(text)) {
    return;
  }

  const lines = text.split("\n");
  lines.forEach((line, index) => {
    if (BANNED.test(line)) {
      violations.push(`${filePath}:${index + 1}: ${line.trim()}`);
    }
  });
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
      continue;
    }
    if (EXTENSIONS.has(extname(entry))) {
      scanFile(full);
    }
  }
}

for (const dir of SCAN_DIRS) {
  walk(join(ROOT, dir));
}

if (violations.length > 0) {
  console.error("Znaleziono zakazane myślniki (en/em dash) w treściach:\n");
  violations.forEach((line) => console.error(line));
  process.exit(1);
}

console.log("check-copy: OK (brak en/em dash w treściach)");
