import{a}from"./chunk-PJS7ZFFE.js";import{a as e}from"./chunk-7X4DHW36.js";import{jsx as t,jsxs as c}from"https://esm.sh/react@19.3.1/jsx-runtime";function o(r){return c("figure",{children:[r.language==="typescript"&&t(i,{}),r.language==="javascript-esm"&&t(u,{}),r.language==="javascript-cjs"&&t(n,{}),t("figcaption",{children:`react-srv.config.${r.language==="typescript"?"ts":"js"}`})]})}e(o,"SampleConfigStatic");var i=e(()=>t(a,{lang:"javascript",children:`import Document from './Document';

export default {
  Document,
  srcPath: './src',
  outPath: './public',
  hydrate: true, // or false
  minify: true, // // minify JS or not
}`}),"TsSample"),u=e(()=>t(a,{lang:"javascript",children:`import Document from './Document.jsx';
  
export default {
  Document,
  srcPath: './src',
  outPath: './public',
  hydrate: true, // or false
  minify: true, // // minify JS or not
}`}),"JsEsmSample"),n=e(()=>t(a,{lang:"javascript",children:`const Document = require('./Document.jsx').default;

module.exports = {
  Document,
  srcPath: './src',
  outPath: './public',
  hydrate: true, // or false
  minify: true, // // minify JS or not
}`}),"JsCjsSample");export{o as a};
