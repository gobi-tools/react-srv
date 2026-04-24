import ReactSrv from '../src';
import Document from "../docs-src/documents/Document";

const srv = new ReactSrv({ 
  Document,
  srcPath: './docs-src',
  outPath: './docs',
  hydrate: false,
});

srv.prerender();
