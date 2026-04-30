// src/react-srv-hydrate-Index.jsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// src/components/GitHubIcon.tsx
import { jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function GitHubIcon() {
  return /* @__PURE__ */ jsxs("svg", { width: "98", height: "96", viewBox: "0 0 98 96", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx("g", { clipPath: "url(#clip0_730_27136)", children: /* @__PURE__ */ jsx("path", { d: "M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z", fill: "currentColor" }) }),
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_730_27136", children: /* @__PURE__ */ jsx("rect", { width: "98", height: "96", fill: "currentColor" }) }) })
  ] });
}

// src/constants.ts
var PRODUCT_NAME = "React Srv";
var REACT_URL = "https://react.dev/";
var REACT_COMPONENTS_URL = "https://react.dev/learn#components";
var REACT_PROPS_URL = "https://react.dev/learn/passing-props-to-a-component";
var REACT_HOOKS_URL = "https://react.dev/reference/react/hooks";
var TSX_URL = "https://github.com/privatenumber/tsx";
var BABEL_URL = "https://babeljs.io/";
var DEMO_TS_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/ts";
var DEMO_JS_ESM_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/js-esm";
var DEMO_JS_CJS_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/js-cjs";
var PAGE_HOME_URL = "index.html";
var PAGE_PRODUCTION_URL = "pages/production.html";
var PAGE_STATIC_URL = "pages/static.html";
var SSR_URL = "https://developer.mozilla.org/en-US/docs/Glossary/SSR";
var SSG_URL = "https://en.wikipedia.org/wiki/Static_site_generator";

// src/components/SetupSection.tsx
import { useState } from "https://esm.sh/react@19.2.0";

// src/components/SettingsIcon.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function SettingsIcon() {
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx2("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }),
        /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "3" })
      ]
    }
  );
}

