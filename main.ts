// One Star for Monday — writes the one-line review to entry.txt.
// The grader runs with CWD=/ and a read-only script dir, so output goes
// ONLY to MAKEFUN_OUTPUT_DIR (default /output), never beside this script.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE: string =
  "One star. Seated by the alarm clock, served cold coffee, and charged for the whole weekend.";

const MAX_CHARS = 180;
const MAX_WORDS = 25;

function validate(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  // Reject ALL control characters (plain text only, no tabs either).
  for (const ch of line) {
    if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
      throw new Error("line must not contain control characters");
    }
  }
  // No leading/trailing whitespace: the file must be exactly the line.
  if (line !== line.trim()) {
    throw new Error("line must not have leading or trailing whitespace");
  }
  const words = line.trim().split(/\s+/).length;
  if (words > MAX_WORDS) {
    throw new Error(`line must be at most ${MAX_WORDS} words, got ${words}`);
  }
}

validate(LINE);

const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote entry.txt (${LINE.length} chars, ${LINE.trim().split(/\s+/).length} words)`);
