// src/react-srv-hydrate-Production.jsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// src/constants.ts
var PRODUCT_NAME = "React Srv";
var REACT_HYDRATION_URL = "https://react.dev/reference/react-dom/client/hydrateRoot";
var REACT_RENDER_URL = "https://react.dev/reference/react-dom/server/renderToString";
var NGINX_URL = "https://nginx.org/";
var DEMO_PROD_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/prod";
var PAGE_HOME_URL = "./index.html";

// src/components/HomeIco.tsx
import { jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function HomeIco() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }),
        /* @__PURE__ */ jsx("path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" })
      ]
    }
  );
}

// src/components/Header.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Header() {
  return /* @__PURE__ */ jsx2("nav", { children: /* @__PURE__ */ jsx2("ul", { children: /* @__PURE__ */ jsx2("li", { children: /* @__PURE__ */ jsxs2("a", { href: PAGE_HOME_URL, children: [
    /* @__PURE__ */ jsx2(HomeIco, {}),
    /* @__PURE__ */ jsx2("span", { children: "Home" })
  ] }) }) }) });
}

// src/Production.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Production() {
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsx3("header", { children: /* @__PURE__ */ jsx3(Header, {}) }),
    /* @__PURE__ */ jsxs3("main", { children: [
      /* @__PURE__ */ jsxs3("section", { children: [
        /* @__PURE__ */ jsx3("h2", { children: "Anatomy of a request" }),
        /* @__PURE__ */ jsx3("p", { children: "Every time this example endpoint is hit ..." }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `app.get('/', (_, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});` }) }) }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "... there's a number of things ",
          PRODUCT_NAME,
          " does inside the ",
          /* @__PURE__ */ jsx3("code", { children: "render" }),
          " method:"
        ] }),
        /* @__PURE__ */ jsxs3("ol", { children: [
          /* @__PURE__ */ jsxs3("li", { children: [
            "First, it ",
            /* @__PURE__ */ jsx3("a", { href: REACT_RENDER_URL, target: "_blank", children: "creates static markup" }),
            " (that includes initial props)"
          ] }),
          /* @__PURE__ */ jsxs3("li", { children: [
            "Then, it creates a ",
            /* @__PURE__ */ jsx3("a", { href: REACT_HYDRATION_URL, target: "_blank", children: "hydration" }),
            " script (for subsequent interactivity)"
          ] })
        ] }),
        /* @__PURE__ */ jsx3("p", { children: "Therefore, at each request, the final payload consists of both HTML and Javascript:" }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `<html>
  <head><title>Page</title></head>
  <body>...</body>
  <script>... set initial props ...<\/script>
  <script type="module">... hydration script ... <\/script>
</html>` }) }) }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "The static markup is created at runtime from the component - ",
          /* @__PURE__ */ jsx3("code", { children: `<Page/>` }),
          " - itself."
        ] }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "The hydration script is also created at runtime by reading the file - ",
          /* @__PURE__ */ jsx3("code", { children: `Page.tsx` }),
          " or ",
          /* @__PURE__ */ jsx3("code", { children: `Page.jsx` }),
          " - from disk."
        ] }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "In order to know where to find the file, ",
          PRODUCT_NAME,
          " needs to know where to look. By defualt it looks in the ",
          /* @__PURE__ */ jsx3("code", { children: "/src" }),
          " folder. This can be changed by specifying the ",
          /* @__PURE__ */ jsx3("code", { children: "srcPath" }),
          " parameter when initialising the shared object."
        ] }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `const react = new ReactSrv({
  Document,
  srcPath: './input',
});` }) }) })
      ] }),
      /* @__PURE__ */ jsxs3("section", { children: [
        /* @__PURE__ */ jsx3("h2", { children: "Prebundling" }),
        /* @__PURE__ */ jsx3("p", { children: "For a small project or for development, reading from disk might be good enough. It does require the source always be present, however, and it does mean the same code will be compiled over and over again, at each request." }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "For production builds, it's always best to ",
          /* @__PURE__ */ jsx3("b", { children: "prebundle" }),
          " all the hydration scripts."
        ] }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "You can do so by creating a ",
          /* @__PURE__ */ jsx3("code", { children: "prebundle.ts" }),
          " or ",
          /* @__PURE__ */ jsx3("code", { children: "prbundle.js" }),
          " script:"
        ] }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `// import the "react" instance 
react.prebundle()` }) }) }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "Than you can execute directly or add it to your own build pipeline. When successfull, it will write the compiled ",
          /* @__PURE__ */ jsx3("code", { children: ".js" }),
          " files in ",
          /* @__PURE__ */ jsx3("code", { children: "./public/react-srv" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "You can control the output path and name with the ",
          /* @__PURE__ */ jsx3("code", { children: "outPath" }),
          " and ",
          /* @__PURE__ */ jsx3("code", { children: "outDir" }),
          " config values:"
        ] }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `const react = new ReactSrv({
  Document,
  srcPath: './input',
  outPath: './dist',    // ./public
  outDir: 'hydration',  // ./react-srv
});` }) }) }),
        /* @__PURE__ */ jsxs3("details", { className: "card", children: [
          /* @__PURE__ */ jsx3("summary", { children: "Notes on the output folder" }),
          /* @__PURE__ */ jsx3("p", { children: "The output folder must be statically served or accessible via the internet, otherwise the hydration scripts won't be able to load." }),
          /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `app.use(express.static('public'));` }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("section", { children: [
        /* @__PURE__ */ jsx3("h2", { children: "Select environment" }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "One final step is to let ",
          PRODUCT_NAME,
          " know when you're running in a test environment and when in a production one. You can use the ",
          /* @__PURE__ */ jsx3("code", { children: "isProd" }),
          " config value. The underlying logic is up to you:"
        ] }),
        /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `const react = new ReactSrv({
  Document,
  srcPath: './input',
  outPath: './dist',
  outDir: 'hydration',
  isProd: process.env.NODE_ENV === 'production',
});` }) }) }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "When setup like this, ",
          PRODUCT_NAME,
          " will compile ",
          /* @__PURE__ */ jsx3("code", { children: ".tsx" }),
          " and ",
          /* @__PURE__ */ jsx3("code", { children: ".jsx" }),
          " files on the go in test mode and serve pre-compiled ",
          /* @__PURE__ */ jsx3("code", { children: ".js" }),
          " files from the bundle output folder in production model."
        ] }),
        /* @__PURE__ */ jsxs3("details", { className: "card", children: [
          /* @__PURE__ */ jsx3("summary", { children: "Small optimisation" }),
          /* @__PURE__ */ jsxs3("p", { children: [
            "It's worthwhile to create the ",
            /* @__PURE__ */ jsx3("code", { children: "ReactSrv" }),
            " instance in one file and import it in your route definitions file or your prebundling script so as to avoid duplicating instances that are harder to keep in sync."
          ] }),
          /* @__PURE__ */ jsx3("figure", { children: /* @__PURE__ */ jsx3("pre", { children: /* @__PURE__ */ jsx3("code", { children: `export default new ReactSrv({
  Document,
  srcPath: './input',
  outPath: './dist',
  outDir: 'hydration',
  isProd: process.env.NODE_ENV === 'production',
});` }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("section", { children: [
        /* @__PURE__ */ jsx3("h2", { children: "Performance" }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "In development mode we've seen that every time the ",
          /* @__PURE__ */ jsx3("code", { children: "render" }),
          " method gets called, we generate both HTML and a hydration script and we send it over to the client browser."
        ] }),
        /* @__PURE__ */ jsx3("p", { children: "This is still pretty reasonable. The content that weighs the most is the React library itself, which needs to be present on every page for hydration and interactivity to work. But that's only loaded once and then cached locally by the browser." }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "By applying the tecniques above to prepare ",
          PRODUCT_NAME,
          " for production, we can gain extra performance."
        ] }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "First, now on every request we'll send over ",
          /* @__PURE__ */ jsx3("i", { children: "just" }),
          " the HTML, with a link to the hydration script."
        ] }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "Secondly, the hydration script needs to be loaded once, towards the end of the rendering loop. It too can be cached (e.g. by using ",
          /* @__PURE__ */ jsx3("a", { href: NGINX_URL, target: "_blank", children: "nginx" }),
          " as a reverse proxy)"
        ] }),
        /* @__PURE__ */ jsx3("p", { children: "Finally, React itself, just like in development mode, will be available async and cached by the browser." }),
        /* @__PURE__ */ jsx3("p", { children: "In this way, in production we can squeeze as much performance as we can out of rendering React." })
      ] }),
      /* @__PURE__ */ jsx3("hr", {}),
      /* @__PURE__ */ jsxs3("blockquote", { className: "card success", children: [
        /* @__PURE__ */ jsxs3("p", { className: "group", children: [
          /* @__PURE__ */ jsxs3(
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
                /* @__PURE__ */ jsx3("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }),
                /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "3" })
              ]
            }
          ),
          /* @__PURE__ */ jsx3("b", { children: "Demo" })
        ] }),
        /* @__PURE__ */ jsxs3("p", { children: [
          "Check out a production ready demo ",
          /* @__PURE__ */ jsx3("a", { href: DEMO_PROD_URL, target: "_blank", children: "here" }),
          "."
        ] })
      ] })
    ] })
  ] });
}

// src/react-srv-hydrate-Production.jsx
var root = document.getElementById("root");
if (!root) {
  throw new Error("react-srv: Could not find hydration root.");
}
if (!globalThis.__REACT_SRV_HYDRATED__) {
  globalThis.__REACT_SRV_HYDRATED__ = true;
  hydrateRoot(
    root,
    React.createElement(Production, globalThis.__INITIAL_PROPS__ || {})
  );
}
