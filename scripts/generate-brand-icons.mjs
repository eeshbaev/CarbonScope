/**
 * Clean emblem: green background, orange/yellow gauge arcs, solid white CO₂.
 * Run: npm run generate:icons
 */
import { writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '..', 'assets');
const masterPath = join(assetsDir, 'brand-icon-master.png');

const SIZE = 1024;
const GREEN = { r: 0x2d, g: 0x6a, b: 0x4f, alpha: 255 };
/** Zoom arcs slightly so the dial reads larger than the label. */
const ARC_SCALE = 1.1;
/** Match original artwork proportions (~271×125 px on 1024 canvas). */
const CO2_FONT = 136;
const CO2_SUB = 91;
const CO2_Y = 555;

/** Orange / yellow gauge arc pixels — preserve exactly. */
function isGaugeArc(r, g, b) {
  return r > 145 && g > 85 && b < 175 && r >= g - 25;
}

/** Everything that is not a gauge arc becomes flat green (removes white fragments & edge halos). */
function shouldFlattenToGreen(r, g, b, a) {
  if (a < 40) return true;
  if (isGaugeArc(r, g, b)) return false;
  return true;
}

async function cleanEmblem(inputPath) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (shouldFlattenToGreen(r, g, b, data[i + 3])) {
      data[i] = GREEN.r;
      data[i + 1] = GREEN.g;
      data[i + 2] = GREEN.b;
      data[i + 3] = 255;
    }
  }

  return sharp(data, { raw: { width, height, channels } }).png().toBuffer();
}

const CO2_OVERLAY = `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <text
    x="512"
    y="${CO2_Y}"
    font-size="${CO2_FONT}"
    font-weight="700"
    fill="#FFFFFF"
    text-anchor="middle"
    font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
  >CO<tspan baseline-shift="sub" font-size="${CO2_SUB}">2</tspan></text>
</svg>`;

async function scaleArcs(cleanedBuffer) {
  const scaledSize = Math.round(SIZE * ARC_SCALE);
  const inset = Math.round((scaledSize - SIZE) / 2);
  return sharp(cleanedBuffer)
    .resize(scaledSize, scaledSize)
    .extract({ left: inset, top: inset, width: SIZE, height: SIZE })
    .png()
    .toBuffer();
}

async function buildCleanIcon(sourcePath) {
  const cleaned = await cleanEmblem(sourcePath);
  const scaled = await scaleArcs(cleaned);
  const overlay = await sharp(Buffer.from(CO2_OVERLAY)).png().toBuffer();
  return sharp(scaled).composite([{ input: overlay, top: 0, left: 0 }]).png().toBuffer();
}

// Use archived pristine artwork if present (pre-overlay source with gradient arcs).
const archivePath = join(assetsDir, 'brand-icon-source.png');
const sourcePath = existsSync(archivePath) ? archivePath : masterPath;

const png = await buildCleanIcon(sourcePath);

const outputs = ['brand-icon.png', 'icon.png', 'splash-icon.png', 'adaptive-icon.png', 'brand-icon-master.png'];
for (const name of outputs) {
  writeFileSync(join(assetsDir, name), png);
  console.log('Wrote', name);
}

const favicon = await sharp(png).resize(48, 48).png().toBuffer();
writeFileSync(join(assetsDir, 'favicon.png'), favicon);
console.log('Wrote favicon.png');
