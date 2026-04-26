// src/components/react-srv-hydrate-SetupSection.jsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// src/constants.ts
var REACT_URL = "https://react.dev/";
var DEMO_TS_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/ts";
var DEMO_JS_ESM_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/esm";

// src/components/SetupSection.tsx
import { useState } from "https://esm.sh/react@19.2.0";

// src/components/SettingsIcon.tsx
import { jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function SettingsIcon() {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }),
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
      ]
    }
  );
}

// src/components/SetupSection.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function TypescriptSetup() {
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsxs2("p", { children: [
      "First, install the latest versions of the ",
      /* @__PURE__ */ jsx2("code", { children: "react-srv" }),
      " library and ",
      /* @__PURE__ */ jsx2("a", { href: REACT_URL, target: "_blank", children: "React" }),
      ":"
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# optionally install the associated types
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev` }) }) }),
    /* @__PURE__ */ jsxs2("p", { children: [
      "Then add the following entries to your ",
      /* @__PURE__ */ jsx2("code", { children: ".tsconfig" })
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}` }) }) }),
    /* @__PURE__ */ jsxs2("blockquote", { className: "card success", children: [
      /* @__PURE__ */ jsxs2("p", { className: "group", children: [
        /* @__PURE__ */ jsx2(SettingsIcon, {}),
        /* @__PURE__ */ jsx2("b", { children: "Demo" })
      ] }),
      /* @__PURE__ */ jsxs2("p", { children: [
        "Check out a fully setup TypeScript project ",
        /* @__PURE__ */ jsx2("a", { href: DEMO_TS_URL, target: "_blank", children: "here" }),
        "."
      ] })
    ] })
  ] });
}
function JSESMSetup() {
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsxs2("p", { children: [
      "Follow this guide if your project has ",
      /* @__PURE__ */ jsx2("code", { children: `"type": "module"` }),
      "."
    ] }),
    /* @__PURE__ */ jsxs2("p", { children: [
      "First, install the latest versions of the ",
      /* @__PURE__ */ jsx2("code", { children: "react-srv" }),
      " library and ",
      /* @__PURE__ */ jsx2("a", { href: REACT_URL, target: "_blank", children: "React" }),
      ":"
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install tsx as a dev dependency
npm i tsx --save-dev` }) }) }),
    /* @__PURE__ */ jsxs2("p", { children: [
      "To make sure React is provided at runtime correctly, you'll need to add a ",
      /* @__PURE__ */ jsx2("code", { children: "tsconfig.json" }),
      " file"
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "allowJs": true
  }
}` }) }) }),
    /* @__PURE__ */ jsxs2("p", { children: [
      "Finally, you'll need to run your app with ",
      /* @__PURE__ */ jsx2("code", { children: "tsx" }),
      " so you avoid the ",
      /* @__PURE__ */ jsx2("code", { className: "error", children: 'Unknown file extension ".jsx"' }),
      " error."
    ] }),
    /* @__PURE__ */ jsx2("figure", { children: /* @__PURE__ */ jsx2("pre", { children: /* @__PURE__ */ jsx2("code", { children: `tsx src/server.js` }) }) }),
    /* @__PURE__ */ jsxs2("blockquote", { className: "card success", children: [
      /* @__PURE__ */ jsxs2("p", { className: "group", children: [
        /* @__PURE__ */ jsx2(SettingsIcon, {}),
        /* @__PURE__ */ jsx2("b", { children: "Demo" })
      ] }),
      /* @__PURE__ */ jsxs2("p", { children: [
        "Check out a fully setup ESM Javascript project ",
        /* @__PURE__ */ jsx2("a", { href: DEMO_JS_ESM_URL, target: "_blank", children: "here" }),
        "."
      ] })
    ] })
  ] });
}
function SetupSection() {
  const [environment, selectEnvironment] = useState("ts");
  return /* @__PURE__ */ jsxs2("section", { children: [
    /* @__PURE__ */ jsx2("h2", { children: "Setup" }),
    /* @__PURE__ */ jsx2("p", { children: "Setup is slightly different based on the platform you're running:" }),
    /* @__PURE__ */ jsx2("nav", { children: /* @__PURE__ */ jsxs2("ol", { children: [
      /* @__PURE__ */ jsx2("li", { "aria-selected": environment === "ts", children: /* @__PURE__ */ jsx2("a", { onClick: () => selectEnvironment("ts"), children: "Typescript" }) }),
      /* @__PURE__ */ jsx2("li", { "aria-selected": environment === "js-esm", children: /* @__PURE__ */ jsx2("a", { onClick: () => selectEnvironment("js-esm"), children: "Javascript (ESM)" }) }),
      /* @__PURE__ */ jsx2("li", { "aria-selected": environment === "js-cjs", children: /* @__PURE__ */ jsx2("a", { onClick: () => selectEnvironment("js-cjs"), children: "Javascript (CJS)" }) })
    ] }) }),
    /* @__PURE__ */ jsx2("br", {}),
    environment === "ts" && /* @__PURE__ */ jsx2(TypescriptSetup, {}),
    environment === "js-esm" && /* @__PURE__ */ jsx2(JSESMSetup, {})
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
