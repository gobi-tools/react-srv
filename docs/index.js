import q from"react";import{hydrateRoot as $}from"react-dom/client";var j="index.html",P="pages/production.html",A="pages/static.html",n=class s{static baseRoute="";static home(a){return`${s.getBase(a)}${j}`}static production(a){return`${s.getBase(a)}${P}`}static stat(a){return`${s.getBase(a)}${A}`}static getBase(a){return a?a===""?"/":`/${a}/`:"/"}};import{useState as O,useEffect as D}from"react";var i="React Srv",u="https://react.dev/",b="https://react.dev/learn#components",R="https://react.dev/learn/passing-props-to-a-component",v="https://react.dev/reference/react/hooks";var S="https://github.com/privatenumber/tsx",C="https://babeljs.io/";var x="https://github.com/gobi-tools/react-srv/tree/main/demos/ts",y="https://github.com/gobi-tools/react-srv/tree/main/demos/js-esm",k="https://github.com/gobi-tools/react-srv/tree/main/demos/js-cjs";var T="https://developer.mozilla.org/en-US/docs/Glossary/SSR",E="https://en.wikipedia.org/wiki/Static_site_generator",g="react-srv";function c(){let[s,a]=O(void 0);return D(()=>{if(typeof window<"u"){let U=window.location.pathname.includes(g)?g:"";a(U)}},[]),s}import{jsx as p,jsxs as M}from"react/jsx-runtime";function f(){return M("svg",{width:"98",height:"96",viewBox:"0 0 98 96",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[p("g",{clipPath:"url(#clip0_730_27136)",children:p("path",{d:"M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z",fill:"currentColor"})}),p("defs",{children:p("clipPath",{id:"clip0_730_27136",children:p("rect",{width:"98",height:"96",fill:"currentColor"})})})]})}import{useState as I}from"react";import{jsx as w,jsxs as N}from"react/jsx-runtime";function l(){return N("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[w("path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}),w("circle",{cx:"12",cy:"12",r:"3"})]})}import{Fragment as m,jsx as t,jsxs as r}from"react/jsx-runtime";function J(){let s=c();return r(m,{children:[r("p",{children:["First, install the latest versions of ",t("a",{href:n.home(s),children:"react-srv"})," and ",t("a",{href:u,target:"_blank",children:"React"}),"."]}),t("figure",{children:t("pre",{children:t("code",{children:`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# optionally install the associated types
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev`})})}),r("p",{children:["Then, to make sure React is defined correctly at runtime, add the following entries to your ",t("code",{children:"tsconfig.json"})," file."]}),t("figure",{children:t("pre",{children:t("code",{children:`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}`})})}),r("blockquote",{className:"card success",children:[r("p",{className:"group",children:[t(l,{}),t("b",{children:"Demo"})]}),r("p",{children:["Check out a fully setup TypeScript project ",t("a",{href:x,target:"_blank",children:"here"}),"."]})]})]})}function B(){let s=c();return r(m,{children:[r("p",{children:["First, install the latest versions of ",t("a",{href:n.home(s),children:"react-srv"}),", ",t("a",{href:u,target:"_blank",children:"React"})," and ",t("a",{href:S,target:"_blank",children:"tsx"}),"."]}),t("figure",{children:t("pre",{children:t("code",{children:`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install tsx as a dev dependency
npm i tsx --save-dev`})})}),r("p",{children:["Then, to make sure React is defined correctly at runtime, you'll need to add a ",t("code",{children:"tsconfig.json"})," file."]}),t("figure",{children:t("pre",{children:t("code",{children:`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}`})})}),r("p",{children:["Finally, you'll need to run your app with ",t("code",{children:"tsx"})," so you avoid the ",t("code",{className:"error",children:'Unknown file extension ".jsx"'})," error."]}),t("figure",{children:t("pre",{children:t("code",{children:"tsx src/server.js"})})}),r("blockquote",{className:"card success",children:[r("p",{className:"group",children:[t(l,{}),t("b",{children:"Demo"})]}),r("p",{children:["Check out a fully setup ESM Javascript project ",t("a",{href:y,target:"_blank",children:"here"}),"."]})]})]})}function H(){let s=c();return r(m,{children:[r("p",{children:["First, install the latest versions of ",t("a",{href:n.home(s),children:"react-srv"}),", ",t("a",{href:u,target:"_blank",children:"React"})," and ",t("a",{href:C,target:"_blank",children:"babel"}),"."]}),t("figure",{children:t("pre",{children:t("code",{children:`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev`})})}),r("p",{children:["Then, add a ",t("code",{children:".babelrc"})," file where we'll setup the react preset so the server recognises JSX syntax."]}),t("figure",{children:t("pre",{children:t("code",{children:`{
  "presets": ["@babel/preset-react"]
}
`})})}),r("p",{children:["Then, in the same file where you setup ",t("code",{children:"ReactSrv"}),", make sure you add the following line."]}),t("figure",{children:t("pre",{children:t("code",{children:"require('@babel/register')({ extensions: ['.js', '.jsx'] });"})})}),r("p",{children:["This will allow other files to ",t("code",{children:"require"})," files with the ",t("code",{children:".jsx"})," extension:"]}),t("figure",{children:t("pre",{children:t("code",{children:"const Page = require('./pages/Page.jsx').default;"})})}),r("blockquote",{className:"card success",children:[r("p",{className:"group",children:[t(l,{}),t("b",{children:"Demo"})]}),r("p",{children:["Check out a fully setup CommonJS Javascript project ",t("a",{href:k,target:"_blank",children:"here"}),"."]})]})]})}function h(){let[s,a]=I("ts");return r("section",{children:[r("hgroup",{children:[t("h2",{children:"Setup"}),t("p",{children:"Setup is slightly different based on the platform you're running:"})]}),r("menu",{children:[t("li",{"aria-selected":s==="ts",children:t("a",{onClick:()=>a("ts"),children:"Typescript"})}),t("li",{"aria-selected":s==="js-esm",children:t("a",{onClick:()=>a("js-esm"),children:"Javascript (ESM)"})}),t("li",{"aria-selected":s==="js-cjs",children:t("a",{onClick:()=>a("js-cjs"),children:"Javascript (CJS)"})})]}),t("br",{}),s==="ts"&&t(J,{}),s==="js-esm"&&t(B,{}),s==="js-cjs"&&t(H,{})]})}import{Fragment as G,jsx as e,jsxs as o}from"react/jsx-runtime";function _(){let s=c();return o(G,{children:[e("header",{children:o("div",{className:"align-center",children:[o("hgroup",{children:[e("h1",{children:i}),e("p",{children:"Add React to your server side rendered or statically generated website."})]}),e("p",{children:e("a",{href:"https://github.com/gobi-tools/react-srv",target:"_blank",children:o("button",{children:[e(f,{}),e("span",{children:"Source"})]})})})]})}),o("main",{children:[e("section",{children:o("hgroup",{children:[o("p",{children:["All you need to do is define a React component as a default export of a ",e("code",{children:".tsx"})," or ",e("code",{children:".jsx"})," file of the same name:"]}),e("figure",{children:e("pre",{children:e("code",{children:`export default function Page() {
  return <>
    <h1>Hello, world!</h1>
  </>
}`})})}),o("p",{children:["Optionally add a ",e("code",{children:"react-srv.config.ts"})," or ",e("code",{children:".js"})," file:"]}),e("figure",{children:e("pre",{children:e("code",{children:"export default {}"})})}),o("p",{children:["And ",i," will render it as static HTML you can send down the wire:"]}),e("figure",{children:e("pre",{children:e("code",{children:`const app = express();
const react = new ReactSrv(config);

app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});
`})})})]})}),e("section",{children:o("hgroup",{children:[e("h2",{children:"Documents"}),o("p",{children:[i," will wrap all components in a default HTML document. You may create a custom one to specify titles, stylesheets, scaling, etc."]}),e("figure",{children:e("pre",{children:e("code",{children:`export default function Document({ children }) {
  return <html lang="en">
    <head>
      <title>Title</title>
      {/*... all other meta tags, link tags, etc */}
    </head>
    <body>
      {children}
    </body>
  </html>
}`})})}),e("p",{children:"You can reference it in the config file:"}),e("figure",{children:e("pre",{children:e("code",{children:"export default { Document };"})})})]})}),e("section",{children:o("hgroup",{children:[e("h2",{children:"Components"}),o("p",{children:["Just like in ",e("a",{href:b,target:"_blanl",children:"any React app"}),", you can split a large page into multiple components."]}),e("figure",{children:e("pre",{children:e("code",{children:`function Greeting() { 
  return <p>Today is a fine day!</p>
}

export default function Page() {
  return <>
    <h1>Hello, world!</h1>
    <Greeting/>
  </>
}`})})})]})}),e("section",{children:o("hgroup",{children:[e("h2",{children:"Props"}),o("p",{children:["Pages and components don't need to be static. You can define any ",e("a",{href:R,target:"_blank",children:"props"})," ..."]}),e("figure",{children:e("pre",{children:e("code",{children:`export default function Page(props) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
  </>
}`})})}),e("p",{children:"... and pass them to the rendering function."}),e("figure",{children:e("pre",{children:e("code",{children:`app.get('/', (req, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});`})})})]})}),e("section",{children:o("hgroup",{children:[e("h2",{children:"Hooks"}),o("p",{children:["For interactivity you can use all types of ",e("a",{href:v,target:"_blank",children:"React hooks"}),", like ",e("code",{children:"useState"})," or ",e("code",{children:"useEffect"}),"."]}),e("figure",{children:e("pre",{children:e("code",{children:`function Button () {
  const [clicks, setClicks] = useState(0);

  return <p>
    <button onClick={() => setClicks(clicks+1)}>Clicks {clicks}</button>
  </p>

  ...

  export default function Page(props) {
    return <>
      <h1>Hello, {props.name}!</h1>
      <Greeting/>
      <Button/>
    </>
  }
}`})})})]})}),e(h,{}),e("hr",{}),e("section",{children:o("div",{className:"row",children:[e("div",{children:o("div",{className:"card",children:[e("p",{children:e("b",{children:"Production"})}),o("p",{children:["Look at best practices for ",e("a",{href:T,target:"_blank",children:"server side rendering (SSR)"})," in production."]}),e("p",{children:e("a",{href:n.production(s),children:"Learn more"})})]})}),e("div",{children:o("div",{className:"card",children:[e("p",{children:e("b",{children:"SSG"})}),o("p",{children:[i," can directly output HTML for ",e("a",{href:E,target:"_blank",children:"static site generation (SSG)"}),"."]}),e("p",{children:e("a",{href:n.stat(s),children:"Learn more"})})]})})]})})]})]})}var L=document.getElementById("root");if(!L)throw new Error("react-srv: Could not find hydration root.");globalThis.__REACT_SRV_HYDRATED__||(globalThis.__REACT_SRV_HYDRATED__=!0,$(L,q.createElement(_,globalThis.__INITIAL_PROPS__||{})));
