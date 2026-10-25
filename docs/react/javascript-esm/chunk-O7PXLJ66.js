import{a as t}from"./chunk-PJS7ZFFE.js";import{a as o,b as l}from"./chunk-P6QE3MH3.js";import{a as d}from"./chunk-SQQJIDES.js";import{b as g,c,d as u,e as p}from"./chunk-PAHMRHH2.js";import{a as n}from"./chunk-7X4DHW36.js";import{Fragment as s,jsx as e,jsxs as a}from"https://esm.sh/react@19.3.1/jsx-runtime";function f(r){let i=l();return a(s,{children:[a("p",{children:["First, install the latest versions of ",e("a",{href:o.home(i,r.library,r.language),children:"react-srv"})," and ",e("a",{href:g,children:"React"}),"."]}),a("figure",{children:[e(t,{lang:"bash",children:`npm i react-srv
      
# preferrably same version
npm i react
npm i react-dom

npm i @types/react --save-dev
npm i @types/react-dom --save-dev`}),e("figcaption",{children:"shell"})]}),a("p",{children:["Then, to make sure React is defined correctly at runtime, add the following entries to your ",e("code",{children:"tsconfig.json"})," file."]}),a("figure",{children:[e(t,{lang:"json",children:`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}`}),e("figcaption",{children:"tsconfig.json"})]})]})}n(f,"ReactTSSetup");function m(r){let i=l();return a(s,{children:[a("p",{children:["First, install the latest versions of ",e("a",{href:o.home(i,r.library,r.language),children:"react-srv"}),", ",e("a",{href:g,children:"React"})," and ",e("a",{href:u,target:"_blank",children:"tsx"}),"."]}),a("figure",{children:[e(t,{lang:"bash",children:`npm i react-srv

# preferrably same version
npm i react
npm i react-dom

# install tsx as a dev dependency
npm i tsx --save-dev`}),e("figcaption",{children:"shell"})]}),a("p",{children:["Then, to make sure React is defined correctly at runtime, you'll need to add a ",e("code",{children:"tsconfig.json"})," file."]}),a("figure",{children:[e(t,{lang:"json",children:`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}`}),e("figcaption",{children:"tsconfig.json"})]}),a("p",{children:["Finally, you'll need to run your app with ",e("code",{children:"tsx"})," so you avoid the ",e("code",{className:"error",children:'Unknown file extension ".jsx"'})," error."]}),a("figure",{children:[e(t,{lang:"bash",children:"tsx src/server.js"}),e("figcaption",{children:"shell"})]})]})}n(m,"ReactJSESMSetup");function h(r){let i=l();return a(s,{children:[a("p",{children:["First, install the latest versions of ",e("a",{href:o.home(i,r.library,r.language),children:"react-srv"}),", ",e("a",{href:g,children:"React"})," and ",e("a",{href:p,target:"_blank",children:"babel"}),"."]}),a("figure",{children:[e(t,{lang:"bash",children:`npm i react-srv

# preferrably same version
npm i react
npm i react-dom

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev
npm i @babel/plugin-transform-modules-commonjs --save-dev`}),e("figcaption",{children:"shell"})]}),a("p",{children:["Then, add a ",e("code",{children:".babelrc"})," file where we'll setup the react preset so the server recognises JSX syntax and a plugin for module resolution inside ",e("code",{children:".jsx"})," files."]}),a("figure",{children:[e(t,{lang:"json",children:`{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-modules-commonjs"
  ]
}
`}),e("figcaption",{children:".babelrc"})]}),a("p",{children:["Then, in the same file where you setup ",e("code",{children:"ReactSrv"}),", make sure you add the following line."]}),a("figure",{children:[e(t,{lang:"javascript",children:"require('@babel/register')({ extensions: ['.js', '.jsx'] });"}),e("figcaption",{children:"server.js"})]}),a("p",{children:["This will allow other files to ",e("code",{children:"require"})," files with the ",e("code",{children:".jsx"})," extension:"]}),a("figure",{children:[e(t,{lang:"javascript",children:"const Page = require('./pages/Page.jsx').default;"}),e("figcaption",{children:"server.js"})]})]})}n(h,"ReactJSCJSSetup");function b(r){let i=l();return a(s,{children:[a("p",{children:["First, install the latest versions of ",e("a",{href:o.home(i,r.library,r.language),children:"react-srv"})," and ",e("a",{href:c,children:"Preact"}),"."]}),a("figure",{children:[e(t,{lang:"bash",children:`npm i react-srv
      
npm i preact
npm i preact-iso
npm i preact-render-to-string # needed for SSR/SSG
`}),e("figcaption",{children:"shell"})]}),a("p",{children:["Then, to make sure Preact is defined correctly at runtime, add the following entries to your ",e("code",{children:"tsconfig.json"})," file."]}),a("figure",{children:[e(t,{lang:"javascript",children:`{
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
}`}),e("figcaption",{children:"tsconfig.json"})]})]})}n(b,"PreactTSSetup");function y(r){let i=l();return a(s,{children:[a("p",{children:["First, install the latest versions of ",e("a",{href:o.home(i,r.library,r.language),children:"react-srv"}),", ",e("a",{href:c,children:"Preact"})," and ",e("a",{href:u,target:"_blank",children:"tsx"}),"."]}),a("figure",{children:[e(t,{lang:"bash",children:`npm i react-srv

npm i preact
npm i preact-iso
npm i preact-render-to-string # needed for SSR/SSG

# install tsx as a dev dependency
npm i tsx --save-dev`}),e("figcaption",{children:"shell"})]}),a("p",{children:["Then, to make sure React is defined correctly at runtime, you'll need to add a ",e("code",{children:"tsconfig.json"})," file."]}),a("figure",{children:[e(t,{lang:"json",children:`{
  "compilerOptions": {
    /* Preact Config */
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "skipLibCheck": true,
    "allowJs": true,
    "paths": {
      "react": ["./node_modules/preact/compat/dist/compat.mjs"],
      "react-dom": ["./node_modules/preact/compat/dist/compat.mjs"],
      "react-dom/client": ["./node_modules/preact/compat/client.mjs"],
      "react-dom/server": ["./node_modules/preact/compat/server.mjs"]
    }
  }
}`}),e("figcaption",{children:"tsconfig.json"})]}),a("p",{children:["Finally, you'll need to run your app with ",e("code",{children:"tsx"})," so you avoid the ",e("code",{className:"error",children:'Unknown file extension ".jsx"'})," error."]}),a("figure",{children:[e(t,{lang:"bash",children:"tsx src/server.js"}),e("figcaption",{children:"shell"})]})]})}n(y,"PreactJSESMSetup");function v(r){let i=l();return a(s,{children:[a("p",{children:["First, install the latest versions of ",e("a",{href:o.home(i,r.library,r.language),children:"react-srv"}),", ",e("a",{href:c,children:"Preact"})," and ",e("a",{href:p,target:"_blank",children:"babel"}),"."]}),a("figure",{children:[e(t,{lang:"bash",children:`npm i react-srv

npm i preact
npm i preact-iso
npm i preact-render-to-string # needed for SSR/SSG

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev
npm i @babel/plugin-transform-modules-commonjs --save-dev`}),e("figcaption",{children:"shell"})]}),a("p",{children:["Then, add a ",e("code",{children:".babelrc"})," file where we'll still need to setup the React preset so the server recognises JSX syntax and a plugin for module resolution inside ",e("code",{children:".jsx"})," files."]}),a("figure",{children:[e(t,{lang:"json",children:`{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "preact"
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-modules-commonjs"
  ]
}
`}),e("figcaption",{children:".babelrc"})]}),a("p",{children:["Then, in the same file where you setup ",e("code",{children:"ReactSrv"}),", make sure you add the following line."]}),a("figure",{children:[e(t,{lang:"javascript",children:"require('@babel/register')({ extensions: ['.js', '.jsx'] });"}),e("figcaption",{children:"server.js"})]}),a("p",{children:["This will allow other files to ",e("code",{children:"require"})," files with the ",e("code",{children:".jsx"})," extension:"]}),a("figure",{children:[e(t,{lang:"javascript",children:"const Page = require('./pages/Page.jsx').default;"}),e("figcaption",{children:"server.js"})]})]})}n(v,"PreactJSCJSSetup");function j(r){return a(s,{children:[e("hgroup",{children:e("h2",{children:"Setup"})}),r.library==="preact"&&r.language==="typescript"&&e(b,{library:r.library,language:r.language}),r.library==="preact"&&r.language==="javascript-esm"&&e(y,{library:r.library,language:r.language}),r.library==="preact"&&r.language==="javascript-cjs"&&e(v,{library:r.library,language:r.language}),r.library==="react"&&r.language==="typescript"&&e(f,{library:r.library,language:r.language}),r.library==="react"&&r.language==="javascript-esm"&&e(m,{library:r.library,language:r.language}),r.library==="react"&&r.language==="javascript-cjs"&&e(h,{library:r.library,language:r.language}),a("article",{className:"success",children:[a("p",{role:"group",children:[e(d,{}),e("b",{children:"Example"})]}),a("p",{children:["Check out a fully set up project ",e("a",{href:o.External.Example(r.library,r.language),target:"_blank",children:"here"}),"."]})]})]})}n(j,"SetupSection");export{j as a};
