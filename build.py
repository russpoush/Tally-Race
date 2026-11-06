#!/usr/bin/env python3
"""Build index.html (data + engine inlined), run tests, and block retired names (project Rule 2)."""
import pathlib, re, subprocess, sys
root = pathlib.Path(__file__).parent
src = (root / "index.src.html").read_text()
data = (root / "data.js").read_text()
engine = (root / "engine.js").read_text()
out = src.replace("/*DATA*/", data).replace("/*ENGINE*/", engine)
(root / "index.html").write_text(out)
print("built index.html", len(out), "bytes")
r = subprocess.run(["node", str(root / "test.js")], capture_output=True, text=True)
print(r.stdout.strip())
if r.returncode or "FAIL" in r.stdout: sys.exit("tests failed")
names = [l.strip() for l in (root / "retired-names.txt").read_text().splitlines() if l.strip() and not l.startswith("#")]
hits = []
for f in root.rglob("*"):
    if f.is_file() and "archive" not in f.parts and ".git" not in f.parts and f.name != "retired-names.txt":
        try: lines = f.read_text().splitlines()
        except Exception: continue
        for i, line in enumerate(lines, 1):
            for n in names:
                if n.lower() in line.lower(): hits.append(f"{f.relative_to(root)}:{i}: {n}")
# Visible text of the built page, with tags stripped, so split names like <b>X</b> Y are caught too
import html as _h
visible = re.sub(r"\s+", " ", _h.unescape(re.sub(r"<[^>]+>", " ", re.sub(r"(?s)<(script|style)[^>]*>.*?</\1>", " ", out))))
for n in names:
    if re.search(r"\s*".join(map(re.escape, n.split())), visible, re.I): hits.append(f"index.html (visible text): {n}")
if hits: sys.exit("retired names found:\n" + "\n".join(hits))
print(f"retired-name scan: {len(names)} names, 0 hits")
