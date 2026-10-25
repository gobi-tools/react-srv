import{a as t}from"./chunk-UABS3NKN.js";import{a as o,b as l}from"./chunk-WAWEZLYL.js";import{a as f}from"./chunk-CUGLFOIX.js";import{b as s,c,d as u,e as p}from"./chunk-PAHMRHH2.js";import{a as n}from"./chunk-7X4DHW36.js";import{Fragment as g,jsx as e,jsxs as r}from"https://esm.sh/react@19.3.0/jsx-runtime";function d(a){let i=l();return r(g,{children:[r("p",{children:["First, install the latest versions of ",e("a",{href:o.home(i,a.library,a.language),children:"react-srv"})," and ",e("a",{href:s,children:"React"}),"."]}),r("figure",{children:[e(t,{lang:"bash",children:`npm i react-srv
      
# preferrably same version
npm i react
npm i react-dom

npm i @types/react --save-dev
npm i @types/react-dom --save-dev`}),e("figcaption",{children:"shell"})]}),r("p",{children:["Then, to make sure React is defined correctly at runtime, add the following entries to your ",e("code",{children:"tsconfig.json"})," file."]}),r("figure",{children:[e(t,{lang:"json",children:`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}`}),e("figcaption",{children:"tsconfig.json"})]})]})}n(d,"ReactTypescriptSetup");function h(a){let i=l();return r(g,{children:[r("p",{children:["First, install the latest versions of ",e("a",{href:o.home(i,a.library,a.language),children:"react-srv"}),", ",e("a",{href:s,children:"React"})," and ",e("a",{href:u,target:"_blank",children:"tsx"}),"."]}),r("figure",{children:[e(t,{lang:"bash",children:`npm i react-srv

# preferrably same version
npm i react
npm i react-dom

# install tsx as a dev dependency
npm i tsx --save-dev`}),e("figcaption",{children:"shell"})]}),r("p",{children:["Then, to make sure React is defined correctly at runtime, you'll need to add a ",e("code",{children:"tsconfig.json"})," file."]}),r("figure",{children:[e(t,{lang:"json",children:`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}`}),e("figcaption",{children:"tsconfig.json"})]}),r("p",{children:["Finally, you'll need to run your app with ",e("code",{children:"tsx"})," so you avoid the ",e("code",{className:"error",children:'Unknown file extension ".jsx"'})," error."]}),r("figure",{children:[e(t,{lang:"bash",children:"tsx src/server.js"}),e("figcaption",{children:"shell"})]})]})}n(h,"ReactJSESMSetup");function m(a){let i=l();return r(g,{children:[r("p",{children:["First, install the latest versions of ",e("a",{href:o.home(i,a.library,a.language),children:"react-srv"}),", ",e("a",{href:s,children:"React"})," and ",e("a",{href:p,target:"_blank",children:"babel"}),"."]}),r("figure",{children:[e(t,{lang:"bash",children:`npm i react-srv

# preferrably same version
npm i react
npm i react-dom

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev
npm i @babel/plugin-transform-modules-commonjs --save-dev`}),e("figcaption",{children:"shell"})]}),r("p",{children:["Then, add a ",e("code",{children:".babelrc"})," file where we'll setup the react preset so the server recognises JSX syntax and a plugin for module resolution inside ",e("code",{children:".jsx"})," files."]}),r("figure",{children:[e(t,{lang:"json",children:`{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-transform-modules-commonjs"]
}
`}),e("figcaption",{children:".babelrc"})]}),r("p",{children:["Then, in the same file where you setup ",e("code",{children:"ReactSrv"}),", make sure you add the following line."]}),r("figure",{children:[e(t,{lang:"javascript",children:"require('@babel/register')({ extensions: ['.js', '.jsx'] });"}),e("figcaption",{children:"server.js"})]}),r("p",{children:["This will allow other files to ",e("code",{children:"require"})," files with the ",e("code",{children:".jsx"})," extension:"]}),r("figure",{children:[e(t,{lang:"javascript",children:"const Page = require('./pages/Page.jsx').default;"}),e("figcaption",{children:"server.js"})]})]})}n(m,"ReactJSCJSSetup");function b(a){let i=l();return r(g,{children:[r("p",{children:["First, install the latest versions of ",e("a",{href:o.home(i,a.library,a.language),children:"react-srv"})," and ",e("a",{href:c,children:"Preact"}),"."]}),r("figure",{children:[e(t,{lang:"bash",children:`npm i react-srv
      
npm i preact
npm i preact-iso
npm i preact-render-to-string // optional
`}),e("figcaption",{children:"shell"})]}),r("p",{children:["Then, to make sure Preact is defined correctly at runtime, add the following entries to your ",e("code",{children:"tsconfig.json"})," file."]}),r("figure",{children:[e(t,{lang:"javascript",children:`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "paths": {
      "react": ["./node_modules/preact/compat/"],
      "react-dom": ["./node_modules/preact/compat/"],
      "react-dom/*": ["./node_modules/preact/compat/*"]
    }
  }
}`}),e("figcaption",{children:"tsconfig.json"})]})]})}n(b,"PreactTypescriptSetup");function y(a){return r(g,{children:[e("hgroup",{children:e("h2",{children:"Setup"})}),a.library==="preact"&&a.language==="typescript"&&e(b,{library:a.library,language:a.language}),a.library==="react"&&a.language==="typescript"&&e(d,{library:a.library,language:a.language}),a.library==="react"&&a.language==="javascript-esm"&&e(h,{library:a.library,language:a.language}),a.library==="react"&&a.language==="javascript-cjs"&&e(m,{library:a.library,language:a.language}),r("article",{className:"success",children:[r("p",{role:"group",children:[e(f,{}),e("b",{children:"Example"})]}),r("p",{children:["Check out a fully set up project ",e("a",{href:o.External.Example(a.library,a.language),target:"_blank",children:"here"}),"."]})]})]})}n(y,"SetupSection");export{y as a};
