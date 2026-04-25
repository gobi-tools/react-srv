import ReactSrv from '../src';
import Document from "../pages/documents/Document";

const srv = new ReactSrv({ 
  Document,
  srcPath: './pages',
  outPath: './docs',
  hydrate: false,
});

srv.prerender();
