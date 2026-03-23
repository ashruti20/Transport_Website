var fs = require('fs');
var path = require('path');
var footerPath = path.join(__dirname, 'sections', 'footer.html');
var keywordsPath = path.join(__dirname, 'keywords-escaped.txt');

var footer = fs.readFileSync(footerPath, 'utf8');
var keywords = fs.readFileSync(keywordsPath, 'utf8').trim();

var divStart = '<div class="visually-hidden position-absolute" style="left:-9999px;width:1px;height:1px;overflow:hidden" aria-hidden="true" id="seo-keywords">';
var divEnd = '</div>';

var startIdx = footer.indexOf(divStart);
var endIdx = footer.indexOf(divEnd, startIdx);
if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find seo-keywords div');
  process.exit(1);
}

var before = footer.slice(0, startIdx + divStart.length);
var after = footer.slice(endIdx);
var newFooter = before + keywords + after;

fs.writeFileSync(footerPath, newFooter, 'utf8');
console.log('Injected', (keywords.match(/, /g) || []).length + 1, 'keywords into footer.');
process.exit(0);
