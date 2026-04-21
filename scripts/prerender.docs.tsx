import ReactSrv from '../src';
import path from "path";
import Document from "../docs-src/Document";
import { fileURLToPath } from 'url';
import { cp } from "fs/promises";

/* re-create __dirname */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(__dirname, path.join(__dirname, '../docs-src'));

const srv = new ReactSrv({ 
  Document,
  srcPath: './docs-src',
  outPath: './docs',
});

(async () => {
  await srv.prerender(/*path.join(__dirname, '../docs-src'), './public', './docs'*/);
  await cp('./public', './docs', { recursive: true });
  console.log(`✅ Copied public/ folder`);
})();

