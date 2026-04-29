import Document from './documents/Document';

export default { 
  Document, 
  isProd: process.env.NODE_ENV === 'production',
  outPath: './public/hydrate',
  srcPath: './src',
};