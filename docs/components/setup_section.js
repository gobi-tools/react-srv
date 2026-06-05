// src/components/react-srv-hydrate-SetupSection.jsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// src/constants.ts
var REACT_URL = "https://react.dev/";
var TSX_URL = "https://github.com/privatenumber/tsx";
var BABEL_URL = "https://babeljs.io/";
var DEMO_TS_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/ts";
var DEMO_JS_ESM_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/js-esm";
var DEMO_JS_CJS_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/js-cjs";
var PUB_SUBDOMAIN = "react-srv";

// src/components/SetupSection.tsx
import { useState as useState2 } from "https://esm.sh/react@19.2.0";

// src/components/SettingsIcon.tsx
import { jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function SettingsIcon() {
  return /* @__PURE__ */ jsxs(
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
  );
}

// src/common/useRoute.ts
import { useState, useEffect } from "https://esm.sh/react@19.2.0";
function useRoute() {
  const [route, setRoute] = useState(void 0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const baseRoute = path.includes(PUB_SUBDOMAIN) ? PUB_SUBDOMAIN : "";
      setRoute(baseRoute);
    }
  }, []);
  return route;
}

// src/common/routes.ts
var PAGE_HOME_URL = "index.html";
var PAGE_PRODUCTION_URL = "pages/production.html";
var PAGE_STATIC_URL = "pages/static.html";
var PAGE_DEMO_URL = "pages/demo.html";
var RouteMaster = class _RouteMaster {
  static baseRoute = "";
  static home(domain) {
    const base = _RouteMaster.getBase(domain);
    return `${base}${PAGE_HOME_URL}`;
  }
  static production(domain) {
    const base = _RouteMaster.getBase(domain);
    return `${base}${PAGE_PRODUCTION_URL}`;
  }
  static stat(domain) {
    const base = _RouteMaster.getBase(domain);
    return `${base}${PAGE_STATIC_URL}`;
  }
  static demo(domain) {
    const base = _RouteMaster.getBase(domain);
    return `${base}${PAGE_DEMO_URL}`;
  }
  static getBase(domain) {
    if (!domain) return "/";
    return domain === "" ? "/" : `/${domain}/`;
  }
};

