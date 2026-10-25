import{a as i}from"./chunk-PJS7ZFFE.js";import{a as t}from"./chunk-7X4DHW36.js";import{jsx as e,jsxs as u}from"https://esm.sh/react@19.3.1/jsx-runtime";function a(r){return u("figure",{children:[r.language==="typescript"&&e(o,{}),r.language==="javascript-esm"&&e(n,{}),r.language==="javascript-cjs"&&e(s,{}),e("figcaption",{children:`react-srv.config.${r.language==="typescript"?"ts":"js"}`})]})}t(a,"SampleConfigProd");var o=t(()=>e(i,{lang:"javascript",children:`import Document from './Document';

export default {
  Document,
  srcPath: './src', // default
  outPath: './public/hydrate', // default
  isProd: process.env.NODE_ENV === 'production', // serve inline or precompiled code
  minify: true, // minify JS or not
  splitting: true, // split large JS files into small ones that can be reused and cached
}`}),"TsSample"),n=t(()=>e(i,{lang:"javascript",children:`import Document from './Document.jsx';
  
export default {
  Document,
  srcPath: './src', // default
  outPath: './public/hydrate', // default
  isProd: process.env.NODE_ENV === 'production', // serve inline or precompiled code
  minify: true, // minify JS or not
  splitting: true, // split large JS files into small ones that can be reused and cached
}`}),"JsEsmSample"),s=t(()=>e(i,{lang:"javascript",children:`const Document = require('./Document.jsx').default;

module.exports = {
  Document,
  srcPath: './src', // default
  outPath: './public/hydrate', // default
  isProd: process.env.NODE_ENV === 'production', // serve inline or precompiled code
  minify: true, // minify JS or not
  splitting: true, // split large JS files into small ones that can be reused and cached
}`}),"JsCjsSample");export{a};
