// One-time script: reads keywords from keywords-raw.txt (one per line), dedupes, outputs comma-separated for meta tag and footer
const fs = require('fs');
const path = require('path');
const rawPath = path.join(__dirname, 'keywords-raw.txt');
const outPath = path.join(__dirname, 'keywords-meta.txt');
let raw = '';
try {
  raw = fs.readFileSync(rawPath, 'utf8');
} catch (e) {
  console.error('Create keywords-raw.txt with one keyword per line');
  process.exit(1);
}
const set = new Set();
raw.split(/\r?\n/).forEach(function (line) {
  const t = line.trim();
  if (t) set.add(t);
});
const list = Array.from(set);
fs.writeFileSync(outPath, list.join(', '), 'utf8');
console.log('Wrote', list.length, 'unique keywords to keywords-meta.txt');
