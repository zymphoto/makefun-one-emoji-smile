import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// One Emoji, One Smile — make.fun bounty entry.
// The program writes exactly ONE emoji and nothing else to
// /output/entry.txt: the one most likely to make a stranger smile.
//
// The emoji: 🤗 — hugging face. Open arms, a warm smile: a hug is the
// warmest gesture that is still right from a stranger (no intimacy,
// no flirtation, no irony), and it is not the first default smiley
// that comes to mind. Universal, instantly readable, kind at a glance.
const EMOJI = "🤗";

// The gate: /output/entry.txt must be UTF-8 text of 1–8 characters,
// a single emoji, not only whitespace. Fail loudly rather than
// submitting an invalid entry.
if (
  EMOJI.length < 1 ||
  EMOJI.length > 8 ||
  /\s/.test(EMOJI) ||
  !/^\p{Extended_Pictographic}$/u.test(EMOJI)
) {
  throw new Error("EMOJI must be a single emoji of 1-8 characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EMOJI + "\n", "utf8");
// make.fun collects outputs as another user, so leave them
// world-readable regardless of this machine's umask.
chmodSync("/output", 0o755);
chmodSync("/output/entry.txt", 0o644);
