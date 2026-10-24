import{a as t}from"./chunk-UABS3NKN.js";import{a as o,b as n}from"./chunk-NDVDDQO6.js";import{a as c}from"./chunk-CUGLFOIX.js";import{i as s,j as u}from"./chunk-TL3NAVPO.js";import{a as l}from"./chunk-7X4DHW36.js";import{Fragment as g,jsx as e,jsxs as r}from"https://esm.sh/react@19.3.0/jsx-runtime";function d(a){let i=n();return r(g,{children:[r("p",{children:["First, install the latest versions of ",e("a",{href:o.home(i,a.library,a.language),children:"react-srv"}),"."]}),e("figure",{children:e(t,{lang:"bash",children:"npm i react-srv"})}),r("p",{children:["Then, to make sure React is defined correctly at runtime, add the following entries to your ",e("code",{children:"tsconfig.json"})," file."]}),e("figure",{children:e(t,{lang:"json",children:`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}`})})]})}l(d,"TypescriptSetup");function p(a){let i=n();return r(g,{children:[r("p",{children:["First, install the latest versions of ",e("a",{href:o.home(i,a.library,a.language),children:"react-srv"})," and ",e("a",{href:s,target:"_blank",children:"tsx"}),"."]}),e("figure",{children:e(t,{lang:"bash",children:`npm i react-srv

# install tsx as a dev dependency
npm i tsx --save-dev`})}),r("p",{children:["Then, to make sure React is defined correctly at runtime, you'll need to add a ",e("code",{children:"tsconfig.json"})," file."]}),e("figure",{children:e(t,{lang:"json",children:`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}`})}),r("p",{children:["Finally, you'll need to run your app with ",e("code",{children:"tsx"})," so you avoid the ",e("code",{className:"error",children:'Unknown file extension ".jsx"'})," error."]}),e("figure",{children:e(t,{lang:"bash",children:"tsx src/server.js"})})]})}l(p,"JSESMSetup");function h(a){let i=n();return r(g,{children:[r("p",{children:["First, install the latest versions of ",e("a",{href:o.home(i,a.library,a.language),children:"react-srv"})," and ",e("a",{href:u,target:"_blank",children:"babel"}),"."]}),e("figure",{children:e(t,{lang:"bash",children:`npm i react-srv

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev
npm i @babel/plugin-transform-modules-commonjs --save-dev`})}),r("p",{children:["Then, add a ",e("code",{children:".babelrc"})," file where we'll setup the react preset so the server recognises JSX syntax and a plugin for module resolution inside ",e("code",{children:".jsx"})," files."]}),e("figure",{children:e(t,{lang:"json",children:`{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-transform-modules-commonjs"]
}
`})}),r("p",{children:["Then, in the same file where you setup ",e("code",{children:"ReactSrv"}),", make sure you add the following line."]}),e("figure",{children:e(t,{lang:"javascript",children:"require('@babel/register')({ extensions: ['.js', '.jsx'] });"})}),r("p",{children:["This will allow other files to ",e("code",{children:"require"})," files with the ",e("code",{children:".jsx"})," extension:"]}),e("figure",{children:e(t,{lang:"javascript",children:"const Page = require('./pages/Page.jsx').default;"})})]})}l(h,"JSCJSSetup");function f(a){return r(g,{children:[e("hgroup",{children:e("h2",{children:"Setup"})}),a.language==="typescript"&&e(d,{library:a.library,language:a.language}),a.language==="javascript-esm"&&e(p,{library:a.library,language:a.language}),a.language==="javascript-cjs"&&e(h,{library:a.library,language:a.language}),r("article",{className:"success",children:[r("p",{role:"group",children:[e(c,{}),e("b",{children:"Example"})]}),r("p",{children:["Check out a fully set up project ",e("a",{href:o.External.Example(a.library,a.language),target:"_blank",children:"here"}),"."]})]})]})}l(f,"SetupSection");export{f as a};
