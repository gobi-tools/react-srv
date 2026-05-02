// src/pages/react-srv-hydrate-Production.jsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// src/common/routes.ts
var PAGE_HOME_URL = "index.html";
var PAGE_PRODUCTION_URL = "pages/production.html";
var PAGE_STATIC_URL = "pages/static.html";
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
  static getBase(domain) {
    if (!domain) return "/";
    return domain === "" ? "/" : `/${domain}/`;
  }
};

// src/common/useRoute.ts
import { useState, useEffect } from "https://esm.sh/react@19.2.0";

// src/constants.ts
var PRODUCT_NAME = "React Srv";
var DEMO_PROD_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos";
var PUB_SUBDOMAIN = "react-srv";

// src/common/useRoute.ts
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

// src/components/HomeIcon.tsx
import { jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function HomeIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }),
        /* @__PURE__ */ jsx("path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" })
      ]
    }
  );
}

// src/components/Header.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Header() {
  const route = useRoute();
  return /* @__PURE__ */ jsx2("nav", { children: /* @__PURE__ */ jsx2("ul", { children: /* @__PURE__ */ jsx2("li", { children: /* @__PURE__ */ jsxs2("a", { href: RouteMaster.home(route), children: [
    /* @__PURE__ */ jsx2(HomeIcon, {}),
    /* @__PURE__ */ jsx2("span", { children: "Home" })
  ] }) }) }) });
}

// src/components/SettingsIcon.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function SettingsIcon() {
  return /* @__PURE__ */ jsxs3(
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
  );
}

// src/pages/Production.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs4 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Production() {
  return /* @__PURE__ */ jsxs4(Fragment, { children: [
    /* @__PURE__ */ jsx4("header", { children: /* @__PURE__ */ jsx4(Header, {}) }),
    /* @__PURE__ */ jsxs4("main", { children: [
      /* @__PURE__ */ jsxs4("section", { children: [
        /* @__PURE__ */ jsx4("h2", { children: "Production" }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "Every time the ",
          /* @__PURE__ */ jsx4("code", { children: "render" }),
          " method is called, ",
          PRODUCT_NAME,
          " transforms a JSX component into HTML and Javascript:"
        ] }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `<html>
  <head><title>Page</title></head>
  <body>...</body>
  <script>... set initial props ...<\/script>
  <script type="module">... hydration script ... <\/script>
</html>` }) }) }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "The markup is created from the component itself and the hydration script is created by reading the source file, ",
          /* @__PURE__ */ jsx4("code", { children: "Page.tsx" }),
          " or ",
          /* @__PURE__ */ jsx4("code", { children: "Page.jsx" }),
          ", from disk."
        ] }),
        /* @__PURE__ */ jsx4("p", { children: "This is good for development but it's not ideal for production, first because the source code might not be present at all and second because reading and compiling code every time is not very efficient." }),
        /* @__PURE__ */ jsx4("p", { children: "So, for production we can precompile the necessary javascript and have it ready to go." }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "By default, ",
          PRODUCT_NAME,
          " looks in the ",
          /* @__PURE__ */ jsx4("code", { children: "./src" }),
          " folder to find React files and outputs compiled javascript in ",
          /* @__PURE__ */ jsx4("code", { children: "./public/hydrate" }),
          ". You can change this these locations as well as whether you're in dev or prod mode in the config file:"
        ] }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `export default {
  document: Document,
  srcPath: './src', // default
  outPath: './public/hydrate', // default
  isProd: process.env.NODE_ENV === 'production',
}` }) }) }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "Which you can reference via the ",
          /* @__PURE__ */ jsx4("code", { children: "bundle" }),
          " command, in ",
          /* @__PURE__ */ jsx4("code", { children: "package.json" })
        ] }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `...
"scripts": {
  "build": "react-srv bundle -f src/react-srv.config.ts && ... other build steps",
  "start": "NODE_ENV=production node dist/server.js"
},` }) }) }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "The last thing you need to do is to make sure the ",
          /* @__PURE__ */ jsx4("code", { children: "/public" }),
          " folder is statically served and accessible and you're good to go."
        ] })
      ] }),
      /* @__PURE__ */ jsx4("hr", {}),
      /* @__PURE__ */ jsxs4("blockquote", { className: "card success", children: [
        /* @__PURE__ */ jsxs4("p", { className: "group", children: [
          /* @__PURE__ */ jsx4(SettingsIcon, {}),
          /* @__PURE__ */ jsx4("b", { children: "Demos" })
        ] }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "Check out production ready demos for Typescript and Javascript ",
          /* @__PURE__ */ jsx4("a", { href: DEMO_PROD_URL, target: "_blank", children: "here" }),
          "."
        ] })
      ] })
    ] })
  ] });
}

// src/pages/react-srv-hydrate-Production.jsx
var root = document.getElementById("root");
if (!root) {
  throw new Error("react-srv: Could not find hydration root.");
}
if (!globalThis.__REACT_SRV_HYDRATED__) {
  globalThis.__REACT_SRV_HYDRATED__ = true;
  hydrateRoot(
    root,
    React.createElement(Production, globalThis.__INITIAL_PROPS__ || {})
  );
}
