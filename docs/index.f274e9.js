import{a as f}from"./chunk-CCLD6A5G.js";import{a as m}from"./chunk-3WMEB5JE.js";import"./chunk-2W3JBRBS.js";import{a as h}from"./chunk-MKXCXAYJ.js";import{a as r}from"./chunk-UABS3NKN.js";import{a as o,b as u}from"./chunk-XQCDSILS.js";import"./chunk-CUGLFOIX.js";import{a as i,f as s,g as p,h as l,r as g,s as d}from"./chunk-LDZ5NHXP.js";import{a as c}from"./chunk-7X4DHW36.js";import{createElement as k}from"https://esm.sh/react@19.3.0";import{hydrateRoot as C}from"https://esm.sh/react-dom@19.3.0/client";var b={name:"react-srv",version:"0.0.82",description:"Lightweight JSX renderer for Node",scripts:{build:"tsc",test:"vitest run","test:watch":"vitest"},main:"dist/index.js",types:"dist/index.d.ts",keywords:[],author:"Gabriel Coman",license:"MIT",type:"module",files:["dist"],bin:{"react-srv":"./dist/bin/cli.js"},dependencies:{commander:"^14.0.3",esbuild:"^0.25.11","fast-glob":"^3.3.3","serialize-javascript":"^7.0.0"},peerDependencies:{preact:">=10","preact-render-to-string":">=6",react:"^18 || ^19","react-dom":"^18 || ^19"},peerDependenciesMeta:{preact:{optional:!0},"preact-render-to-string":{optional:!0},react:{optional:!0},"react-dom":{optional:!0}},devDependencies:{"@types/node":"^24.10.1","@types/react":"^19.2.0","@types/react-dom":"^19.2.0","@types/serialize-javascript":"^5.0.4",preact:"^10.29.8","preact-render-to-string":"^6.8.1",react:"^19.2.0","react-dom":"^19.2.0",typescript:"^5.9.3",vite:"^7.3.6",vitest:"^5.0.1"}};import{Fragment as R,jsx as e,jsxs as t}from"https://esm.sh/react@19.3.0/jsx-runtime";function n(){let a=u();return t(R,{children:[e("header",{children:e(m,{showHome:!1})}),e("header",{children:t("div",{className:"align-center",children:[t("hgroup",{children:[e("h1",{children:i}),e("p",{children:"Add React or Preact to your server side rendered or statically generated website."})]}),t("p",{className:"row align-center disable-mobile",children:[e("a",{target:"_blank",children:e("button",{children:"Example"})}),e("a",{href:o.demo(a),target:"_blank",children:e("button",{type:"reset",children:"Demo"})})]}),e("div",{className:"row align-center disable-mobile",children:e("form",{onSubmit:_=>_.preventDefault(),children:t("div",{role:"group",children:[e("mark",{children:t("span",{className:"slight-valign",children:["Version ",b.version]})}),e("button",{type:"reset",onClick:()=>window.open(o.External.GitHubRepo,"_blank"),children:e(f,{})})]})})})]})}),t("main",{children:[t("section",{children:[t("p",{children:["All you need to do is define a React component as a default export of a ",e("code",{children:".tsx"})," or ",e("code",{children:".jsx"})," file of the same name:"]}),t("figure",{children:[e(r,{lang:"javascript",children:`export default function Page() {
  return <>
    <h1>Hello, world!</h1>
  </>
}`}),e("figcaption",{children:"Page.tsx"})]}),t("p",{children:["Optionally add a ",e("code",{children:"react-srv.config.ts"})," or ",e("code",{children:".js"})," file:"]}),t("figure",{children:[e(r,{lang:"javascript",children:"export default {}"}),e("figcaption",{children:"react-srv.config.ts"})]}),t("p",{children:["And ",i," will render it as static HTML you can send down the wire:"]}),t("figure",{children:[e(r,{lang:"javascript",children:`import config from './react-srv.config';

const app = express();
const react = new ReactSrv(config);

app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});
`}),e("figcaption",{children:"server.ts"})]})]}),t("section",{children:[t("hgroup",{children:[e("h2",{children:"Documents"}),t("p",{children:[i," will wrap all components in a default HTML document. You can create a custom one to specify titles, stylesheets, scaling, etc."]})]}),t("figure",{children:[e(r,{lang:"javascript",children:`export default function Document({ children }) {
  return <html lang="en">
    <head>
      <title>Title</title>
      {/*... all other meta tags, link tags, etc */}
    </head>
    <body>
      {children}
    </body>
  </html>
}`}),e("figcaption",{children:"Document.tsx"})]}),e("p",{children:"You can reference it in the config file:"}),t("figure",{children:[e(r,{lang:"javascript",children:`import Document from './Document';

export default { Document };`}),e("figcaption",{children:"react-srv.config.ts"})]})]}),t("section",{children:[t("hgroup",{children:[e("h2",{children:"Components"}),t("p",{children:["Just like in ",e("a",{href:s,target:"_blanl",children:"any React app"}),", you can split a large page into multiple components."]})]}),t("figure",{children:[e(r,{lang:"javascript",children:`function Greeting() { 
  return <p>Today is a fine day!</p>
}

export default function Page() {
  return <>
    <h1>Hello, world!</h1>
    <Greeting/>
  </>
}`}),e("figcaption",{children:"Page.tsx"})]})]}),t("section",{children:[t("hgroup",{children:[e("h2",{children:"Props"}),t("p",{children:["Pages and components don't need to be static. You can define any ",e("a",{href:p,target:"_blank",children:"props"})," ..."]})]}),t("figure",{children:[e(r,{lang:"javascript",children:`export default function Page(props) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
  </>
}`}),e("figcaption",{children:"Page.tsx"})]}),e("p",{children:"... and pass them to the rendering function."}),t("figure",{children:[e(r,{lang:"javascript",children:`app.get('/', (req, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});`}),e("figcaption",{children:"server.ts"})]})]}),t("section",{children:[t("hgroup",{children:[e("h2",{children:"Hooks"}),t("p",{children:["For interactivity you can use all types of ",e("a",{href:l,target:"_blank",children:"React hooks"}),", like ",e("code",{children:"useState"}),", ",e("code",{children:"useEffect"}),", etc."]})]}),t("figure",{children:[e(r,{lang:"javascript",children:`function Button () {
  const [clicks, setClicks] = useState(0);

  return <p>
    <button onClick={() => setClicks(clicks+1)}>Clicks {clicks}</button>
  </p>
}

...

export default function Page(props) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
    <Button/>
  </>
}`}),e("figcaption",{children:"Page.ts"})]})]}),t("section",{children:[e(h,{}),e("hr",{}),t("article",{children:[e("p",{children:e("b",{children:"Production"})}),t("p",{children:["Look at best practices for ",e("a",{href:g,target:"_blank",children:"server side rendering (SSR)"})," in production."]}),e("p",{children:e("a",{href:o.production(a),children:"Learn more"})})]}),t("article",{children:[e("p",{children:e("b",{children:"SSG"})}),t("p",{children:[i," can directly output HTML for ",e("a",{href:d,target:"_blank",children:"static site generation (SSG)"}),"."]}),e("p",{children:e("a",{href:o.stat(a),children:"Learn more"})})]}),t("article",{children:[e("p",{children:e("b",{children:"React Support"})}),e("p",{children:"Check version support and more advanced React setup."}),e("p",{children:e("a",{href:o.versions(a),children:"Learn more"})})]})]})]})]})}c(n,"Index");var v=document.getElementById("root");if(!v)throw new Error("react-srv: Could not find hydration root.");globalThis.__REACT_SRV_HYDRATED__||(globalThis.__REACT_SRV_HYDRATED__=!0,C(v,k(n,globalThis.__INITIAL_PROPS__||{})));
