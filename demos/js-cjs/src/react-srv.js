// Use CommonJS + @babel/register to allow requiring .jsx files on the server.
require('@babel/register')({ extensions: ['.js', '.jsx'] });

const ReactSrv = require('react-srv').default;
const Document = require('./documents/Document.jsx').default;

module.exports = new ReactSrv({
  Document, 
  isProd: process.env.NODE_ENV === 'production',
  outPath: './public/hydrate',
  srcPath: './src',
});