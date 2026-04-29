import ReactSrv from 'react-srv';
import Document from "../src/documents/Document";

const srv = new ReactSrv({ 
  Document,
  srcPath: './src',
  outPath: '../docs',
});

srv.prerender();
