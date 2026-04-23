// docs-src/react-srv-hydrate-State.tsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// docs-src/constants.ts
var PAGE_HOME_URL = "./index.html";

// docs-src/components/Header.tsx
import { jsx } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Header() {
  return /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: PAGE_HOME_URL, children: "Home" }) }) }) }) });
}

// docs-src/State.tsx
import { Fragment, jsx as jsx2, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function State() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Header, {}),
    /* @__PURE__ */ jsx2("main", { children: /* @__PURE__ */ jsx2("section", { children: /* @__PURE__ */ jsx2("h2", { children: "Global state" }) }) })
  ] });
}

// docs-src/react-srv-hydrate-State.tsx
var root = document.getElementById("root");
if (!root) {
  throw new Error("react-srv: Could not find hydration root.");
}
if (!globalThis.__REACT_SRV_HYDRATED__) {
  globalThis.__REACT_SRV_HYDRATED__ = true;
  hydrateRoot(
    root,
    React.createElement(State, globalThis.__INITIAL_PROPS__ || {})
  );
}
