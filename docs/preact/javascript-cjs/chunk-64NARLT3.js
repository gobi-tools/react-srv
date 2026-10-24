import{a}from"./chunk-UABS3NKN.js";import{a as r}from"./chunk-7X4DHW36.js";import{jsx as e,jsxs as c}from"https://esm.sh/react@19.3.0/jsx-runtime";function s(t){return c("figure",{children:[t.language==="typescript"&&e(g,{}),t.language==="javascript-esm"&&e(n,{}),t.language==="javascript-cjs"&&e(i,{}),e("figcaption",{children:`server.${t.language==="typescript"?"ts":"js"}`})]})}r(s,"SampleSimpleServer");var g=r(()=>e(a,{lang:"javascript",children:`import config from './react-srv.config';
import Page from './Page';

const app = express();
const react = new ReactSrv(config);
  
app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});`}),"TsSample"),n=r(()=>e(a,{lang:"javascript",children:`import config from './react-srv.config.js';
import Page from './Page.jsx';

const app = express();
const react = new ReactSrv(config);
  
app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});`}),"JsEsmSample"),i=r(()=>e(a,{lang:"javascript",children:`require('@babel/register')({ extensions: ['.js', '.jsx'] });
  
const ReactSrv = require('react-srv').default;
const Page = require('./Page.jsx').default;

const app = express();
const react = new ReactSrv(config);
  
app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});`}),"JsCjsSample");export{s as a};
