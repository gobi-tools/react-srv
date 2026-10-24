import{a as i}from"./chunk-UABS3NKN.js";import{a as o,b as g}from"./chunk-NMGTPVN6.js";import{a as p}from"./chunk-CUGLFOIX.js";import{b as l,g as c,h as u}from"./chunk-XTHHX2BA.js";import{a as n}from"./chunk-7X4DHW36.js";import{Fragment as s,jsx as e,jsxs as a}from"https://esm.sh/react@19.3.0/jsx-runtime";function f(r){let t=g();return a(s,{children:[a("p",{children:["First, install the latest versions of ",e("a",{href:o.home(t,r.library,r.language),children:"react-srv"})," and ",e("a",{href:l,children:"React"}),"."]}),a("figure",{children:[e(i,{lang:"bash",children:`npm i react-srv
      
npm i react
npm i react-dom

npm i @types/react --save-dev
npm i @types/react-dom --save-dev`}),e("figcaption",{children:"shell"})]}),a("p",{children:["Then, to make sure React is defined correctly at runtime, add the following entries to your ",e("code",{children:"tsconfig.json"})," file."]}),a("figure",{children:[e(i,{lang:"json",children:`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}`}),e("figcaption",{children:"tsconfig.json"})]})]})}n(f,"TypescriptSetup");function d(r){let t=g();return a(s,{children:[a("p",{children:["First, install the latest versions of ",e("a",{href:o.home(t,r.library,r.language),children:"react-srv"}),", ",e("a",{href:l,children:"React"})," and ",e("a",{href:c,target:"_blank",children:"tsx"}),"."]}),a("figure",{children:[e(i,{lang:"bash",children:`npm i react-srv

npm i react
npm i react-dom

# install tsx as a dev dependency
npm i tsx --save-dev`}),e("figcaption",{children:"shell"})]}),a("p",{children:["Then, to make sure React is defined correctly at runtime, you'll need to add a ",e("code",{children:"tsconfig.json"})," file."]}),a("figure",{children:[e(i,{lang:"json",children:`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}`}),e("figcaption",{children:"tsconfig.json"})]}),a("p",{children:["Finally, you'll need to run your app with ",e("code",{children:"tsx"})," so you avoid the ",e("code",{className:"error",children:'Unknown file extension ".jsx"'})," error."]}),a("figure",{children:[e(i,{lang:"bash",children:"tsx src/server.js"}),e("figcaption",{children:"shell"})]})]})}n(d,"JSESMSetup");function h(r){let t=g();return a(s,{children:[a("p",{children:["First, install the latest versions of ",e("a",{href:o.home(t,r.library,r.language),children:"react-srv"}),", ",e("a",{href:l,children:"React"})," and ",e("a",{href:u,target:"_blank",children:"babel"}),"."]}),a("figure",{children:[e(i,{lang:"bash",children:`npm i react-srv

npm i react
npm i react-dom

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev
npm i @babel/plugin-transform-modules-commonjs --save-dev`}),e("figcaption",{children:"shell"})]}),a("p",{children:["Then, add a ",e("code",{children:".babelrc"})," file where we'll setup the react preset so the server recognises JSX syntax and a plugin for module resolution inside ",e("code",{children:".jsx"})," files."]}),a("figure",{children:[e(i,{lang:"json",children:`{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-transform-modules-commonjs"]
}
`}),e("figcaption",{children:".babelrc"})]}),a("p",{children:["Then, in the same file where you setup ",e("code",{children:"ReactSrv"}),", make sure you add the following line."]}),a("figure",{children:[e(i,{lang:"javascript",children:"require('@babel/register')({ extensions: ['.js', '.jsx'] });"}),e("figcaption",{children:"server.js"})]}),a("p",{children:["This will allow other files to ",e("code",{children:"require"})," files with the ",e("code",{children:".jsx"})," extension:"]}),a("figure",{children:[e(i,{lang:"javascript",children:"const Page = require('./pages/Page.jsx').default;"}),e("figcaption",{children:"server.js"})]})]})}n(h,"JSCJSSetup");function m(r){return a(s,{children:[e("hgroup",{children:e("h2",{children:"Setup"})}),r.language==="typescript"&&e(f,{library:r.library,language:r.language}),r.language==="javascript-esm"&&e(d,{library:r.library,language:r.language}),r.language==="javascript-cjs"&&e(h,{library:r.library,language:r.language}),a("article",{className:"success",children:[a("p",{role:"group",children:[e(p,{}),e("b",{children:"Example"})]}),a("p",{children:["Check out a fully set up project ",e("a",{href:o.External.Example(r.library,r.language),target:"_blank",children:"here"}),"."]})]})]})}n(m,"SetupSection");export{m as a};
