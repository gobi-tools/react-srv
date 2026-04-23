// docs-src/react-srv-hydrate-Static.tsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// docs-src/constants.ts
var PRODUCT_NAME = "React Srv";
var DEMO_STATIC_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/static";
var PAGE_HOME_URL = "./index.html";
var PAGE_PRODUCTION_URL = "./production.html";
var SSG_URL = "https://en.wikipedia.org/wiki/Static_site_generator";

// docs-src/Static.tsx
import { Fragment, jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Static() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: PAGE_HOME_URL, children: "Home" }) }) }) }) }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Static site generation (SSG)" }),
        /* @__PURE__ */ jsxs("p", { children: [
          PRODUCT_NAME,
          " can be used for direct static site generation (",
          /* @__PURE__ */ jsx("a", { href: SSG_URL, target: "_blank", children: "SSG" }),
          "). If you've read the section on ",
          /* @__PURE__ */ jsx("a", { href: PAGE_PRODUCTION_URL, children: "getting to production" }),
          ", then you're already ninety percent there."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "What you'll need is to create a new file. You can call it ",
          /* @__PURE__ */ jsx("code", { children: "prerender.ts" })
        ] }),
        ".",
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `import ReactSrv from 'react-srv';
import Document from './Document'; // if you want a custom document

const react = new ReactSrv({ 
  Document, 
  srcPath: './src',
  outPath: './public',
  outDir: 'hydrate',
});
react.prerender()` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "prerender.ts" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "We setup the ",
          /* @__PURE__ */ jsx("code", { children: "react" }),
          " instance in a familiar way:"
        ] }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Set a custom HTML Document (or use the default one)" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Tell the library where the source ",
            /* @__PURE__ */ jsx("code", { children: ".tsx" }),
            " pages are"
          ] }),
          /* @__PURE__ */ jsx("li", { children: "And where to output the resulting HTML and JS files" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "And that's it! All you need to do is run ",
          /* @__PURE__ */ jsx("code", { children: "tsx prerender.ts" }),
          " to have a full, statically generated, website."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Disable hydration" }),
        /* @__PURE__ */ jsx("p", { children: "Prerendering, by default, generates both HTML and hydration JS. In this way statically generated websites can maintain most of the interactivity provided by React." }),
        /* @__PURE__ */ jsx("p", { children: "If you don't want interactivity, you can disable hydration altogether:" }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `const react = new ReactSrv({ 
  Document, 
  srcPath: './src',
  outPath: './public',
  hydrate: false,
});
react.prerender()` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "prerender.ts" })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "In this way, only HTML files will be generated. A trully static website!" })
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
          "Check out a statically generated site ",
          /* @__PURE__ */ jsx("a", { href: DEMO_STATIC_URL, target: "_blank", children: "here" }),
          "."
        ] })
      ] })
    ] })
  ] });
}

// docs-src/react-srv-hydrate-Static.tsx
var root = document.getElementById("root");
if (!root) {
  throw new Error("react-srv: Could not find hydration root.");
}
if (!globalThis.__REACT_SRV_HYDRATED__) {
  globalThis.__REACT_SRV_HYDRATED__ = true;
  hydrateRoot(
    root,
    React.createElement(Static, globalThis.__INITIAL_PROPS__ || {})
  );
}
