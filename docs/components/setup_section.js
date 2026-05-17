import C from"react";import{hydrateRoot as w}from"react-dom/client";var c="https://react.dev/";var d="https://github.com/privatenumber/tsx",m="https://babeljs.io/";var h="https://github.com/gobi-tools/react-srv/tree/main/demos/ts",g="https://github.com/gobi-tools/react-srv/tree/main/demos/js-esm",f="https://github.com/gobi-tools/react-srv/tree/main/demos/js-cjs";var p="react-srv";import{useState as j}from"react";import{jsx as _,jsxs as S}from"react/jsx-runtime";function a(){return S("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[_("path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}),_("circle",{cx:"12",cy:"12",r:"3"})]})}import{useState as v,useEffect as x}from"react";function n(){let[r,o]=v(void 0);return x(()=>{if(typeof window<"u"){let b=window.location.pathname.includes(p)?p:"";o(b)}},[]),r}var E="index.html",T="pages/production.html",U="pages/static.html",s=class r{static baseRoute="";static home(o){return`${r.getBase(o)}${E}`}static production(o){return`${r.getBase(o)}${T}`}static stat(o){return`${r.getBase(o)}${U}`}static getBase(o){return o?o===""?"/":`/${o}/`:"/"}};import{Fragment as u,jsx as e,jsxs as t}from"react/jsx-runtime";function y(){let r=n();return t(u,{children:[t("p",{children:["First, install the latest versions of ",e("a",{href:s.home(r),children:"react-srv"})," and ",e("a",{href:c,target:"_blank",children:"React"}),"."]}),e("figure",{children:e("pre",{children:e("code",{children:`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# optionally install the associated types
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev`})})}),t("p",{children:["Then, to make sure React is defined correctly at runtime, add the following entries to your ",e("code",{children:"tsconfig.json"})," file."]}),e("figure",{children:e("pre",{children:e("code",{children:`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}`})})}),t("blockquote",{className:"card success",children:[t("p",{className:"group",children:[e(a,{}),e("b",{children:"Demo"})]}),t("p",{children:["Check out a fully setup TypeScript project ",e("a",{href:h,target:"_blank",children:"here"}),"."]})]})]})}function k(){let r=n();return t(u,{children:[t("p",{children:["First, install the latest versions of ",e("a",{href:s.home(r),children:"react-srv"}),", ",e("a",{href:c,target:"_blank",children:"React"})," and ",e("a",{href:d,target:"_blank",children:"tsx"}),"."]}),e("figure",{children:e("pre",{children:e("code",{children:`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install tsx as a dev dependency
npm i tsx --save-dev`})})}),t("p",{children:["Then, to make sure React is defined correctly at runtime, you'll need to add a ",e("code",{children:"tsconfig.json"})," file."]}),e("figure",{children:e("pre",{children:e("code",{children:`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}`})})}),t("p",{children:["Finally, you'll need to run your app with ",e("code",{children:"tsx"})," so you avoid the ",e("code",{className:"error",children:'Unknown file extension ".jsx"'})," error."]}),e("figure",{children:e("pre",{children:e("code",{children:"tsx src/server.js"})})}),t("blockquote",{className:"card success",children:[t("p",{className:"group",children:[e(a,{}),e("b",{children:"Demo"})]}),t("p",{children:["Check out a fully setup ESM Javascript project ",e("a",{href:g,target:"_blank",children:"here"}),"."]})]})]})}function L(){let r=n();return t(u,{children:[t("p",{children:["First, install the latest versions of ",e("a",{href:s.home(r),children:"react-srv"}),", ",e("a",{href:c,target:"_blank",children:"React"})," and ",e("a",{href:m,target:"_blank",children:"babel"}),"."]}),e("figure",{children:e("pre",{children:e("code",{children:`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev`})})}),t("p",{children:["Then, add a ",e("code",{children:".babelrc"})," file where we'll setup the react preset so the server recognises JSX syntax."]}),e("figure",{children:e("pre",{children:e("code",{children:`{
  "presets": ["@babel/preset-react"]
}
`})})}),t("p",{children:["Then, in the same file where you setup ",e("code",{children:"ReactSrv"}),", make sure you add the following line."]}),e("figure",{children:e("pre",{children:e("code",{children:"require('@babel/register')({ extensions: ['.js', '.jsx'] });"})})}),t("p",{children:["This will allow other files to ",e("code",{children:"require"})," files with the ",e("code",{children:".jsx"})," extension:"]}),e("figure",{children:e("pre",{children:e("code",{children:"const Page = require('./pages/Page.jsx').default;"})})}),t("blockquote",{className:"card success",children:[t("p",{className:"group",children:[e(a,{}),e("b",{children:"Demo"})]}),t("p",{children:["Check out a fully setup CommonJS Javascript project ",e("a",{href:f,target:"_blank",children:"here"}),"."]})]})]})}function l(){let[r,o]=j("ts");return t("section",{children:[t("hgroup",{children:[e("h2",{children:"Setup"}),e("p",{children:"Setup is slightly different based on the platform you're running:"})]}),t("menu",{children:[e("li",{"aria-selected":r==="ts",children:e("a",{onClick:()=>o("ts"),children:"Typescript"})}),e("li",{"aria-selected":r==="js-esm",children:e("a",{onClick:()=>o("js-esm"),children:"Javascript (ESM)"})}),e("li",{"aria-selected":r==="js-cjs",children:e("a",{onClick:()=>o("js-cjs"),children:"Javascript (CJS)"})})]}),e("br",{}),r==="ts"&&e(y,{}),r==="js-esm"&&e(k,{}),r==="js-cjs"&&e(L,{})]})}var R=document.getElementById("root");if(!R)throw new Error("react-srv: Could not find hydration root.");globalThis.__REACT_SRV_HYDRATED__||(globalThis.__REACT_SRV_HYDRATED__=!0,w(R,C.createElement(l,globalThis.__INITIAL_PROPS__||{})));
