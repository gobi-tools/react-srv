import{a as h}from"./chunk-CCLD6A5G.js";import{a as f}from"./chunk-42RC42TL.js";import{a as r}from"./chunk-UABS3NKN.js";import{a as o,b as a,g as c,h as p,i as l,s as d,t as u,u as g}from"./chunk-F6WBBOKJ.js";import"./chunk-CUGLFOIX.js";import{a as s}from"./chunk-7X4DHW36.js";import y from"https://esm.sh/react@19.3.0";import{hydrateRoot as R}from"https://esm.sh/react-dom@19.3.0/client";var m={name:"react-srv",version:"0.0.78",description:"Lightweight JSX renderer for Node",scripts:{build:"tsc",test:"vitest run","test:watch":"vitest"},main:"dist/index.js",types:"dist/index.d.ts",keywords:[],author:"Gabriel Coman",license:"MIT",type:"module",files:["dist"],bin:{"react-srv":"./dist/bin/cli.js"},dependencies:{commander:"^14.0.3",esbuild:"^0.25.11","fast-glob":"^3.3.3","serialize-javascript":"^7.0.0"},peerDependencies:{react:"^18 || ^19","react-dom":"^18 || ^19"},devDependencies:{"@types/node":"^24.10.1","@types/react":"^19.2.0","@types/react-dom":"^19.2.0","@types/serialize-javascript":"^5.0.4",react:"^19.2.0","react-dom":"^19.2.0",typescript:"^5.9.3",vite:"^7.3.6",vitest:"^5.0.1"}};import{Fragment as _,jsx as e,jsxs as t}from"https://esm.sh/react@19.3.0/jsx-runtime";function n(){let i=g();return t(_,{children:[e("header",{children:t("div",{className:"align-center",children:[t("hgroup",{children:[e("h1",{children:a}),e("p",{children:"Add React to your server side rendered or statically generated website."})]}),t("p",{className:"row align-center disable-mobile",children:[e("a",{href:"https://github.com/gobi-tools/react-srv",target:"_blank",children:t("button",{children:[e(h,{}),t("span",{children:["Source (v",m.version,")"]})]})}),e("a",{href:o.demo(i),target:"_blank",children:e("button",{type:"reset",children:"Demo"})})]})]})}),t("main",{children:[t("section",{children:[t("p",{children:["All you need to do is define a React component as a default export of a ",e("code",{children:".tsx"})," or ",e("code",{children:".jsx"})," file of the same name:"]}),e("figure",{children:e(r,{lang:"javascript",children:`export default function Page() {
  return <>
    <h1>Hello, world!</h1>
  </>
}`})}),t("p",{children:["Optionally add a ",e("code",{children:"react-srv.config.ts"})," or ",e("code",{children:".js"})," file:"]}),e("figure",{children:e(r,{lang:"javascript",children:"export default {}"})}),t("p",{children:["And ",a," will render it as static HTML you can send down the wire:"]}),e("figure",{children:e(r,{lang:"javascript",children:`import config from './react-srv.config';

const app = express();
const react = new ReactSrv(config);

app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});
`})})]}),t("section",{children:[t("hgroup",{children:[e("h2",{children:"Documents"}),t("p",{children:[a," will wrap all components in a default HTML document. You can create a custom one to specify titles, stylesheets, scaling, etc."]})]}),e("figure",{children:e(r,{lang:"javascript",children:`export default function Document({ children }) {
  return <html lang="en">
    <head>
      <title>Title</title>
      {/*... all other meta tags, link tags, etc */}
    </head>
    <body>
      {children}
    </body>
  </html>
}`})}),e("p",{children:"You can reference it in the config file:"}),e("figure",{children:e(r,{lang:"javascript",children:`import Document from './Document';

export default { Document };`})})]}),t("section",{children:[t("hgroup",{children:[e("h2",{children:"Components"}),t("p",{children:["Just like in ",e("a",{href:c,target:"_blanl",children:"any React app"}),", you can split a large page into multiple components."]})]}),e("figure",{children:e(r,{lang:"javascript",children:`function Greeting() { 
  return <p>Today is a fine day!</p>
}

export default function Page() {
  return <>
    <h1>Hello, world!</h1>
    <Greeting/>
  </>
}`})})]}),t("section",{children:[t("hgroup",{children:[e("h2",{children:"Props"}),t("p",{children:["Pages and components don't need to be static. You can define any ",e("a",{href:p,target:"_blank",children:"props"})," ..."]})]}),e("figure",{children:e(r,{lang:"javascript",children:`export default function Page(props) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
  </>
}`})}),e("p",{children:"... and pass them to the rendering function."}),e("figure",{children:e(r,{lang:"javascript",children:`app.get('/', (req, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});`})})]}),t("section",{children:[t("hgroup",{children:[e("h2",{children:"Hooks"}),t("p",{children:["For interactivity you can use all types of ",e("a",{href:l,target:"_blank",children:"React hooks"}),", like ",e("code",{children:"useState"}),", ",e("code",{children:"useEffect"}),", etc."]})]}),e("figure",{children:e(r,{lang:"javascript",children:`function Button () {
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
}`})})]}),t("section",{children:[e(f,{}),e("hr",{}),t("article",{children:[e("p",{children:e("b",{children:"Production"})}),t("p",{children:["Look at best practices for ",e("a",{href:d,target:"_blank",children:"server side rendering (SSR)"})," in production."]}),e("p",{children:e("a",{href:o.production(i),children:"Learn more"})})]}),t("article",{children:[e("p",{children:e("b",{children:"SSG"})}),t("p",{children:[a," can directly output HTML for ",e("a",{href:u,target:"_blank",children:"static site generation (SSG)"}),"."]}),e("p",{children:e("a",{href:o.stat(i),children:"Learn more"})})]}),t("article",{children:[e("p",{children:e("b",{children:"React Support"})}),e("p",{children:"Check version support and more advanced React setup."}),e("p",{children:e("a",{href:o.versions(i),children:"Learn more"})})]})]})]})]})}s(n,"Index");var b=document.getElementById("root");if(!b)throw new Error("react-srv: Could not find hydration root.");globalThis.__REACT_SRV_HYDRATED__||(globalThis.__REACT_SRV_HYDRATED__=!0,R(b,y.createElement(n,globalThis.__INITIAL_PROPS__||{})));
