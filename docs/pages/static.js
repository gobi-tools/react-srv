// src/pages/react-srv-hydrate-Static.jsx
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
var DEMO_STATIC_URL = "https://github.com/gobi-tools/react-srv/tree/main/pages";
var SSG_URL = "https://en.wikipedia.org/wiki/Static_site_generator";
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

// src/pages/Static.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs4 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Static() {
  const route = useRoute();
  return /* @__PURE__ */ jsxs4(Fragment, { children: [
    /* @__PURE__ */ jsx4("header", { children: /* @__PURE__ */ jsx4(Header, {}) }),
    /* @__PURE__ */ jsxs4("main", { children: [
      /* @__PURE__ */ jsxs4("section", { children: [
        /* @__PURE__ */ jsx4("h2", { children: "Static site generation (SSG)" }),
        /* @__PURE__ */ jsxs4("p", { children: [
          PRODUCT_NAME,
          " can be used for direct static site generation (",
          /* @__PURE__ */ jsx4("a", { href: SSG_URL, target: "_blank", children: "SSG" }),
          "). If you've read the section on ",
          /* @__PURE__ */ jsx4("a", { href: RouteMaster.production(route), children: "getting to production" }),
          ", then you're already ninety percent there."
        ] }),
        /* @__PURE__ */ jsx4("p", { children: "You can specify the source and output destinations and whether you want to keep javascript hydration (default) or disable it completely for a pure static experiece, in the config file:" }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `export default {
  document: Document,
  srcPath: './src',
  outPath: './public',
  hydrate: true, // or false
}` }) }) }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "Then you can add the following step to your build pipeline in ",
          /* @__PURE__ */ jsx4("code", { children: "package.json" }),
          ":"
        ] }),
        /* @__PURE__ */ jsx4("figure", { children: /* @__PURE__ */ jsx4("pre", { children: /* @__PURE__ */ jsx4("code", { children: `...
"scripts": {
  "render": "react-srv render -f src/react-srv.config.ts && ... other build steos"
},` }) }) }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "The last thing you need to do is to make sure the ",
          /* @__PURE__ */ jsx4("code", { children: "/public" }),
          " folder is accessible on the internet and you're good to go."
        ] })
      ] }),
      /* @__PURE__ */ jsx4("hr", {}),
      /* @__PURE__ */ jsxs4("blockquote", { className: "card success", children: [
        /* @__PURE__ */ jsxs4("p", { className: "group", children: [
          /* @__PURE__ */ jsx4(SettingsIcon, {}),
          /* @__PURE__ */ jsx4("b", { children: "Demo" })
        ] }),
        /* @__PURE__ */ jsxs4("p", { children: [
          "The source for this documentation is a statically generated site. Check it out ",
          /* @__PURE__ */ jsx4("a", { href: DEMO_STATIC_URL, target: "_blank", children: "here" }),
          "."
        ] })
      ] })
    ] })
  ] });
}

// src/pages/react-srv-hydrate-Static.jsx
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