// src/components/SetupSection.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function TypescriptSetup() {
  const route = useRoute();
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsxs2("p", { children: [
      "First, install the latest versions of ",
      /* @__PURE__ */ jsx2("a", { href: RouteMaster.home(route), children: "react-srv" }),
      " and ",
      /* @__PURE__ */ jsx2("a", { href: REACT_URL, target: "_blank", children: "React" }),
      "."
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# optionally install the associated types
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev` }) }) }),
    /* @__PURE__ */ jsxs2("p", { children: [
      "Then, to make sure React is defined correctly at runtime, add the following entries to your ",
      /* @__PURE__ */ jsx2("code", { children: "tsconfig.json" }),
      " file."
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}` }) }) }),
    /* @__PURE__ */ jsxs2("div", { className: "card success", children: [
      /* @__PURE__ */ jsxs2("p", { role: "group", children: [
        /* @__PURE__ */ jsx2(SettingsIcon, {}),
        /* @__PURE__ */ jsx2("b", { children: "Example" })
      ] }),
      /* @__PURE__ */ jsxs2("p", { children: [
        "Check out a fully set up TypeScript project ",
        /* @__PURE__ */ jsx2("a", { href: DEMO_TS_URL, target: "_blank", children: "here" }),
        "."
      ] })
    ] })
  ] });
}
function JSESMSetup() {
  const route = useRoute();
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsxs2("p", { children: [
      "First, install the latest versions of ",
      /* @__PURE__ */ jsx2("a", { href: RouteMaster.home(route), children: "react-srv" }),
      ", ",
      /* @__PURE__ */ jsx2("a", { href: REACT_URL, target: "_blank", children: "React" }),
      " and ",
      /* @__PURE__ */ jsx2("a", { href: TSX_URL, target: "_blank", children: "tsx" }),
      "."
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install tsx as a dev dependency
npm i tsx --save-dev` }) }) }),
    /* @__PURE__ */ jsxs2("p", { children: [
      "Then, to make sure React is defined correctly at runtime, you'll need to add a ",
      /* @__PURE__ */ jsx2("code", { children: "tsconfig.json" }),
      " file."
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}` }) }) }),
    /* @__PURE__ */ jsxs2("p", { children: [
      "Finally, you'll need to run your app with ",
      /* @__PURE__ */ jsx2("code", { children: "tsx" }),
      " so you avoid the ",
      /* @__PURE__ */ jsx2("code", { className: "error", children: 'Unknown file extension ".jsx"' }),
      " error."
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `tsx src/server.js` }) }) }),
    /* @__PURE__ */ jsxs2("div", { className: "card success", children: [
      /* @__PURE__ */ jsxs2("p", { role: "group", children: [
        /* @__PURE__ */ jsx2(SettingsIcon, {}),
        /* @__PURE__ */ jsx2("b", { children: "Example" })
      ] }),
      /* @__PURE__ */ jsxs2("p", { children: [
        "Check out a fully set up ESM Javascript project ",
        /* @__PURE__ */ jsx2("a", { href: DEMO_JS_ESM_URL, target: "_blank", children: "here" }),
        "."
      ] })
    ] })
  ] });
}
function JSCJSSetup() {
  const route = useRoute();
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsxs2("p", { children: [
      "First, install the latest versions of ",
      /* @__PURE__ */ jsx2("a", { href: RouteMaster.home(route), children: "react-srv" }),
      ", ",
      /* @__PURE__ */ jsx2("a", { href: REACT_URL, target: "_blank", children: "React" }),
      " and ",
      /* @__PURE__ */ jsx2("a", { href: BABEL_URL, target: "_blank", children: "babel" }),
      "."
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev` }) }) }),
    /* @__PURE__ */ jsxs2("p", { children: [
      "Then, add a ",
      /* @__PURE__ */ jsx2("code", { children: ".babelrc" }),
      " file where we'll setup the react preset so the server recognises JSX syntax."
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `{
  "presets": ["@babel/preset-react"]
}
` }) }) }),
    /* @__PURE__ */ jsxs2("p", { children: [
      "Then, in the same file where you setup ",
      /* @__PURE__ */ jsx2("code", { children: "ReactSrv" }),
      ", make sure you add the following line."
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `require('@babel/register')({ extensions: ['.js', '.jsx'] });` }) }) }),
    /* @__PURE__ */ jsxs2("p", { children: [
      "This will allow other files to ",
      /* @__PURE__ */ jsx2("code", { children: "require" }),
      " files with the ",
      /* @__PURE__ */ jsx2("code", { children: ".jsx" }),
      " extension:"
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `const Page = require('./pages/Page.jsx').default;` }) }) }),
    /* @__PURE__ */ jsxs2("div", { className: "card success", children: [
      /* @__PURE__ */ jsxs2("p", { role: "group", children: [
        /* @__PURE__ */ jsx2(SettingsIcon, {}),
        /* @__PURE__ */ jsx2("b", { children: "Example" })
      ] }),
      /* @__PURE__ */ jsxs2("p", { children: [
        "Check out a fully set up CommonJS Javascript project ",
        /* @__PURE__ */ jsx2("a", { href: DEMO_JS_CJS_URL, target: "_blank", children: "here" }),
        "."
      ] })
    ] })
  ] });
}
function SetupSection() {
  const [environment, selectEnvironment] = useState2("ts");
  return /* @__PURE__ */ jsxs2("section", { children: [
    /* @__PURE__ */ jsxs2("hgroup", { children: [
      /* @__PURE__ */ jsx2("h2", { children: "Setup" }),
      /* @__PURE__ */ jsx2("p", { children: "Setup is slightly different based on the platform you're running:" })
    ] }),
    /* @__PURE__ */ jsxs2("menu", { children: [
      /* @__PURE__ */ jsx2("li", { "aria-selected": environment === "ts", children: /* @__PURE__ */ jsx2("a", { onClick: () => selectEnvironment("ts"), children: "Typescript" }) }),
      /* @__PURE__ */ jsx2("li", { "aria-selected": environment === "js-esm", children: /* @__PURE__ */ jsx2("a", { onClick: () => selectEnvironment("js-esm"), children: "Javascript (ESM)" }) }),
      /* @__PURE__ */ jsx2("li", { "aria-selected": environment === "js-cjs", children: /* @__PURE__ */ jsx2("a", { onClick: () => selectEnvironment("js-cjs"), children: "Javascript (CJS)" }) })
    ] }),
    /* @__PURE__ */ jsx2("br", {}),
    environment === "ts" && /* @__PURE__ */ jsx2(TypescriptSetup, {}),
    environment === "js-esm" && /* @__PURE__ */ jsx2(JSESMSetup, {}),
    environment === "js-cjs" && /* @__PURE__ */ jsx2(JSCJSSetup, {})
  ] });
}

// src/components/react-srv-hydrate-SetupSection.jsx
var root = document.getElementById("root");
if (!root) {
  throw new Error("react-srv: Could not find hydration root.");
}
if (!globalThis.__REACT_SRV_HYDRATED__) {
  globalThis.__REACT_SRV_HYDRATED__ = true;
  hydrateRoot(
    root,
    React.createElement(SetupSection, globalThis.__INITIAL_PROPS__ || {})
  );
}
