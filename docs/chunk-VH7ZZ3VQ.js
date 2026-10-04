import {
  CodeHighlight
} from "./chunk-5U3Z3MGO.js";
import {
  BABEL_URL,
  DEMO_JS_CJS_URL,
  DEMO_JS_ESM_URL,
  DEMO_TS_URL,
  REACT_URL,
  RouteMaster,
  TSX_URL,
  useRoute
} from "./chunk-DO3KOFTT.js";
import {
  SettingsIcon
} from "./chunk-C73A2N2V.js";

// src/components/SetupSection.tsx
import { useState } from "https://esm.sh/react@19.2.0";
import { Fragment, jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function TypescriptSetup() {
  const route = useRoute();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("p", { children: [
      "First, install the latest versions of ",
      /* @__PURE__ */ jsx("a", { href: RouteMaster.home(route), children: "react-srv" }),
      " and ",
      /* @__PURE__ */ jsx("a", { href: REACT_URL, target: "_blank", children: "React" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx(CodeHighlight, { lang: "bash", children: `npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# optionally install the associated types
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev` }) }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Then, to make sure React is defined correctly at runtime, add the following entries to your ",
      /* @__PURE__ */ jsx("code", { children: "tsconfig.json" }),
      " file."
    ] }),
    /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx(CodeHighlight, { lang: "json", children: `{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}` }) }),
    /* @__PURE__ */ jsxs("article", { className: "success", children: [
      /* @__PURE__ */ jsxs("p", { role: "group", children: [
        /* @__PURE__ */ jsx(SettingsIcon, {}),
        /* @__PURE__ */ jsx("b", { children: "Example" })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Check out a fully set up TypeScript project ",
        /* @__PURE__ */ jsx("a", { href: DEMO_TS_URL, target: "_blank", children: "here" }),
        "."
      ] })
    ] })
  ] });
}
function JSESMSetup() {
  const route = useRoute();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("p", { children: [
      "First, install the latest versions of ",
      /* @__PURE__ */ jsx("a", { href: RouteMaster.home(route), children: "react-srv" }),
      ", ",
      /* @__PURE__ */ jsx("a", { href: REACT_URL, target: "_blank", children: "React" }),
      " and ",
      /* @__PURE__ */ jsx("a", { href: TSX_URL, target: "_blank", children: "tsx" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx(CodeHighlight, { lang: "bash", children: `npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install tsx as a dev dependency
npm i tsx --save-dev` }) }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Then, to make sure React is defined correctly at runtime, you'll need to add a ",
      /* @__PURE__ */ jsx("code", { children: "tsconfig.json" }),
      " file."
    ] }),
    /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx(CodeHighlight, { lang: "json", children: `{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}` }) }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Finally, you'll need to run your app with ",
      /* @__PURE__ */ jsx("code", { children: "tsx" }),
      " so you avoid the ",
      /* @__PURE__ */ jsx("code", { className: "error", children: 'Unknown file extension ".jsx"' }),
      " error."
    ] }),
    /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx(CodeHighlight, { lang: "bash", children: `tsx src/server.js` }) }),
    /* @__PURE__ */ jsxs("article", { className: "success", children: [
      /* @__PURE__ */ jsxs("p", { role: "group", children: [
        /* @__PURE__ */ jsx(SettingsIcon, {}),
        /* @__PURE__ */ jsx("b", { children: "Example" })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Check out a fully set up ESM Javascript project ",
        /* @__PURE__ */ jsx("a", { href: DEMO_JS_ESM_URL, target: "_blank", children: "here" }),
        "."
      ] })
    ] })
  ] });
}
function JSCJSSetup() {
  const route = useRoute();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("p", { children: [
      "First, install the latest versions of ",
      /* @__PURE__ */ jsx("a", { href: RouteMaster.home(route), children: "react-srv" }),
      ", ",
      /* @__PURE__ */ jsx("a", { href: REACT_URL, target: "_blank", children: "React" }),
      " and ",
      /* @__PURE__ */ jsx("a", { href: BABEL_URL, target: "_blank", children: "babel" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx(CodeHighlight, { lang: "bash", children: `npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev
npm i @babel/plugin-transform-modules-commonjs --save-dev` }) }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Then, add a ",
      /* @__PURE__ */ jsx("code", { children: ".babelrc" }),
      " file where we'll setup the react preset so the server recognises JSX syntax and a plugin for module resolution inside ",
      /* @__PURE__ */ jsx("code", { children: ".jsx" }),
      " files."
    ] }),
    /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx(CodeHighlight, { lang: "json", children: `{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-transform-modules-commonjs"]
}
` }) }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Then, in the same file where you setup ",
      /* @__PURE__ */ jsx("code", { children: "ReactSrv" }),
      ", make sure you add the following line."
    ] }),
    /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx(CodeHighlight, { lang: "javascript", children: `require('@babel/register')({ extensions: ['.js', '.jsx'] });` }) }),
    /* @__PURE__ */ jsxs("p", { children: [
      "This will allow other files to ",
      /* @__PURE__ */ jsx("code", { children: "require" }),
      " files with the ",
      /* @__PURE__ */ jsx("code", { children: ".jsx" }),
      " extension:"
    ] }),
    /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx(CodeHighlight, { lang: "javascript", children: `const Page = require('./pages/Page.jsx').default;` }) }),
    /* @__PURE__ */ jsxs("article", { className: "success", children: [
      /* @__PURE__ */ jsxs("p", { role: "group", children: [
        /* @__PURE__ */ jsx(SettingsIcon, {}),
        /* @__PURE__ */ jsx("b", { children: "Example" })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Check out a fully set up CommonJS Javascript project ",
        /* @__PURE__ */ jsx("a", { href: DEMO_JS_CJS_URL, target: "_blank", children: "here" }),
        "."
      ] })
    ] })
  ] });
}
function SetupSection() {
  const [environment, selectEnvironment] = useState("ts");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("hgroup", { children: [
      /* @__PURE__ */ jsx("h2", { children: "Setup" }),
      /* @__PURE__ */ jsx("p", { children: "Setup is slightly different based on the platform you're running:" })
    ] }),
    /* @__PURE__ */ jsxs("menu", { children: [
      /* @__PURE__ */ jsx("li", { "aria-selected": environment === "ts", children: /* @__PURE__ */ jsx("a", { onClick: () => selectEnvironment("ts"), children: "Typescript" }) }),
      /* @__PURE__ */ jsx("li", { "aria-selected": environment === "js-esm", children: /* @__PURE__ */ jsx("a", { onClick: () => selectEnvironment("js-esm"), children: "Javascript (ESM)" }) }),
      /* @__PURE__ */ jsx("li", { "aria-selected": environment === "js-cjs", children: /* @__PURE__ */ jsx("a", { onClick: () => selectEnvironment("js-cjs"), children: "Javascript (CJS)" }) })
    ] }),
    /* @__PURE__ */ jsx("br", {}),
    environment === "ts" && /* @__PURE__ */ jsx(TypescriptSetup, {}),
    environment === "js-esm" && /* @__PURE__ */ jsx(JSESMSetup, {}),
    environment === "js-cjs" && /* @__PURE__ */ jsx(JSCJSSetup, {})
  ] });
}

export {
  SetupSection
};
