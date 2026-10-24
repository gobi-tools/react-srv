import ReactSrv from "react-srv";
import Document from "./src/documents/Document";
import fs from "fs";
import { cp } from "node:fs/promises";

const libraries = [undefined, 'react', 'preact'];
const langauges = [undefined, 'typescript', 'javascript-esm', 'javascript-cjs'];

(async () => {
  for (const library of libraries) {
    for (const language of langauges) {
      const deployment = library === undefined && language === undefined ? '' : `${library}/${language}`;
      console.log('Outputting for deployment', deployment);

      const server = new ReactSrv({
        Document,
        srcPath: './src',
        outPath: `../docs/${deployment}`,
        minify: true,
        splitting: true,
        keepNames: true,
        initProps: { library: library ?? 'react', language: language ?? 'typescript' },
      });
      await server.prerender();

      console.log('---------------------------');
    }
  }

  // now copy resources
  fs.mkdirSync('../docs/res', { recursive: true });
  // cp('./dist', './docs/res', { recursive: true });
  cp('./res', '../docs/res', { recursive: true });
  console.log('Finished copying resources');
})();

