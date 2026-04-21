// docs-src/react-srv-hydrate-Document.tsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// docs-src/Document.tsx
import { jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Document({ title, children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "UTF-8" }),
      /* @__PURE__ */ jsx("title", { children: title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "React Srv Official Page" }),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Gabriel Coman" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
      /* @__PURE__ */ jsx("meta", { name: "color-scheme", content: "light dark" }),
      /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/gh/gobi-tools/css-theme@refs/heads/main/dist/theme.scholar.min.css" })
    ] }),
    /* @__PURE__ */ jsx("body", { children })
  ] });
}

// docs-src/react-srv-hydrate-Document.tsx
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
