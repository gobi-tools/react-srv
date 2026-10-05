import{a as s}from"./chunk-NSXYJKJR.js";import{a as o,j as p,k as u,m as g,n as h,o as d,t as i}from"./chunk-6YIGAEKV.js";import{a as l}from"./chunk-ALUY5FAV.js";import{a}from"./chunk-3SPXEKH7.js";import{useState as f}from"https://esm.sh/react@19.3.0";import{Fragment as n,jsx as e,jsxs as t}from"https://esm.sh/react@19.3.0/jsx-runtime";function m(){let r=i();return t(n,{children:[t("p",{children:["First, install the latest versions of ",e("a",{href:o.home(r),children:"react-srv"}),"."]}),e("figure",{children:e(s,{lang:"bash",children:"npm i react-srv"})}),t("p",{children:["Then, to make sure React is defined correctly at runtime, add the following entries to your ",e("code",{children:"tsconfig.json"})," file."]}),e("figure",{children:e(s,{lang:"json",children:`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}`})}),t("article",{className:"success",children:[t("p",{role:"group",children:[e(l,{}),e("b",{children:"Example"})]}),t("p",{children:["Check out a fully set up TypeScript project ",e("a",{href:g,target:"_blank",children:"here"}),"."]})]})]})}a(m,"TypescriptSetup");function j(){let r=i();return t(n,{children:[t("p",{children:["First, install the latest versions of ",e("a",{href:o.home(r),children:"react-srv"})," and ",e("a",{href:p,target:"_blank",children:"tsx"}),"."]}),e("figure",{children:e(s,{lang:"bash",children:`npm i react-srv

# install tsx as a dev dependency
npm i tsx --save-dev`})}),t("p",{children:["Then, to make sure React is defined correctly at runtime, you'll need to add a ",e("code",{children:"tsconfig.json"})," file."]}),e("figure",{children:e(s,{lang:"json",children:`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}`})}),t("p",{children:["Finally, you'll need to run your app with ",e("code",{children:"tsx"})," so you avoid the ",e("code",{className:"error",children:'Unknown file extension ".jsx"'})," error."]}),e("figure",{children:e(s,{lang:"bash",children:"tsx src/server.js"})}),t("article",{className:"success",children:[t("p",{role:"group",children:[e(l,{}),e("b",{children:"Example"})]}),t("p",{children:["Check out a fully set up ESM Javascript project ",e("a",{href:h,target:"_blank",children:"here"}),"."]})]})]})}a(j,"JSESMSetup");function b(){let r=i();return t(n,{children:[t("p",{children:["First, install the latest versions of ",e("a",{href:o.home(r),children:"react-srv"})," and ",e("a",{href:u,target:"_blank",children:"babel"}),"."]}),e("figure",{children:e(s,{lang:"bash",children:`npm i react-srv

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev
npm i @babel/plugin-transform-modules-commonjs --save-dev`})}),t("p",{children:["Then, add a ",e("code",{children:".babelrc"})," file where we'll setup the react preset so the server recognises JSX syntax and a plugin for module resolution inside ",e("code",{children:".jsx"})," files."]}),e("figure",{children:e(s,{lang:"json",children:`{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-transform-modules-commonjs"]
}
`})}),t("p",{children:["Then, in the same file where you setup ",e("code",{children:"ReactSrv"}),", make sure you add the following line."]}),e("figure",{children:e(s,{lang:"javascript",children:"require('@babel/register')({ extensions: ['.js', '.jsx'] });"})}),t("p",{children:["This will allow other files to ",e("code",{children:"require"})," files with the ",e("code",{children:".jsx"})," extension:"]}),e("figure",{children:e(s,{lang:"javascript",children:"const Page = require('./pages/Page.jsx').default;"})}),t("article",{className:"success",children:[t("p",{role:"group",children:[e(l,{}),e("b",{children:"Example"})]}),t("p",{children:["Check out a fully set up CommonJS Javascript project ",e("a",{href:d,target:"_blank",children:"here"}),"."]})]})]})}a(b,"JSCJSSetup");function v(){let[r,c]=f("ts");return t(n,{children:[t("hgroup",{children:[e("h2",{children:"Setup"}),e("p",{children:"Setup is slightly different based on the platform you're running:"})]}),t("menu",{children:[e("li",{"aria-selected":r==="ts",children:e("a",{onClick:()=>c("ts"),children:"Typescript"})}),e("li",{"aria-selected":r==="js-esm",children:e("a",{onClick:()=>c("js-esm"),children:"Javascript (ESM)"})}),e("li",{"aria-selected":r==="js-cjs",children:e("a",{onClick:()=>c("js-cjs"),children:"Javascript (CJS)"})})]}),e("br",{}),r==="ts"&&e(m,{}),r==="js-esm"&&e(j,{}),r==="js-cjs"&&e(b,{})]})}a(v,"SetupSection");export{v as a};
