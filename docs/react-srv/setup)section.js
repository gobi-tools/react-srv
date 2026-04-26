// src/components/react-srv-hydrate-SetupSection.jsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// src/constants.ts
var REACT_URL = "https://react.dev/";

// src/components/SetupSection.tsx
import { useState } from "https://esm.sh/react@19.2.0";
import { Fragment, jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function TypescriptSetup() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("p", { children: [
      "First, install the latest versions of the ",
      /* @__PURE__ */ jsx("code", { children: "react-srv" }),
      " library and ",
      /* @__PURE__ */ jsx("a", { href: REACT_URL, target: "_blank", children: "React" }),
      ":"
    ] }),
    /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev` }) }) }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Then add the following entries to your ",
      /* @__PURE__ */ jsx("code", { children: ".tsconfig" })
    ] }),
    /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}` }) }) })
  ] });
}
function SetupSection() {
  const [environment, selectEnvironment] = useState("ts");
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsx("h2", { children: "Setup" }),
    /* @__PURE__ */ jsx("p", { children: "Setup is slightly different based on the platform you're running:" }),
    /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ol", { children: [
      /* @__PURE__ */ jsx("li", { "aria-selected": environment === "ts", children: /* @__PURE__ */ jsx("a", { onClick: () => selectEnvironment("ts"), children: "Typescript" }) }),
      /* @__PURE__ */ jsx("li", { "aria-selected": environment === "js-esm", children: /* @__PURE__ */ jsx("a", { onClick: () => selectEnvironment("js-esm"), children: "Javascript (ESM)" }) }),
      /* @__PURE__ */ jsx("li", { "aria-selected": environment === "js-cjs", children: /* @__PURE__ */ jsx("a", { onClick: () => selectEnvironment("js-cjs"), children: "Javascript (CJS)" }) })
    ] }) }),
    /* @__PURE__ */ jsx("br", {}),
    environment === "ts" && /* @__PURE__ */ jsx(TypescriptSetup, {})
  ] });
}

// src/components/react-srv-hydrate-SetupSection.jsx
var root = document.getElementById("root");
if (!root) {
  throw new Error("react-srv: Could not find hydration root.");
}
if (!globalThis.__REACT_SRV_HYDRATED__) {
  globalThis.__REACT_SRV_HYDRATED__ = true;
  hydrateRoot(
    root,
    React.createElement(SetupSection, globalThis.__INITIAL_PROPS__ || {})
  );
}
