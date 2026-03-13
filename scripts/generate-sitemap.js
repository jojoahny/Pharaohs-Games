// Run: node scripts/generate-sitemap.js
// Generates public/sitemap.xml from games.json
import { readFileSync, writeFileSync } from 'fs';

const BASE_URL = 'https://pharaohs-games-hub.lovable.app';
const data = JSON.parse(readFileSync('public/data/games.json', 'utf-8'));

const slugs = new Set();
for (const seg of data.segments) {
  for (const game of seg.hits) {
    slugs.add(game.slug);
  }
}

const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${today}</lastmod>
  </url>
`;

for (const slug of slugs) {
  xml += `  <url>
    <loc>${BASE_URL}/game/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

xml += `</urlset>`;

writeFileSync('public/sitemap.xml', xml);
console.log(`Sitemap generated with ${slugs.size + 1} URLs`);
