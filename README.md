# Stat Sprint

A sports stats game for any age. Pick the player you think has the bigger career number, then watch them race: each racer travels exactly as far as his real career total from Sports Reference.

**The game adapts to you.** Level 1 is two racers with a big gap, and one is always a legend. Each win makes the next race closer and adds racers. At the top levels you call the full podium. A miss makes the next race easier. A season is 10 races.

**Pick a sport:** Baseball (home runs, hits), Basketball (points, rebounds), Football (passing and rushing yards), Hockey (goals, points), or Mix.

## Files
- `data.js`: 8 career leaderboards copied from Baseball-, Basketball-, Pro-Football- and Hockey-Reference (pulled Nov 5, 2026). Only retired players are included, so the totals never change.
- `engine.js`: the race generator and the adaptive rating. Pure logic, with no page code.
- `index.src.html`: the page, sounds and animation.
- `build.py`: puts the data and engine into `index.html`, runs `test.js`, and fails if any name in `retired-names.txt` appears.
- `index.html`: the built game, one file with no dependencies besides a Google Font.

Run `python3 build.py` after any change.

## Checks
- An independent fact-check compared every value to the source leaderboards and found 0 mismatches.
  - The NFL passing list was checked against a mirror (Wikipedia); Pro-Football-Reference wouldn't load for the checker.
- `test.js` runs 200 races for every sport and level and checks:
  - no ties;
  - the right racer count;
  - the gaps stay inside each level's range;
  - the judging is correct;
  - the level climbs and drops as intended.
- Originality: picking which player has the higher stat is an existing genre (MLB Matchups, Factle). The racing reveal and the adaptive rating are the new parts. Verdict: a twist on existing games. "Stat Sprint" is a test name; domains and trademarks haven't been checked.

Stats courtesy of [Sports Reference](https://www.sports-reference.com). This game is not affiliated with Sports Reference.
