import Document from './documents/Document';

export default { 
  Document, 
  isProd: process.env.NODE_ENV === 'production',
  srcPath: './src',
  outPath: '../docs',
  minify: true,
  splitting: true,
  keepNames: true,
  reactVersion: '19.3.0',
};