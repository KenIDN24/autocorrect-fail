// Funniest Autocorrect Fail — make.fun entry
// Line final (153 chars, gate tersegel 1-199, satu baris):
// Texted "I loved the ceremony" and autocorrect sent "I loved the cemetery," so the bride now thinks I'm either very dark or very confused about the venue.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  'Texted "I loved the ceremony" and autocorrect sent "I loved the cemetery," so the bride now thinks I\'m either very dark or very confused about the venue.';

// Guard runtime (gate tersegel): 1-199 karakter, tepat satu baris, bukan whitespace saja.
if (LINE.length < 1 || LINE.length > 199) {
  throw new Error(`entry length ${LINE.length} outside sealed gate 1-199`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}

// Guard selaras brief juri: entri WAJIB memuat pasangan slip autocorrect
// (kata yang dimaksud -> kata yang salah terkirim) dan WAJIB berakhir
// dengan punch berupa titik setelah konsekuensi konkretnya.
const INTENDED = "ceremony";
const WRONG = "cemetery";
if (!LINE.includes(INTENDED) || !LINE.includes(WRONG)) {
  throw new Error("entry must contain the autocorrect slip pair ceremony -> cemetery");
}
if (!LINE.endsWith(".")) {
  throw new Error("entry must end with a period (punch on the final words)");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`entry ok: ${LINE.length} chars, 1 line`);
