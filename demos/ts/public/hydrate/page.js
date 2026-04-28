// src/pages/react-srv-hydrate-Page.jsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// src/pages/Page.tsx
import { useState } from "https://esm.sh/react@19.2.0";
import { Fragment, jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Greeting() {
  return /* @__PURE__ */ jsx("p", { children: "Today is a fine day!" });
}
function Button() {
  const [clicks, setClicks] = useState(0);
  return /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("button", { onClick: () => setClicks(clicks + 1), children: [
    "Clicks ",
    clicks
  ] }) });
}
function Page(props) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "Hello, ",
      props.name,
      "!"
    ] }),
    /* @__PURE__ */ jsx(Greeting, {}),
    /* @__PURE__ */ jsx(Button, {}),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: "/about", children: "About" }) })
  ] });
}

// src/pages/react-srv-hydrate-Page.jsx
var root = document.getElementById("root");
if (!root) {
  throw new Error("react-srv: Could not find hydration root.");
}
if (!globalThis.__REACT_SRV_HYDRATED__) {
  globalThis.__REACT_SRV_HYDRATED__ = true;
  hydrateRoot(
    root,
    React.createElement(Page, globalThis.__INITIAL_PROPS__ || {})
  );
}
