const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(f => {
  const filePath = path.join(rootDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('assets/js/store.js') && !content.includes('assets/js/bootstrap-data.js')) {
    content = content.replace(
      '<script src="assets/js/store.js"></script>',
      '<script src="assets/js/bootstrap-data.js"></script>\n  <script src="assets/js/store.js"></script>'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
    console.log('Injected bootstrap-data.js into', f);
  }
});

console.log('Total files updated:', count);
