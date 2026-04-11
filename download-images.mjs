import fs from 'fs';
import path from 'path';

const files = [
  'index.html', 'metodologia.html', 'casos.html', 
  'servicios.html', 'contacto.html', 'blog.html', 'recursos.html'
];
const imgRegex = /<img[^>]+src=["'](https:\/\/lh3\.googleusercontent\.com\/[^"']+)["'][^>]*>/g;
const imgDir = path.join(process.cwd(), 'assets', 'img', 'stitch');

if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

async function run() {
  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');
    let match;
    let modified = false;
    
    // reset regex
    imgRegex.lastIndex = 0;
    while ((match = imgRegex.exec(html)) !== null) {
      const url = match[1];
      // Generate a simple filename based on the URL hash or part of the ID
      const parts = url.split('/');
      const id = parts[parts.length - 1].substring(0, 15);
      const filename = `stitch-img-${id}.jpg`;
      const localPath = path.join(imgDir, filename);
      const relativePath = `assets/img/stitch/${filename}`;
      
      if (!fs.existsSync(localPath)) {
        console.log(`Downloading ${url} to ${localPath}`);
        try {
          const res = await fetch(url);
          const buffer = await res.arrayBuffer();
          fs.writeFileSync(localPath, Buffer.from(buffer));
        } catch(e) {
          console.error("Error fetching", url, e);
        }
      }
      
      // replace in HTML
      html = html.replace(url, relativePath);
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(file, html);
      console.log(`Updated images in ${file}`);
    }
  }
}
run();
