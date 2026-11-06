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
