import sharp from "sharp";
import fs from "fs";

const src = "C:\\Users\\mesqu\\AppData\\Local\\Temp\\claude\\C--Users-mesqu-OneDrive-Desktop-Maygel\\fc5dadaa-7ee6-43ca-8aa6-83efff1d82de\\images";
const dst = "C:\\Users\\mesqu\\OneDrive\\Desktop\\Maygel\\_resized_tmp";
fs.mkdirSync(dst, { recursive: true });
const files = ["1", "2", "3", "4", "5", "6", "7", "9", "10"];

for (const f of files) {
	const out = `${dst}\\${f}.jpg`;
	await sharp(`${src}\\${f}.webp`)
		.resize({ width: 700, withoutEnlargement: true })
		.jpeg({ quality: 68 })
		.toFile(out);
	const stat = fs.statSync(out);
	console.log(f, stat.size);
}
