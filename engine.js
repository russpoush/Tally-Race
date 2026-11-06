// Stat Sprint engine: adaptive race generator. Pure logic, no DOM.
// Level table: racers, min/max gap between 1st and 2nd (as fraction of winner's total),
// whether a "legend" (top-10 player) must be in the race, and podium mode (call the full order).
const LEVELS = {
  1:  { racers: 2, minGap: 0.35, maxGap: 1.00, legend: true,  podium: false, name: "Rookie" },
  2:  { racers: 2, minGap: 0.20, maxGap: 0.45, legend: true,  podium: false, name: "Starter" },
  3:  { racers: 2, minGap: 0.10, maxGap: 0.25, legend: true,  podium: false, name: "Pro" },
  4:  { racers: 3, minGap: 0.08, maxGap: 0.25, legend: false, podium: false, name: "All-Star" },
  5:  { racers: 3, minGap: 0.05, maxGap: 0.14, legend: false, podium: false, name: "Captain" },
  6:  { racers: 3, minGap: 0.025, maxGap: 0.08, legend: false, podium: false, name: "MVP" },
  7:  { racers: 4, minGap: 0.012, maxGap: 0.05, legend: false, podium: false, name: "Champion" },
  8:  { racers: 4, minGap: 0.0005, maxGap: 0.025, legend: false, podium: false, name: "Legend" },
  9:  { racers: 3, minGap: 0.0005, maxGap: 0.08, legend: false, podium: true,  name: "Hall of Famer" },
  10: { racers: 4, minGap: 0.0005, maxGap: 0.06, legend: false, podium: true,  name: "G.O.A.T." }
};
const SEASON_LENGTHS = [15, 20];          // player chooses; 15 is the default
const SEASON_LENGTH = 15;
const SPORTS = ["baseball", "basketball", "football", "hockey"];

function levelOf(rating) { return Math.max(1, Math.min(10, Math.floor(rating))); }

// Adaptive rating: start at 1. Wins push you up (faster on a streak), misses drop you down.
function updateRating(rating, won, streak) {
  let r = won ? rating + 0.85 + (streak >= 2 ? 0.3 : 0) : rating - 1.0;
  return Math.max(1, Math.min(10.99, r));
}

function shuffle(a, rnd) {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function sample(arr, n, rnd) { return shuffle(arr.slice(), rnd).slice(0, n); }

function valid(racers, spec) {
  const vals = racers.map(r => r[1]);
  if (new Set(vals).size !== vals.length) return false;           // no ties, ever
  const names = racers.map(r => r[0]);
  if (new Set(names).size !== names.length) return false;
  const sorted = vals.slice().sort((a, b) => b - a);
  const gap = (sorted[0] - sorted[1]) / sorted[0];
  if (gap < spec.minGap || gap > spec.maxGap) return false;
  if (spec.podium) {                                              // every step of the podium distinct
    for (let i = 1; i < sorted.length; i++) if (sorted[i - 1] === sorted[i]) return false;
  }
  return true;
}

// Build one race for a sport ("mix" = any) at a level. Avoid recently used players.
// A "deck" deals the next stat board so every sport (in Mix) and every stat takes turns.
// Mix: each round of 4 races covers all 4 sports in a shuffled order.
function makeDeck(boards, sport, rnd = Math.random) {
  return { boards, sport, rnd, queue: [], used: {} };
}
function dealBoard(deck) {
  if (!deck.queue.length) {
    const sports = deck.sport === "mix" ? shuffle(SPORTS.slice(), deck.rnd) : [deck.sport];
    deck.queue = sports;
  }
  const sp = deck.queue.shift();
  const opts = deck.boards.filter(b => b.sport === sp);
  const n = deck.used[sp] || 0; deck.used[sp] = n + 1;
  // alternate the sport's stats, starting from a random one
  if (n === 0) deck.offset = deck.offset || {}, deck.offset[sp] = Math.floor(deck.rnd() * opts.length);
  return opts[(n + deck.offset[sp]) % opts.length];
}

// Build one race. With preferId, that board is tried first; if it can't make a fair race
// at this level, another board from the SAME sport is used (never a different sport).
function makeRace(boards, sport, level, rnd = Math.random, recent = new Set(), preferId = null) {
  const pref = preferId && boards.find(b => b.id === preferId);
  const sp = pref ? pref.sport : sport;
  const pool = boards.filter(b => sp === "mix" || b.sport === sp);
  const base = LEVELS[level];
  // Try the exact spec first; widen gently if a board can't satisfy it.
  for (let relax = 0; relax < 4; relax++) {
    const spec = Object.assign({}, base, {
      minGap: base.minGap / Math.pow(1.6, relax),
      maxGap: Math.min(1, base.maxGap * Math.pow(1.6, relax))
    });
    for (let tries = 0; tries < 600; tries++) {
      const board = pref && tries < 400 ? pref : pool[Math.floor(rnd() * pool.length)];
      const avail = board.players.filter(p => !recent.has(p[0]));
      const src = avail.length >= spec.racers + 4 ? avail : board.players;
      let racers;
      if (spec.legend) {
        const legend = src.slice(0, 10)[Math.floor(rnd() * Math.min(10, src.length))];
        racers = [legend].concat(sample(src.filter(p => p !== legend), spec.racers - 1, rnd));
      } else {
        racers = sample(src, spec.racers, rnd);
      }
      if (valid(racers, spec)) {
        racers = shuffle(racers.slice(), rnd);
        const order = racers.map((r, i) => i).sort((a, b) => racers[b][1] - racers[a][1]);
        return { board, level, spec: base, racers: racers.map(r => ({ name: r[0], value: r[1] })), order };
      }
    }
  }
  throw new Error("No race possible for " + sport + " level " + level);
}

// pick: index (normal) or array of indexes in predicted finishing order (podium).
function judge(race, pick) {
  if (race.spec.podium) return Array.isArray(pick) && pick.length === race.order.length && pick.every((p, i) => p === race.order[i]);
  return pick === race.order[0];
}

if (typeof module !== "undefined") module.exports = { LEVELS, SEASON_LENGTH, SEASON_LENGTHS, SPORTS, makeDeck, dealBoard, levelOf, updateRating, makeRace, judge, valid };
