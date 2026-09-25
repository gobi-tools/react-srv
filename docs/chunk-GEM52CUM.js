import{a}from"./chunk-YNLKMDWW.js";import{a as s,b as o}from"./chunk-EJXGEMZ5.js";import{a as n}from"./chunk-75XGLWSG.js";import{b as i,f as p,g as u,h as d,i as g,j as m}from"./chunk-LNDXGK3P.js";import{useState as h}from"https://esm.sh/react@19.2.0";import{Fragment as l,jsx as e,jsxs as t}from"https://esm.sh/react@19.2.0/jsx-runtime";function f(){let r=o();return t(l,{children:[t("p",{children:["First, install the latest versions of ",e("a",{href:s.home(r),children:"react-srv"})," and ",e("a",{href:i,target:"_blank",children:"React"}),"."]}),e("figure",{children:e(a,{lang:"bash",children:`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# optionally install the associated types
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev`})}),t("p",{children:["Then, to make sure React is defined correctly at runtime, add the following entries to your ",e("code",{children:"tsconfig.json"})," file."]}),e("figure",{children:e(a,{lang:"json",children:`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}`})}),t("article",{className:"success",children:[t("p",{role:"group",children:[e(n,{}),e("b",{children:"Example"})]}),t("p",{children:["Check out a fully set up TypeScript project ",e("a",{href:d,target:"_blank",children:"here"}),"."]})]})]})}function b(){let r=o();return t(l,{children:[t("p",{children:["First, install the latest versions of ",e("a",{href:s.home(r),children:"react-srv"}),", ",e("a",{href:i,target:"_blank",children:"React"})," and ",e("a",{href:p,target:"_blank",children:"tsx"}),"."]}),e("figure",{children:e(a,{lang:"bash",children:`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install tsx as a dev dependency
npm i tsx --save-dev`})}),t("p",{children:["Then, to make sure React is defined correctly at runtime, you'll need to add a ",e("code",{children:"tsconfig.json"})," file."]}),e("figure",{children:e(a,{lang:"json",children:`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}`})}),t("p",{children:["Finally, you'll need to run your app with ",e("code",{children:"tsx"})," so you avoid the ",e("code",{className:"error",children:'Unknown file extension ".jsx"'})," error."]}),e("figure",{children:e(a,{lang:"bash",children:"tsx src/server.js"})}),t("article",{className:"success",children:[t("p",{role:"group",children:[e(n,{}),e("b",{children:"Example"})]}),t("p",{children:["Check out a fully set up ESM Javascript project ",e("a",{href:g,target:"_blank",children:"here"}),"."]})]})]})}function j(){let r=o();return t(l,{children:[t("p",{children:["First, install the latest versions of ",e("a",{href:s.home(r),children:"react-srv"}),", ",e("a",{href:i,target:"_blank",children:"React"})," and ",e("a",{href:u,target:"_blank",children:"babel"}),"."]}),e("figure",{children:e(a,{lang:"bash",children:`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev
npm i @babel/plugin-transform-modules-commonjs --save-dev`})}),t("p",{children:["Then, add a ",e("code",{children:".babelrc"})," file where we'll setup the react preset so the server recognises JSX syntax and a plugin for module resolution inside ",e("code",{children:".jsx"})," files."]}),e("figure",{children:e(a,{lang:"json",children:`{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-transform-modules-commonjs"]
}
`})}),t("p",{children:["Then, in the same file where you setup ",e("code",{children:"ReactSrv"}),", make sure you add the following line."]}),e("figure",{children:e(a,{lang:"javascript",children:"require('@babel/register')({ extensions: ['.js', '.jsx'] });"})}),t("p",{children:["This will allow other files to ",e("code",{children:"require"})," files with the ",e("code",{children:".jsx"})," extension:"]}),e("figure",{children:e(a,{lang:"javascript",children:"const Page = require('./pages/Page.jsx').default;"})}),t("article",{className:"success",children:[t("p",{role:"group",children:[e(n,{}),e("b",{children:"Example"})]}),t("p",{children:["Check out a fully set up CommonJS Javascript project ",e("a",{href:m,target:"_blank",children:"here"}),"."]})]})]})}function v(){let[r,c]=h("ts");return t(l,{children:[t("hgroup",{children:[e("h2",{children:"Setup"}),e("p",{children:"Setup is slightly different based on the platform you're running:"})]}),t("menu",{children:[e("li",{"aria-selected":r==="ts",children:e("a",{onClick:()=>c("ts"),children:"Typescript"})}),e("li",{"aria-selected":r==="js-esm",children:e("a",{onClick:()=>c("js-esm"),children:"Javascript (ESM)"})}),e("li",{"aria-selected":r==="js-cjs",children:e("a",{onClick:()=>c("js-cjs"),children:"Javascript (CJS)"})})]}),e("br",{}),r==="ts"&&e(f,{}),r==="js-esm"&&e(b,{}),r==="js-cjs"&&e(j,{})]})}export{v as a};