// src/components/SetupSection.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function TypescriptSetup() {
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3("p", { children: [
      "First, install the latest versions of ",
      /* @__PURE__ */ jsx3("a", { href: PAGE_HOME_URL, children: "react-srv" }),
      " and ",
      /* @__PURE__ */ jsx3("a", { href: REACT_URL, target: "_blank", children: "React" }),
      "."
    ] }),
    /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# optionally install the associated types
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev` }) }) }),
    /* @__PURE__ */ jsxs3("p", { children: [
      "Then, to make sure React is defined correctly at runtime, add the following entries to your ",
      /* @__PURE__ */ jsx3("code", { children: "tsconfig.json" }),
      " file."
    ] }),
    /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}` }) }) }),
    /* @__PURE__ */ jsxs3("blockquote", { className: "card success", children: [
      /* @__PURE__ */ jsxs3("p", { className: "group", children: [
        /* @__PURE__ */ jsx3(SettingsIcon, {}),
        /* @__PURE__ */ jsx3("b", { children: "Demo" })
      ] }),
      /* @__PURE__ */ jsxs3("p", { children: [
        "Check out a fully setup TypeScript project ",
        /* @__PURE__ */ jsx3("a", { href: DEMO_TS_URL, target: "_blank", children: "here" }),
        "."
      ] })
    ] })
  ] });
}
function JSESMSetup() {
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3("p", { children: [
      "First, install the latest versions of ",
      /* @__PURE__ */ jsx3("a", { href: PAGE_HOME_URL, children: "react-srv" }),
      ", ",
      /* @__PURE__ */ jsx3("a", { href: REACT_URL, target: "_blank", children: "React" }),
      " and ",
      /* @__PURE__ */ jsx3("a", { href: TSX_URL, target: "_blank", children: "tsx" }),
      "."
    ] }),
    /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install tsx as a dev dependency
npm i tsx --save-dev` }) }) }),
    /* @__PURE__ */ jsxs3("p", { children: [
      "Then, to make sure React is defined correctly at runtime, you'll need to add a ",
      /* @__PURE__ */ jsx3("code", { children: "tsconfig.json" }),
      " file."
    ] }),
    /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}` }) }) }),
    /* @__PURE__ */ jsxs3("p", { children: [
      "Finally, you'll need to run your app with ",
      /* @__PURE__ */ jsx3("code", { children: "tsx" }),
      " so you avoid the ",
      /* @__PURE__ */ jsx3("code", { className: "error", children: 'Unknown file extension ".jsx"' }),
      " error."
    ] }),
    /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `tsx src/server.js` }) }) }),
    /* @__PURE__ */ jsxs3("blockquote", { className: "card success", children: [
      /* @__PURE__ */ jsxs3("p", { className: "group", children: [
        /* @__PURE__ */ jsx3(SettingsIcon, {}),
        /* @__PURE__ */ jsx3("b", { children: "Demo" })
      ] }),
      /* @__PURE__ */ jsxs3("p", { children: [
        "Check out a fully setup ESM Javascript project ",
        /* @__PURE__ */ jsx3("a", { href: DEMO_JS_ESM_URL, target: "_blank", children: "here" }),
        "."
      ] })
    ] })
  ] });
}
function JSCJSSetup() {
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3("p", { children: [
      "First, install the latest versions of ",
      /* @__PURE__ */ jsx3("a", { href: PAGE_HOME_URL, children: "react-srv" }),
      ", ",
      /* @__PURE__ */ jsx3("a", { href: REACT_URL, target: "_blank", children: "React" }),
      " and ",
      /* @__PURE__ */ jsx3("a", { href: BABEL_URL, target: "_blank", children: "babel" }),
      "."
    ] }),
    /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev` }) }) }),
    /* @__PURE__ */ jsxs3("p", { children: [
      "Then, add a ",
      /* @__PURE__ */ jsx3("code", { children: ".babelrc" }),
      " file where we'll setup the react preset so the server recognises JSX syntax."
    ] }),
    /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `{
  "presets": ["@babel/preset-react"]
}
` }) }) }),
    /* @__PURE__ */ jsxs3("p", { children: [
      "Then, in the same file where you setup ",
      /* @__PURE__ */ jsx3("code", { children: "ReactSrv" }),
      ", make sure you add the following line."
    ] }),
    /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `require('@babel/register')({ extensions: ['.js', '.jsx'] });` }) }) }),
    /* @__PURE__ */ jsxs3("p", { children: [
      "This will allow other files to ",
      /* @__PURE__ */ jsx3("code", { children: "require" }),
      " files with the ",
      /* @__PURE__ */ jsx3("code", { children: ".jsx" }),
      " extension:"
    ] }),
    /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `const Page = require('./pages/Page.jsx').default;` }) }) }),
    /* @__PURE__ */ jsxs3("blockquote", { className: "card success", children: [
      /* @__PURE__ */ jsxs3("p", { className: "group", children: [
        /* @__PURE__ */ jsx3(SettingsIcon, {}),
        /* @__PURE__ */ jsx3("b", { children: "Demo" })
      ] }),
      /* @__PURE__ */ jsxs3("p", { children: [
        "Check out a fully setup CommonJS Javascript project ",
        /* @__PURE__ */ jsx3("a", { href: DEMO_JS_CJS_URL, target: "_blank", children: "here" }),
        "."
      ] })
    ] })
  ] });
}
function SetupSection() {
  const [environment, selectEnvironment] = useState("ts");
  return /* @__PURE__ */ jsxs3("section", { children: [
    /* @__PURE__ */ jsx3("h2", { children: "Setup" }),
    /* @__PURE__ */ jsx3("p", { children: "Setup is slightly different based on the platform you're running:" }),
    /* @__PURE__ */ jsx3("nav", { children: /* @__PURE__ */ jsxs3("ol", { children: [
      /* @__PURE__ */ jsx3("li", { "aria-selected": environment === "ts", children: /* @__PURE__ */ jsx3("a", { onClick: () => selectEnvironment("ts"), children: "Typescript" }) }),
      /* @__PURE__ */ jsx3("li", { "aria-selected": environment === "js-esm", children: /* @__PURE__ */ jsx3("a", { onClick: () => selectEnvironment("js-esm"), children: "Javascript (ESM)" }) }),
      /* @__PURE__ */ jsx3("li", { "aria-selected": environment === "js-cjs", children: /* @__PURE__ */ jsx3("a", { onClick: () => selectEnvironment("js-cjs"), children: "Javascript (CJS)" }) })
    ] }) }),
    /* @__PURE__ */ jsx3("br", {}),
    environment === "ts" && /* @__PURE__ */ jsx3(TypescriptSetup, {}),
    environment === "js-esm" && /* @__PURE__ */ jsx3(JSESMSetup, {}),
    environment === "js-cjs" && /* @__PURE__ */ jsx3(JSCJSSetup, {})
  ] });
}

// src/Index.tsx
import { Fragment as Fragment2, jsx as jsx4, jsxs as jsxs4 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Index() {
  return /* @__PURE__ */ jsxs4(Fragment2, { children: [
    /* @__PURE__ */ jsx4("header", { children: /* @__PURE__ */ jsxs4("div", { className: "hero align-center", children: [
      /* @__PURE__ */ jsx4("h1", { children: PRODUCT_NAME }),
      /* @__PURE__ */ jsx4("p", { children: "Add React to your server side rendered or statically generated website." }),
      /* @__PURE__ */ jsx4("p", { children: /* @__PURE__ */ jsx4("a", { href: "https://github.com/gobi-tools/react-srv", target: "_blank", children: /* @__PURE__ */ jsxs4("button", { children: [
        /* @__PURE__ */ jsx4(GitHubIcon, {}),
        /* @__PURE__ */ jsx4("span", { children: "Source" })
      ] }) }) }),
      /* @__PURE__ */ jsx4("br", {})
    ] }) }),
    /* @__PURE__ */ jsxs4("main", { children: [
      /* @__PURE__ */ jsxs4("section", { children: [
        /* @__PURE__ */ jsxs4("p", { children: [
          "All you need to do is define a React component as a default export of a ",
          /* @__PURE__ */ jsx4("code", { children: ".tsx" }),
          " or ",
          /* @__PURE__ */ jsx4("code", { children: ".jsx" }),
          " file of the same name:"
        ] }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `export default function Page() {
  return <>
    <h1>Hello, world!</h1>
  </>
}` }) }) }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "Optionally add a ",
          /* @__PURE__ */ jsx4("code", { children: "react-srv.config.ts" }),
          " or ",
          /* @__PURE__ */ jsx4("code", { children: ".js" }),
          " file:"
        ] }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `export default {}` }) }) }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "And ",
          PRODUCT_NAME,
          " will render it as static HTML you can send down the wire:"
        ] }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `const app = express();
const react = new ReactSrv(config);

app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});
` }) }) })
      ] }),
      /* @__PURE__ */ jsxs4("section", { children: [
        /* @__PURE__ */ jsx4("h2", { children: "Documents" }),
        /* @__PURE__ */ jsxs4("p", { children: [
          PRODUCT_NAME,
          " will wrap all components in a default HTML document. You may create a custom one to specify titles, stylesheets, scaling, etc."
        ] }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `export default function Document({ children }) {
  return <html lang="en">
    <head>
      <title>Title</title>
      {/*... all other meta tags, link tags, etc */}
    </head>
    <body>
      {children}
    </body>
  </html>
}` }) }) }),
        /* @__PURE__ */ jsx4("p", { children: "You can reference it in the config file:" }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `export default { Document };` }) }) })
      ] }),
      /* @__PURE__ */ jsxs4("section", { children: [
        /* @__PURE__ */ jsx4("h2", { children: "Components" }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "Just like in ",
          /* @__PURE__ */ jsx4("a", { href: REACT_COMPONENTS_URL, target: "_blanl", children: "any React app" }),
          ", you can split a large page into multiple components."
        ] }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `function Greeting() { 
  return <p>Today is a fine day!</p>
}

