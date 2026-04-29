// const ReactSrv = require('react-srv').default;
const Document = require('./documents/Document.jsx').default;

module.exports = {
  Document, 
  isProd: process.env.NODE_ENV === 'production',
  outPath: './public/hydrate',
  srcPath: './src',
};