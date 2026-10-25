import{a}from"./chunk-PJS7ZFFE.js";import{a as t}from"./chunk-7X4DHW36.js";import{jsx as e,jsxs as o}from"https://esm.sh/react@19.3.1/jsx-runtime";function s(r){return o("figure",{children:[r.language==="typescript"&&e(n,{}),r.library==="react"&&r.language==="javascript-esm"&&e(g,{}),r.library==="preact"&&r.language==="javascript-esm"&&e(i,{}),r.language==="javascript-cjs"&&e(c,{}),e("figcaption",{children:`server.${r.language==="typescript"?"ts":"js"}`})]})}t(s,"SampleSimpleServer");var n=t(()=>e(a,{lang:"javascript",children:`import config from './react-srv.config';
import Page from './Page';

const app = express();
const react = new ReactSrv(config);
  
app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});`}),"TsSample"),g=t(()=>e(a,{lang:"javascript",children:`import config from './react-srv.config.js';
import Page from './Page.jsx';

const app = express();
const react = new ReactSrv(config);
  
app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});`}),"ReactJsEsmSample"),i=t(()=>e(a,{lang:"javascript",children:`import config from './react-srv.config.js';
import Page from './Page.jsx';
import { h } from 'preact';
import { renderToString, renderToStaticMarkup } from 'preact-render-to-string';

const app = express();
const react = new ReactSrv({
  ...config,
  // avoid having two copies of Preact
  runtime: { h, renderToString, renderToStaticMarkup },
});
  
app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});`}),"PreactJsEsmSample"),c=t(()=>e(a,{lang:"javascript",children:`require('@babel/register')({ extensions: ['.js', '.jsx'] });
  
const ReactSrv = require('react-srv').default;
const Page = require('./Page.jsx').default;

const app = express();
const react = new ReactSrv(config);
  
app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});`}),"JsCjsSample");export{s as a};
