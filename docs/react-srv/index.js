// src/react-srv-hydrate-Index.jsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// src/components/GHLogo.tsx
import { jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function CGLogo() {
  return /* @__PURE__ */ jsxs("svg", { width: "98", height: "96", viewBox: "0 0 98 96", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx("g", { "clip-path": "url(#clip0_730_27136)", children: /* @__PURE__ */ jsx("path", { d: "M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z", fill: "currentColor" }) }),
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_730_27136", children: /* @__PURE__ */ jsx("rect", { width: "98", height: "96", fill: "currentColor" }) }) })
  ] });
}

// src/constants.ts
var PRODUCT_NAME = "React Srv";
var REACT_URL = "https://react.dev/";
var REACT_COMPONENTS_URL = "https://react.dev/learn#components";
var REACT_PROPS_URL = "https://react.dev/learn/passing-props-to-a-component";
var REACT_HOOKS_URL = "https://react.dev/reference/react/hooks";
var DEMO_SIMPLE_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/simple";
var PAGE_PRODUCTION_URL = "./production.html";
var PAGE_STATIC_URL = "./static.html";
var SSR_URL = "https://developer.mozilla.org/en-US/docs/Glossary/SSR";
var SSG_URL = "https://en.wikipedia.org/wiki/Static_site_generator";

// src/components/SetupSection.tsx
import { useState } from "https://esm.sh/react@19.2.0";
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function TypescriptSetup() {
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsxs2("p", { children: [
      "First, install the latest versions of the ",
      /* @__PURE__ */ jsx2("code", { children: "react-srv" }),
      " library and ",
      /* @__PURE__ */ jsx2("a", { href: REACT_URL, target: "_blank", children: "React" }),
      ":"
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev` }) }) }),
    /* @__PURE__ */ jsxs2("p", { children: [
      "Then add the following entries to your ",
      /* @__PURE__ */ jsx2("code", { children: ".tsconfig" })
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}` }) }) })
  ] });
}
function SetupSection() {
  const [environment, selectEnvironment] = useState("ts");
  return /* @__PURE__ */ jsxs2("section", { children: [
    /* @__PURE__ */ jsx2("h2", { children: "Setup" }),
    /* @__PURE__ */ jsx2("p", { children: "Setup is slightly different based on the platform you're running:" }),
    /* @__PURE__ */ jsx2("nav", { children: /* @__PURE__ */ jsxs2("ol", { children: [
      /* @__PURE__ */ jsx2("li", { "aria-selected": environment === "ts", children: /* @__PURE__ */ jsx2("a", { onClick: () => selectEnvironment("ts"), children: "Typescript" }) }),
      /* @__PURE__ */ jsx2("li", { "aria-selected": environment === "js-esm", children: /* @__PURE__ */ jsx2("a", { onClick: () => selectEnvironment("js-esm"), children: "Javascript (ESM)" }) }),
      /* @__PURE__ */ jsx2("li", { "aria-selected": environment === "js-cjs", children: /* @__PURE__ */ jsx2("a", { onClick: () => selectEnvironment("js-cjs"), children: "Javascript (CJS)" }) })
    ] }) }),
    /* @__PURE__ */ jsx2("br", {}),
    environment === "ts" && /* @__PURE__ */ jsx2(TypescriptSetup, {})
  ] });
}

