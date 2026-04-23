import ReactSrv from 'react-srv';
import Document from '../src/Document'; // if you want a custom document

const react = new ReactSrv({ 
  Document, 
  srcPath: './src',
  outPath: './public',
  outDir: 'hydrate',
});
react.prerender()