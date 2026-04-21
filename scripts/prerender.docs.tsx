import ReactSrv from '../src';
import Document from "../docs-src/Document";

const srv = new ReactSrv({ 
  Document,
  srcPath: './docs-src',
  outPath: './docs',
});

srv.prerender();
