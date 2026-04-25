// src/react-srv-hydrate-Index.jsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// src/Index.tsx
import { useState } from "https://esm.sh/react@19.2.0";

// src/Navigation.tsx
import { jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Navigation() {
  return /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ul", { children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/index.html", children: "Home" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/about.html", children: "About" }) })
  ] }) });
}

// src/Index.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Index() {
  const [clicks, setClicks] = useState(0);
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx2("header", { children: /* @__PURE__ */ jsx2(Navigation, {}) }),
    /* @__PURE__ */ jsxs2("main", { children: [
      /* @__PURE__ */ jsx2("h1", { children: "Hello, World!" }),
      /* @__PURE__ */ jsx2("p", { children: /* @__PURE__ */ jsx2("button", { onClick: () => setClicks(clicks + 1), children: "Click me!" }) }),
      /* @__PURE__ */ jsxs2("p", { children: [
        "Number of clicks: ",
        clicks
      ] })
    ] })
  ] });
}

// src/react-srv-hydrate-Index.jsx
var root = document.getElementById("root");
if (!root) {
  throw new Error("react-srv: Could not find hydration root.");
}
if (!globalThis.__REACT_SRV_HYDRATED__) {
  globalThis.__REACT_SRV_HYDRATED__ = true;
  hydrateRoot(
    root,
    React.createElement(Index, globalThis.__INITIAL_PROPS__ || {})
  );
}