// src/Index.tsx
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Index() {
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    /* @__PURE__ */ jsx3("header", { children: /* @__PURE__ */ jsxs3("div", { className: "hero align-center", children: [
      /* @__PURE__ */ jsx3("h1", { children: PRODUCT_NAME }),
      /* @__PURE__ */ jsx3("p", { children: "Add React to your server side rendered or statically generated website." }),
      /* @__PURE__ */ jsx3("p", { children: /* @__PURE__ */ jsx3("a", { href: "https://github.com/gobi-tools/react-srv", target: "_blank", children: /* @__PURE__ */ jsxs3("button", { children: [
        /* @__PURE__ */ jsx3(CGLogo, {}),
        /* @__PURE__ */ jsx3("span", { children: "Source" })
      ] }) }) }),
      /* @__PURE__ */ jsx3("br", {})
    ] }) }),
    /* @__PURE__ */ jsxs3("main", { children: [
      /* @__PURE__ */ jsxs3("section", { children: [
        /* @__PURE__ */ jsxs3("p", { children: [
          "All you need to do is define a React component and save it in a ",
          /* @__PURE__ */ jsx3("code", { children: ".tsx" }),
          " or ",
          /* @__PURE__ */ jsx3("code", { children: ".jsx" }),
          " file of the same name:"
        ] }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `export default function Page() {
  return <>
    <h1>Hello, world!</h1>
  </>
}` }) }) }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "And ",
          PRODUCT_NAME,
          " will render it as static HTML you can send down the wire:"
        ] }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `const app = express();
const react = new ReactSrv({});

app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});
` }) }) })
      ] }),
      /* @__PURE__ */ jsx3(SetupSection, {}),
      /* @__PURE__ */ jsxs3("section", { children: [
        /* @__PURE__ */ jsx3("h2", { children: "Documents" }),
        /* @__PURE__ */ jsxs3("p", { children: [
          PRODUCT_NAME,
          " will wrap all components in a default HTML document. You may create a custom one ..."
        ] }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `export default function Document({ children }) {
  return <html lang="en">
    <head>
      <title>My document</title>
      {/*... all other meta tags, link tags, etc */}
    </head>
    <body>
      {children}
    </body>
  </html>
}` }) }) }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "... which you can reference when creating the ",
          /* @__PURE__ */ jsx3("code", { children: "ReactSrv" }),
          " instance:"
        ] }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `const react = new ReactSrv({ Document });` }) }) }),
        /* @__PURE__ */ jsx3("p", { children: "In this way you  can even have different documents for different routes, if you wish." })
      ] }),
      /* @__PURE__ */ jsxs3("section", { children: [
        /* @__PURE__ */ jsx3("h2", { children: "Components" }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "Just like in ",
          /* @__PURE__ */ jsx3("a", { href: REACT_COMPONENTS_URL, target: "_blanl", children: "any React app" }),
          ", you can split a large page into multiple components."
        ] }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `function Greeting() { 
  return <p>Today is a fine day!</p>
}

export default function Page() {
  return <>
    <h1>Hello, world!</h1>
    <Greeting/>
  </>
}` }) }) })
      ] }),
      /* @__PURE__ */ jsxs3("section", { children: [
        /* @__PURE__ */ jsx3("h2", { children: "Props" }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "Pages and components don't need to be static. You can define any ",
          /* @__PURE__ */ jsx3("a", { href: REACT_PROPS_URL, target: "_blank", children: "props" }),
          " ..."
        ] }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `export default function Page(props: { name: string }) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
  </>
}` }) }) }),
        /* @__PURE__ */ jsx3("p", { children: "... and pass them to the rendering function." }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `app.get('/', (req, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});` }) }) })
      ] }),
      /* @__PURE__ */ jsxs3("section", { children: [
        /* @__PURE__ */ jsx3("h2", { children: "Hooks" }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "For interactivity you can use all types of ",
          /* @__PURE__ */ jsx3("a", { href: REACT_HOOKS_URL, target: "_blank", children: "React hooks" }),
          ", like ",
          /* @__PURE__ */ jsx3("code", { children: "useState" }),
          " or ",
          /* @__PURE__ */ jsx3("code", { children: "useEffect" }),
          "."
        ] }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `function Button () {
  const [clicks, setClicks] = useState(0);

  return <p>
    <button onClick={() => setClicks(clicks+1)}>Clicks {clicks}</button>
  </p>

  ...

  export default function Page(props: { name: string }) {
    return <>
      <h1>Hello, {props.name}!</h1>
      <Greeting/>
      <Button/>
    </>
  }
}` }) }) })
      ] }),
      /* @__PURE__ */ jsx3("hr", {}),
      /* @__PURE__ */ jsxs3("blockquote", { className: "card success", children: [
        /* @__PURE__ */ jsxs3("p", { className: "group", children: [
          /* @__PURE__ */ jsxs3(
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
                /* @__PURE__ */ jsx3("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }),
                /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "3" })
              ]
            }
          ),
          /* @__PURE__ */ jsx3("b", { children: "Demo" })
        ] }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "Check out a simple demo ",
          /* @__PURE__ */ jsx3("a", { href: DEMO_SIMPLE_URL, target: "_blank", children: "here" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsx3("section", { children: /* @__PURE__ */ jsxs3("div", { className: "row", children: [
        /* @__PURE__ */ jsx3("div", { children: /* @__PURE__ */ jsxs3("div", { className: "card", children: [
          /* @__PURE__ */ jsx3("p", { children: /* @__PURE__ */ jsx3("b", { children: "Production" }) }),
          /* @__PURE__ */ jsxs3("p", { children: [
            "Look at best practices for ",
            /* @__PURE__ */ jsx3("a", { href: SSR_URL, target: "_blank", children: "server side rendering (SSR)" }),
            " in production."
          ] }),
          /* @__PURE__ */ jsx3("p", { children: /* @__PURE__ */ jsx3("a", { href: PAGE_PRODUCTION_URL, children: "Learn more" }) })
        ] }) }),
        /* @__PURE__ */ jsx3("div", { children: /* @__PURE__ */ jsxs3("div", { className: "card", children: [
          /* @__PURE__ */ jsx3("p", { children: /* @__PURE__ */ jsx3("b", { children: "SSG" }) }),
          /* @__PURE__ */ jsxs3("p", { children: [
            PRODUCT_NAME,
            " can directly output HTML for ",
            /* @__PURE__ */ jsx3("a", { href: SSG_URL, target: "_blank", children: "static site generation (SSG)" }),
            "."
          ] }),
          /* @__PURE__ */ jsx3("p", { children: /* @__PURE__ */ jsx3("a", { href: PAGE_STATIC_URL, children: "Learn more" }) })
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
