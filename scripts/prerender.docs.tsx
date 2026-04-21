import ReactSrv from '../src';
import Document from "../docs/Document";

const srv = new ReactSrv({ 
  Document,
  srcPath: './docs',
  outPath: './public',
});

srv.prerender();
