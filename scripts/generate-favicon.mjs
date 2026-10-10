import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = process.argv[2]
	? process.argv[2]
	: join(root, "scripts", "favicon-source.png");

function icoFromPngs(pngs) {
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0);
	header.writeUInt16LE(1, 2);
	header.writeUInt16LE(pngs.length, 4);
	let offset = 6 + 16 * pngs.length;
	const entries = [];
	const bodies = [];
	for (const png of pngs) {
		const entry = Buffer.alloc(16);
		const size = png.size >= 256 ? 0 : png.size;
		entry.writeUInt8(size, 0);
		entry.writeUInt8(size, 1);
		entry.writeUInt32LE(png.buffer.length, 8);
		entry.writeUInt32LE(offset, 12);
		offset += png.buffer.length;
		entries.push(entry);
		bodies.push(png.buffer);
	}
	return Buffer.concat([header, ...entries, ...bodies]);
}

async function markFromSource(inputPath) {
	const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
	for (let i = 0; i < data.length; i += 4) {
		const luma = (data[i] + data[i + 1] + data[i + 2]) / 3;
		if (luma > 242) data[i + 3] = 0;
		else if (luma > 205) data[i + 3] = Math.round(255 * ((242 - luma) / 37));
	}
	return sharp(data, { raw: info }).trim({ threshold: 8 }).png().toBuffer();
}

async function squareAt(mark, size, fill = 1.28) {
	const inner = Math.max(1, Math.round(size * fill));
	if (inner <= size) {
		const pad = Math.floor((size - inner) / 2);
		return sharp(mark)
			.resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
			.extend({
				top: pad,
				bottom: size - inner - pad,
				left: pad,
				right: size - inner - pad,
				background: { r: 0, g: 0, b: 0, alpha: 0 },
			})
			.png()
			.toBuffer();
	}
	const scaled = await sharp(mark)
		.resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
		.png()
		.toBuffer();
	const left = Math.floor((inner - size) / 2);
	const top = Math.floor((inner - size) / 2);
	return sharp(scaled).extract({ left, top, width: size, height: size }).png().toBuffer();
}

const mark = await markFromSource(sourcePath);
writeFileSync(join(root, "scripts", "favicon-source.png"), mark);

const FILL = 1.1;
const master = await squareAt(mark, 512, FILL);
writeFileSync(join(root, "public", "icon-512.png"), master);
writeFileSync(join(root, "public", "favicon.png"), await squareAt(mark, 32, FILL));
writeFileSync(join(root, "public", "icon-192.png"), await squareAt(mark, 192, FILL));
writeFileSync(join(root, "public", "apple-touch-icon.png"), await squareAt(mark, 180, FILL));

const svgMark = await squareAt(mark, 128, FILL);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <image href="data:image/png;base64,${svgMark.toString("base64")}" width="128" height="128"/>
</svg>
`;
writeFileSync(join(root, "public", "favicon.svg"), svg);

const icoPngs = [];
for (const size of [16, 32, 48]) {
	icoPngs.push({ size, buffer: await squareAt(mark, size, FILL) });
}
writeFileSync(join(root, "public", "favicon.ico"), icoFromPngs(icoPngs));
console.log("silhouette → transparent favicon (svg, ico, png, apple-touch, 192, 512)");
