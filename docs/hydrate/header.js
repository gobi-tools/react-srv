// src/components/react-srv-hydrate-Header.jsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// src/constants.ts
var PAGE_HOME_URL = "/";

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
  return /* @__PURE__ */ jsx2("nav", { children: /* @__PURE__ */ jsx2("ul", { children: /* @__PURE__ */ jsx2("li", { children: /* @__PURE__ */ jsxs2("a", { href: PAGE_HOME_URL, children: [
    /* @__PURE__ */ jsx2(HomeIcon, {}),
    /* @__PURE__ */ jsx2("span", { children: "Home" })
  ] }) }) }) });
}

// src/components/react-srv-hydrate-Header.jsx
var root = document.getElementById("root");
if (!root) {
  throw new Error("react-srv: Could not find hydration root.");
}
if (!globalThis.__REACT_SRV_HYDRATED__) {
  globalThis.__REACT_SRV_HYDRATED__ = true;
  hydrateRoot(
    root,
    React.createElement(Header, globalThis.__INITIAL_PROPS__ || {})
  );
}
