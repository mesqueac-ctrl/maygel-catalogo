import fs from "fs";

const sizes = [16, 32, 48];
const pngs = sizes.map((s) => fs.readFileSync(`icon-${s}.png`));

const numImages = sizes.length;
const headerSize = 6;
const dirEntrySize = 16;
const dataOffset0 = headerSize + dirEntrySize * numImages;

const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: 1 = icon
header.writeUInt16LE(numImages, 4);

let offset = dataOffset0;
const dirEntries = [];
for (let i = 0; i < numImages; i++) {
	const size = sizes[i];
	const png = pngs[i];
	const entry = Buffer.alloc(dirEntrySize);
	entry.writeUInt8(size === 256 ? 0 : size, 0); // width (0 = 256)
	entry.writeUInt8(size === 256 ? 0 : size, 1); // height
	entry.writeUInt8(0, 2); // color palette
	entry.writeUInt8(0, 3); // reserved
	entry.writeUInt16LE(1, 4); // color planes
	entry.writeUInt16LE(32, 6); // bits per pixel
	entry.writeUInt32LE(png.length, 8); // size of image data
	entry.writeUInt32LE(offset, 12); // offset of image data
	dirEntries.push(entry);
	offset += png.length;
}

const ico = Buffer.concat([header, ...dirEntries, ...pngs]);
fs.writeFileSync("favicon.ico", ico);
console.log("favicon.ico written,", ico.length, "bytes");
