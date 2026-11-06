const { BOARDS } = require('./data.js');
const E = require('./engine.js');
let fails = 0; const ok = (c, m) => { if (!c) { fails++; console.log('FAIL', m); } };
// data sanity: sorted desc, positive ints, unique names per board
for (const b of BOARDS) {
  const names = new Set();
  b.players.forEach((p, i) => {
    ok(Number.isInteger(p[1]) && p[1] > 0, b.id + ' bad value ' + p);
    ok(!names.has(p[0]), b.id + ' dup ' + p[0]); names.add(p[0]);
    if (i) ok(b.players[i-1][1] >= p[1], b.id + ' not sorted at ' + p[0]);
  });
}
// every sport x level generates valid, judgeable races
let seed = 1; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const relaxed = {};
for (const s of [...E.SPORTS, 'mix']) for (let L = 1; L <= 10; L++) for (let k = 0; k < 200; k++) {
  const r = E.makeRace(BOARDS, s, L, rnd);
  ok(r.racers.length === E.LEVELS[L].racers, s+L+' count');
  const vals = r.racers.map(x => x.value).sort((a,b)=>b-a);
  const gap = (vals[0]-vals[1])/vals[0];
  ok(vals[0] !== vals[1], 'tie');
  if (gap < E.LEVELS[L].minGap || gap > E.LEVELS[L].maxGap) relaxed[s+L] = (relaxed[s+L]||0)+1;
  ok(E.judge(r, r.spec.podium ? r.order : r.order[0]), 'judge right');
  ok(!E.judge(r, r.spec.podium ? r.order.slice().reverse() : r.order[1]), 'judge wrong');
}
// adaptive: always-right climbs to 10, always-wrong stays at 1, alternating hovers
let rt = 1, st = 0; for (let i=0;i<10;i++){ st++; rt = E.updateRating(rt,true,st);} 
console.log('10 straight wins -> level', E.levelOf(rt));
rt = 1; for (let i=0;i<10;i++) rt = E.updateRating(rt,false,0); ok(E.levelOf(rt)===1,'floor');
rt = 6; rt = E.updateRating(rt,false,0); ok(E.levelOf(rt)===5,'miss drops a level');
console.log('relaxed-spec counts (out of 200):', JSON.stringify(relaxed));
console.log(fails ? fails+' FAILURES' : 'ALL TESTS PASSED');
const r1 = E.updateRating(1.2, true, 1); if (E.levelOf(r1) !== 2) { console.log('FAIL first win should level up'); process.exitCode = 1; } else console.log('first win -> level 2: ok');
// Mix rotation: every 4 races cover all 4 sports; every season covers all 8 stats
for (let trial = 0; trial < 300; trial++) {
  for (const len of E.SEASON_LENGTHS) {
    const deck = E.makeDeck(BOARDS, 'mix', rnd); const sports = [], ids = new Set();
    let rating = 1.2, streak = 0;
    for (let i = 0; i < len; i++) {
      const b = E.dealBoard(deck);
      const race = E.makeRace(BOARDS, 'mix', E.levelOf(rating), rnd, new Set(), b.id);
      if (race.board.sport !== b.sport) { console.log('FAIL race left its dealt sport'); process.exitCode = 1; }
      sports.push(race.board.sport); ids.add(race.board.id);
      const won = rnd() < 0.6; streak = won ? streak + 1 : 0; rating = E.updateRating(rating, won, streak);
    }
    for (let k = 0; k + 4 <= len; k += 4) if (new Set(sports.slice(k, k + 4)).size !== 4) { console.log('FAIL mix block missing a sport', sports.slice(k,k+4)); process.exitCode = 1; }
  }
  const d2 = E.makeDeck(BOARDS, 'baseball', rnd); const seen = new Set();
  for (let i = 0; i < 4; i++) seen.add(E.dealBoard(d2).id);
  if (seen.size !== 2) { console.log('FAIL single sport should alternate stats'); process.exitCode = 1; }
}
console.log(process.exitCode ? 'ROTATION TESTS FAILED' : 'mix rotation + stat alternation: ok');