export default function Page() {
  return <>
    <h1>Hello, world!</h1>
    <Greeting/>
  </>
}` }) }) })
      ] }),
      /* @__PURE__ */ jsxs4("section", { children: [
        /* @__PURE__ */ jsx4("h2", { children: "Props" }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "Pages and components don't need to be static. You can define any ",
          /* @__PURE__ */ jsx4("a", { href: REACT_PROPS_URL, target: "_blank", children: "props" }),
          " ..."
        ] }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `export default function Page(props) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
  </>
}` }) }) }),
        /* @__PURE__ */ jsx4("p", { children: "... and pass them to the rendering function." }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `app.get('/', (req, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});` }) }) })
      ] }),
      /* @__PURE__ */ jsxs4("section", { children: [
        /* @__PURE__ */ jsx4("h2", { children: "Hooks" }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "For interactivity you can use all types of ",
          /* @__PURE__ */ jsx4("a", { href: REACT_HOOKS_URL, target: "_blank", children: "React hooks" }),
          ", like ",
          /* @__PURE__ */ jsx4("code", { children: "useState" }),
          " or ",
          /* @__PURE__ */ jsx4("code", { children: "useEffect" }),
          "."
        ] }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `function Button () {
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
}` }) }) })
      ] }),
      /* @__PURE__ */ jsx4(SetupSection, {}),
      /* @__PURE__ */ jsx4("hr", {}),
      /* @__PURE__ */ jsx4("section", { children: /* @__PURE__ */ jsxs4("div", { className: "row", children: [
        /* @__PURE__ */ jsx4("div", { children: /* @__PURE__ */ jsxs4("div", { className: "card", children: [
          /* @__PURE__ */ jsx4("p", { children: /* @__PURE__ */ jsx4("b", { children: "Production" }) }),
          /* @__PURE__ */ jsxs4("p", { children: [
            "Look at best practices for ",
            /* @__PURE__ */ jsx4("a", { href: SSR_URL, target: "_blank", children: "server side rendering (SSR)" }),
            " in production."
          ] }),
          /* @__PURE__ */ jsx4("p", { children: /* @__PURE__ */ jsx4("a", { href: PAGE_PRODUCTION_URL, children: "Learn more" }) })
        ] }) }),
        /* @__PURE__ */ jsx4("div", { children: /* @__PURE__ */ jsxs4("div", { className: "card", children: [
          /* @__PURE__ */ jsx4("p", { children: /* @__PURE__ */ jsx4("b", { children: "SSG" }) }),
          /* @__PURE__ */ jsxs4("p", { children: [
            PRODUCT_NAME,
            " can directly output HTML for ",
            /* @__PURE__ */ jsx4("a", { href: SSG_URL, target: "_blank", children: "static site generation (SSG)" }),
            "."
          ] }),
          /* @__PURE__ */ jsx4("p", { children: /* @__PURE__ */ jsx4("a", { href: PAGE_STATIC_URL, children: "Learn more" }) })
        ] }) })
      ] }) })
    ] })
  ] });
}

// src/react-srv-hydrate-Index.jsx
var root = document.getElementById("root");
if (!root) {
  throw new Error("react-srv: Could not find hydration root.");
}
if (!globalThis.__REACT_SRV_HYDRATED__) {
  globalThis.__REACT_SRV_HYDRATED__ = true;
  hydrateRoot(
    root,
    React.createElement(Index, globalThis.__INITIAL_PROPS__ || {})
  );
}
