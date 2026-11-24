// post-x-promote-make-your-own-bounty-01 entry (Node 22, standard library only).
// The entry is the X post itself: this program copies POST.json from the
// repository root to /output/POST.json, where the gate reads it. The house
// then reads the post from X (its pictures and its text) and hands that to
// the judge. Nothing this program writes about the post is judged.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

const { url } = JSON.parse(readFileSync(join(OUTPUT_DIR, 'POST.json'), 'utf8'));
if (typeof url !== 'string' || !/^https:\/\/(x\.com|twitter\.com)\/[^/]+\/status\/\d+/.test(url)) {
  console.error(`POST.json does not name a real X post URL: ${JSON.stringify(url)}`);
  process.exit(1);
}
console.log(`POST.json copied; post under review: ${url}`);
