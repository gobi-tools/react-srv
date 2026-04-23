// docs-src/components/react-srv-hydrate-Header.tsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// docs-src/constants.ts
var PAGE_HOME_URL = "./index.html";

// docs-src/components/Header.tsx
import { jsx } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Header() {
  return /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: PAGE_HOME_URL, children: "Home" }) }) }) }) });
}

// docs-src/components/react-srv-hydrate-Header.tsx
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
