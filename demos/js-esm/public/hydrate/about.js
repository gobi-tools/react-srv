// src/pages/about/react-srv-hydrate-About.jsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// src/pages/about/About.jsx
import { Fragment, jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function About() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { children: "About" }),
    /* @__PURE__ */ jsx("p", { children: "Demo app" }),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) })
  ] });
}

// src/pages/about/react-srv-hydrate-About.jsx
var root = document.getElementById("root");
if (!root) {
  throw new Error("react-srv: Could not find hydration root.");
}
if (!globalThis.__REACT_SRV_HYDRATED__) {
  globalThis.__REACT_SRV_HYDRATED__ = true;
  hydrateRoot(
    root,
    React.createElement(About, globalThis.__INITIAL_PROPS__ || {})
  );
}
