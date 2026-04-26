import ReactSrv from 'react-srv';
import Document from './documents/Document';

export default new ReactSrv({ 
  Document, 
  isProd: process.env.NODE_ENV === 'production',
  outDir: 'hydrate',
  outPath: './public',
  srcPath: './src',
});