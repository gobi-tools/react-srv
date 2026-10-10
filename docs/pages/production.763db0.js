import{a as n}from"../chunk-RRLGOF7Y.js";import"../chunk-2W3JBRBS.js";import{a as t}from"../chunk-UABS3NKN.js";import{b as r,r as c}from"../chunk-F6WBBOKJ.js";import{a as d}from"../chunk-CUGLFOIX.js";import{a}from"../chunk-7X4DHW36.js";import l from"https://esm.sh/react@19.3.0";import{hydrateRoot as h}from"https://esm.sh/react-dom@19.3.0/client";import{Fragment as p,jsx as e,jsxs as o}from"https://esm.sh/react@19.3.0/jsx-runtime";function i(){return o(p,{children:[e("header",{children:e(n,{})}),e("main",{children:o("section",{children:[o("hgroup",{children:[e("h2",{children:"Production"}),o("p",{children:["Every time the ",e("code",{children:"render"})," method is called, ",r," transforms a JSX component into HTML and Javascript:"]})]}),e("figure",{children:e(t,{lang:"xml",children:`<html>
  <head><title>Page</title></head>
  <body>...</body>
  <script>... set initial props ...<\/script>
  <script type="module">... inline hydration script ... <\/script>
</html>`})}),o("p",{children:["The markup is created from the component itself and the hydration script is created by reading the source file, ",e("code",{children:"Page.tsx"})," or ",e("code",{children:"Page.jsx"}),", from disk."]}),e("p",{children:"This is good for development but it's not ideal for production, first because the source code might not be present at all and second because reading and compiling code every time is not very efficient."}),o("p",{children:["So, for production we can ",e("b",{children:"precompile"})," the necessary javascript and have it ready to go."]}),o("p",{children:["By default, ",r," looks in the ",e("code",{children:"./src"})," folder to find React files and outputs compiled javascript in ",e("code",{children:"./public/hydrate"}),"."]}),e("p",{children:"You can change these locations, as well as whether you're in dev or prod mode, in the config file:"}),e("p",{children:"You can also, separately, choose to minify the code or not."}),e("figure",{children:e(t,{lang:"javascript",children:`export default {
  Document,
  srcPath: './src', // default
  outPath: './public/hydrate', // default
  isProd: process.env.NODE_ENV === 'production', // serve inline or precompiled code
  minify: true, // minify JS or not
  splitting: true, // split large JS files into small ones that can be reused and cached
}`})}),o("p",{children:["You can reference the config file in the ",e("code",{children:"bundle"})," command in ",e("code",{children:"package.json"})]}),e("figure",{children:e(t,{lang:"json",children:`...
"scripts": {
  "build": "react-srv bundle -f src/react-srv.config.ts && ... other build steps",
  "start": "NODE_ENV=production node dist/server.js"
},`})}),o("p",{children:["The last thing you need to do is to make sure the ",e("code",{children:"/public"})," folder is statically served and accessible and you're good to go."]}),o("article",{className:"success",children:[o("p",{role:"group",children:[e(d,{}),e("b",{children:"Example"})]}),o("p",{children:["Check out production ready example for Typescript and Javascript ",e("a",{href:c,target:"_blank",children:"here"}),"."]})]})]})})]})}a(i,"Production");var s=document.getElementById("root");if(!s)throw new Error("react-srv: Could not find hydration root.");globalThis.__REACT_SRV_HYDRATED__||(globalThis.__REACT_SRV_HYDRATED__=!0,h(s,l.createElement(i,globalThis.__INITIAL_PROPS__||{})));
