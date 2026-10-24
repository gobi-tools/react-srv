import{a as r}from"./chunk-UABS3NKN.js";import{a as e}from"./chunk-7X4DHW36.js";import{jsx as t,jsxs as g}from"https://esm.sh/react@19.3.0/jsx-runtime";function o(a){return g("figure",{children:[a.language==="typescript"&&t(n,{}),a.language==="javascript-esm"&&t(u,{}),a.language==="javascript-cjs"&&t(i,{}),t("figcaption",{children:`react-srv.config.${a.language==="typescript"?"ts":"js"}`})]})}e(o,"SampleConfigWithDocument");var n=e(()=>t(r,{lang:"javascript",children:`import Document from './Document';
  
export default { Document };`}),"TsSample"),u=e(()=>t(r,{lang:"javascript",children:`import Document from './Document.jsx';
  
export default { Document };`}),"JsEsmSample"),i=e(()=>t(r,{lang:"javascript",children:`const Document = require('./Document.jsx').default;

module.exports = { Document };`}),"JsCjsSample");export{o as a};
