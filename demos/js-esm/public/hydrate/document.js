// src/documents/react-srv-hydrate-Document.jsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// src/documents/Document.jsx
import { jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Document({ children }) {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("title", { children: "Example" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
      /* @__PURE__ */ jsx("meta", { name: "color-scheme", content: "light dark" })
    ] }),
    /* @__PURE__ */ jsx("body", { children })
  ] });
}

// src/documents/react-srv-hydrate-Document.jsx
var root = document.getElementById("root");
if (!root) {
  throw new Error("react-srv: Could not find hydration root.");
}
if (!globalThis.__REACT_SRV_HYDRATED__) {
  globalThis.__REACT_SRV_HYDRATED__ = true;
  hydrateRoot(
    root,
    React.createElement(Document, globalThis.__INITIAL_PROPS__ || {})
  );
}
