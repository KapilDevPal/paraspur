import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptTag = `\n  <!-- Google AdSense -->\n  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3476842786908483" crossorigin="anonymous"></script>\n`;

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        if (file === 'node_modules' || file === 'dist' || file === '.git' || file === '.github') return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walkDir(file));
        } else { 
            if (file.endsWith('.html')) results.push(file);
        }
    });
    return results;
}

const htmlFiles = walkDir(__dirname);
let updatedCount = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('adsbygoogle.js')) {
        content = content.replace('</head>', scriptTag + '</head>');
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});
console.log(`Updated ${updatedCount} HTML files with AdSense.`);
