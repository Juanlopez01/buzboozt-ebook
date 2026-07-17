import sharp from "sharp";
import { readFileSync, unlinkSync, existsSync } from "fs";
import path from "path";

const publicDir = path.resolve("public");

const files = [
  "ebook-mockup.png",
  "lifestyle-1.png",
  "lifestyle-2.png",
  "lifestyle-3.png",
  "feature-presencia-digital.png",
  "preview-1.png",
  "preview-2.png",
  "preview-3.png",
  "preview-4.png",
  "bonus-1.png",
  "bonus-2.png",
  "bonus-3.png",
  "bonus-4.png",
  "bonus-5.png",
  "auditoria-mockup.png",
  "device-showcase.png",
  "thumb-1.png",
  "thumb-2.png",
  "thumb-3.png",
  "thumb-4.png",
];

const results = [];

for (const file of files) {
  const srcPath = path.join(publicDir, file);
  if (!existsSync(srcPath)) {
    console.log(`SKIP (missing): ${file}`);
    continue;
  }

  const jpgName = file.replace(/\.png$/, ".jpg");
  const destPath = path.join(publicDir, jpgName);

  const input = sharp(srcPath);
  const meta = await input.metadata();

  const resized = input.resize({
    width: 1600,
    height: 1600,
    fit: "inside",
    withoutEnlargement: true,
  });

  const outInfo = await resized
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destPath);

  const srcSize = readFileSync(srcPath).length;

  results.push({
    file: jpgName,
    originalWidth: meta.width,
    originalHeight: meta.height,
    width: outInfo.width,
    height: outInfo.height,
    originalSizeMB: (srcSize / 1024 / 1024).toFixed(2),
    newSizeKB: (outInfo.size / 1024).toFixed(0),
  });

  unlinkSync(srcPath);
}

console.log(JSON.stringify(results, null, 2));
