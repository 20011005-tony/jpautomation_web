import { stitch } from '@google/stitch-sdk';
import fs from 'fs';

const screensToExport = [
  { name: 'index.html', id: 'ebeaba4520e84169a9ea6eb8cb948f2b' },
  { name: 'metodologia.html', id: 'c58ae83b0b9245d3bd7b4a63e204e934' },
  { name: 'casos.html', id: '02c3d3dfd2c1468d89a3ec4747e22ac0' },
  { name: 'servicios.html', id: 'aceb31ac89034fd080fb96d471f68c42' },
  { name: 'contacto.html', id: '08d49e0791f24cfea20772cb3fef0bbc' },
  { name: 'blog.html', id: '5a71d4a2d8dc47bbbfe707aa908d4ca3' },
  { name: 'recursos.html', id: '8f1cdb1a9d1648b4b9024bdcd2754a21' }
];

async function run() {
  try {
    const project = stitch.project("6031028578477106291");
    const screens = await project.screens();
    
    for (const target of screensToExport) {
      const screen = screens.find(s => s.id === target.id);
      if (screen) {
        let html = await screen.getHtml();
        console.log(`Descargado ${target.name}: ${html.substring(0, 150)}... (${html.length} chars)`);
        
        // Sometimes getHtml returns a URL (like a GCS signed URL) rather than the raw HTML snippet directly, 
        // especially if it's 200 chars. Let's check if it's a URL.
        if (html.trim().startsWith("http")) {
          console.log(`${target.name} origin is a URL! Fetching...`);
          const response = await fetch(html.trim());
          html = await response.text();
          console.log(`Fetched raw HTML for ${target.name}, length: ${html.length}`);
        }
        
        fs.writeFileSync(target.name, html);
      }
    }
    
    // Check for global CSS if any
    if (typeof project.getCss === 'function') {
      const css = await project.getCss();
      fs.writeFileSync('assets/css/styles.css', css);
      console.log('Global CSS saved to assets/css/styles.css');
    }
    
  } catch(e) {
    console.error("Error:", e.stack);
  }
}
run();
