// check-copy.mjs
// Fails the check if any em dash (U+2014) exists anywhere in site copy/code.
// Run: npm run check:copy
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["src", "public", "index.html"];
const EXT = new Set([".ts", ".tsx", ".css", ".html", ".txt", ".json", ".md"]);
const EM_DASH = "—";

const files = [];
const walk = (p) => {
  const s = statSync(p);
  if (s.isDirectory()) {
    for (const name of readdirSync(p)) {
      if (name === "node_modules" || name.startsWith(".")) continue;
      walk(join(p, name));
    }
  } else if (EXT.has(extname(p))) files.push(p);
};
for (const r of ROOTS) walk(r);

let hits = 0;
for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (line.includes(EM_DASH)) {
      console.error(`${f}:${i + 1}: em dash found -> ${line.trim().slice(0, 120)}`);
      hits++;
    }
  });
}

if (hits) {
  console.error(`\ncheck:copy FAILED - ${hits} em dash occurrence(s). Use a period, colon, comma, or middle dot instead.`);
  process.exit(1);
}
console.log(`check:copy OK - ${files.length} files scanned, no em dashes.`);
