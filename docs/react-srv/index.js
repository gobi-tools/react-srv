// docs-src/react-srv-hydrate-Index.tsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// docs-src/constants.ts
var PRODUCT_NAME = "React Srv";
var REACT_URL = "https://react.dev/";
var REACT_COMPONENTS_URL = "https://react.dev/learn#components";
var REACT_PROPS_URL = "https://react.dev/learn/passing-props-to-a-component";
var REACT_HOOKS_URL = "https://react.dev/reference/react/hooks";
var PRODUCTION_DEMO_URL = "https://github.com/gobi-tools/react-srv/tree/main/docs-examples";
var PAGE_PRODUCTION_URL = "./production.html";

// docs-src/Index.tsx
import { Fragment, jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Index() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsxs("div", { className: "hero align-center", children: [
      /* @__PURE__ */ jsx("h1", { children: PRODUCT_NAME }),
      /* @__PURE__ */ jsxs("p", { children: [
        PRODUCT_NAME,
        " is a small project that allows you to quickly serve React pages from an existing route."
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: "https://github.com/gobi-tools/react-srv", target: "_blank", children: /* @__PURE__ */ jsxs("button", { children: [
        /* @__PURE__ */ jsx("img", { src: "GitHub_Invertocat_White.svg", alt: "GitHub Logo" }),
        /* @__PURE__ */ jsx("span", { children: "Source" })
      ] }) }) }),
      /* @__PURE__ */ jsx("br", {})
    ] }) }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "All you need to do is define a React component and save it in a ",
          /* @__PURE__ */ jsx("code", { children: ".tsx" }),
          " file of the same name:"
        ] }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `export default function Page() {
  return <>
    <h1>Hello, world!</h1>
  </>
}` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "Page.tsx" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "And ",
          PRODUCT_NAME,
          " will render it as static HTML you can send down the wire:"
        ] }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `const app = express();
const react = new ReactSrv({});

app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});
` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "server.ts" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Setup" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "First, install the latest versions of the ",
          /* @__PURE__ */ jsx("code", { children: "react-srv" }),
          " library and ",
          /* @__PURE__ */ jsx("a", { href: REACT_URL, target: "_blank", children: "React" }),
          ":"
        ] }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `npm i react-srv

# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "install dependencies" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Then add the following entries to your ",
          /* @__PURE__ */ jsx("code", { children: ".tsconfig" })
        ] }),
        /* @__PURE__ */ jsxs("figcaption", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "tsconfig.json" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Documents" }),
        /* @__PURE__ */ jsxs("p", { children: [
          PRODUCT_NAME,
          " will wrap all components in a default HTML document. You may create a custom one ..."
        ] }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `export default function Document({ children }) {
  return <html lang="en">
    <head>
      <title>My document</title>
      {/*... all other meta tags, link tags, etc */}
    </head>
    <body>
      {children}
    </body>
  </html>
}` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "Document.tsx" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "... which you can reference when creating the ",
          /* @__PURE__ */ jsx("code", { children: "ReactSrv" }),
          " instance:"
        ] }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `import Document from "./Document";

const react = new ReactSrv({ Document });` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "server.ts" })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "In this way you  can even have different documents for different routes, if you wish." })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Components" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Just like in ",
          /* @__PURE__ */ jsx("a", { href: REACT_COMPONENTS_URL, target: "_blanl", children: "any React app" }),
          ", you can split a big page into multiple components."
        ] }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `function Greeting() { 
  return <p>Today is a fine day!</p>
}

export default function Page() {
  return <>
    <h1>Hello, world!</h1>
    <Greeting/>
  </>
}` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "Page.tsx" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Props" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Pages and components don't need to be static. You can define any ",
          /* @__PURE__ */ jsx("a", { href: REACT_PROPS_URL, target: "_blank", children: "props" }),
          " ..."
        ] }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `export default function Page(props: { name: string }) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
  </>
}` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "Page.tsx" })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "... and pass them to the rendering function." }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `app.get('/', (req, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "server.ts" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Hooks" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "For interactivity you can use all types of ",
          /* @__PURE__ */ jsx("a", { href: REACT_HOOKS_URL, target: "_blank", children: "React hooks" }),
          ", like ",
          /* @__PURE__ */ jsx("code", { children: "useState" }),
          " or ",
          /* @__PURE__ */ jsx("code", { children: "useEffect" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `function Button () {
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
}` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "Page.tsx" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsxs("blockquote", { className: "card success", children: [
        /* @__PURE__ */ jsxs("p", { className: "group", children: [
          /* @__PURE__ */ jsxs(
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
                /* @__PURE__ */ jsx("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }),
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("b", { children: "Demo" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Check out a quick demo ",
          /* @__PURE__ */ jsx("a", { href: PRODUCTION_DEMO_URL, target: "_blank", children: "here" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("b", { children: "Ready for production" }) }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Look at best practices when deploying ",
            PRODUCT_NAME,
            " to production."
          ] }),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: PAGE_PRODUCTION_URL, children: "Learn more" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("b", { children: "Static websites" }) }),
          /* @__PURE__ */ jsxs("p", { children: [
            PRODUCT_NAME,
            " can also output static markup, with or without hydration."
          ] }),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: "", children: "Learn more" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("b", { children: "Advanced state" }) }),
          /* @__PURE__ */ jsxs("p", { children: [
            "You can use libraries like ",
            /* @__PURE__ */ jsx("a", { href: "", children: "Zustand" }),
            " to keep track of global state."
          ] }),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: "", children: "Learn more" }) })
        ] }) })
      ] }) })
    ] })
  ] });
}

// docs-src/react-srv-hydrate-Index.tsx
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
