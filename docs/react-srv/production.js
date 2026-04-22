// docs-src/react-srv-hydrate-Production.tsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// docs-src/constants.ts
var PRODUCT_NAME = "React Srv";
var REACT_HYDRATION_URL = "https://react.dev/reference/react-dom/client/hydrateRoot";
var REACT_RENDER_URL = "https://react.dev/reference/react-dom/server/renderToString";
var TSX_URL = "https://github.com/privatenumber/tsx";
var NGINX_URL = "https://nginx.org/";
var PRODUCTION_DEMO_URL = "https://github.com/gobi-tools/react-srv/tree/main/docs-examples";
var PAGE_HOME_URL = "./index.html";

// docs-src/Production.tsx
import { Fragment, jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Production() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: PAGE_HOME_URL, children: "Home" }) }) }) }) }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Anatomy of a request" }),
        /* @__PURE__ */ jsx("p", { children: "Every time this example endpoint is hit ..." }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `app.get('/', (_, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "server.ts" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "... there's a number of things ",
          PRODUCT_NAME,
          " does inside the ",
          /* @__PURE__ */ jsx("code", { children: "render" }),
          " method:",
          /* @__PURE__ */ jsxs("ol", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "First, it ",
              /* @__PURE__ */ jsx("a", { href: REACT_RENDER_URL, target: "_blank", children: "creates static markup" }),
              " (that includes initial props)"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Then, it creates a ",
              /* @__PURE__ */ jsx("a", { href: REACT_HYDRATION_URL, target: "_blank", children: "hydration" }),
              " script (for subsequent interactivity)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "Therefore, at each request, the final payload consists of both HTML and Javascript:" }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `<html>
  <head><title>Page</title></head>
  <body>...</body>
  <script>... set initial props ...<\/script>
  <script type="module">... hydration script ... <\/script>
</html>` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "react.render(Page)" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "The static markup is created at runtime from the component - ",
          /* @__PURE__ */ jsx("code", { children: `<Page/>` }),
          " - itself."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "The hydration script is also created at runtime by reading the file - ",
          /* @__PURE__ */ jsx("code", { children: `Page.tsx` }),
          " - from disk."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "In order to know where to find the file, ",
          PRODUCT_NAME,
          " needs to know where to look. By defualt it looks in the ",
          /* @__PURE__ */ jsx("code", { children: "/src" }),
          " folder. This can be changed by specifying the ",
          /* @__PURE__ */ jsx("code", { children: "srcPath" }),
          " parameter when initialising the shared object."
        ] }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `const react = new ReactSrv({
  Document,
  srcPath: './input',
});` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "server.ts" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Prebundling" }),
        /* @__PURE__ */ jsx("p", { children: "For small project or for development, reading from disk might be good enough. It does require the source always be present, however, and it does mean the same code will be compiled over and over again, at each request." }),
        /* @__PURE__ */ jsxs("p", { children: [
          "For production builds, it's always best to ",
          /* @__PURE__ */ jsx("b", { children: "prebundle" }),
          " all the hydration scripts."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "You can do so by creating a ",
          /* @__PURE__ */ jsx("code", { children: "prebundle.ts" }),
          " script:"
        ] }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `import { react } from '../src/server.ts';
react.prebundle()` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "prebundle.ts" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Than you can execute via ",
          /* @__PURE__ */ jsx("a", { href: TSX_URL, target: "_blank", children: "tsx" }),
          " (",
          /* @__PURE__ */ jsx("code", { children: "tsx prebundle.ts" }),
          ") or add it to your own build pipeline."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "When successfull, it will write the compiled ",
          /* @__PURE__ */ jsx("code", { children: ".js" }),
          " files in ",
          /* @__PURE__ */ jsx("code", { children: "./public/react-srv" }),
          ". Note it will create or overwrite the ",
          /* @__PURE__ */ jsx("code", { children: "react-srv" }),
          " folder, but it needs an existing ",
          /* @__PURE__ */ jsx("code", { children: "public" }),
          " folder to exist."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "You can control the output folder path and name with the ",
          /* @__PURE__ */ jsx("code", { children: "outPath" }),
          " and ",
          /* @__PURE__ */ jsx("code", { children: "outDir" }),
          " config value:"
        ] }),
        /* @__PURE__ */ jsxs("figcaption", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `const react = new ReactSrv({
  Document,
  srcPath: './input',
  outPath: './dist',
  outDir: 'hydration',
});` }) }),
          /* @__PURE__ */ jsx("figure", { children: "server.ts" })
        ] }),
        /* @__PURE__ */ jsxs("details", { className: "card", children: [
          /* @__PURE__ */ jsx("summary", { children: "Notes on accessibility" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "The output path, whether the ",
            /* @__PURE__ */ jsx("code", { children: "./public" }),
            " folder or any other folder, must be publicly asscessible, otherwise the generated HTML won't be able to load the hydration script."
          ] }),
          /* @__PURE__ */ jsxs("figure", { children: [
            /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `app.use(express.static('public'));` }) }),
            /* @__PURE__ */ jsx("figcaption", { children: "server.ts" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Select environment" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "One final step is to let ",
          PRODUCT_NAME,
          " know when you're running in a test environment and when in a production environment."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "You can use the ",
          /* @__PURE__ */ jsx("code", { children: "isProd" }),
          " config value to specify what environment to run in. The underlying logic is up to you."
        ] }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `const react = new ReactSrv({
  Document,
  srcPath: './input',
  outPath: './dist',
  outDir: 'hydration',
  isProd: process.env.NODE_ENV === 'production',
});` }) }),
          /* @__PURE__ */ jsx("figcaption", { children: "server.ts" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "When setup like this, ",
          PRODUCT_NAME,
          " will compile ",
          /* @__PURE__ */ jsx("code", { children: ".tsx" }),
          " files on the go in test mode and server pre-compiled ",
          /* @__PURE__ */ jsx("code", { children: ".js" }),
          " files from the bundle output folder in production model."
        ] }),
        /* @__PURE__ */ jsxs("details", { className: "card", children: [
          /* @__PURE__ */ jsx("summary", { children: "Small optimisation" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "In ",
            /* @__PURE__ */ jsx("code", { children: "prebundle.ts" }),
            " we've referenced the ",
            /* @__PURE__ */ jsx("code", { children: "react" }),
            " instance created in ",
            /* @__PURE__ */ jsx("code", { children: "server.ts" }),
            ". This setup works but can be improved by creating a separate ",
            /* @__PURE__ */ jsx("code", { children: "react-srv.ts" }),
            " (or any other name) file in which we export the instance by default:"
          ] }),
          /* @__PURE__ */ jsxs("figure", { children: [
            /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `export default new ReactSrv({
  Document,
  srcPath: './input',
  outPath: './dist',
  outDir: 'hydration',
  isProd: process.env.NODE_ENV === 'production',
});` }) }),
            /* @__PURE__ */ jsx("figcaption", { children: "react-srv.ts" })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "This also avoids having to create duplicate instances (one for the script, one for the server) and keeping them in sync." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Performance" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "In development mode we've seen that every time the ",
          /* @__PURE__ */ jsx("code", { children: "render" }),
          " method gets called, we generate both HTML and a hydration script and we send it over to the client browser."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "This is still pretty reasonable. The content that weighs the most is the React library itself, which needs to be present on every page for hydration and interactivity to work. But that's only loaded once and then cached locally by the browser." }),
        /* @__PURE__ */ jsxs("p", { children: [
          "By applying the tecniques above to prepare ",
          PRODUCT_NAME,
          " for production, we can gain extra performance."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "First, now on every request we'll send over ",
          /* @__PURE__ */ jsx("i", { children: "just" }),
          " the HTML, with a link to the hydration script."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Secondly, the hydration script needs to be loaded once, towards the end of the rendering loop. It too can be cached (e.g. by using ",
          /* @__PURE__ */ jsx("a", { href: NGINX_URL, target: "_blank", children: "nginx" }),
          " as a reverse proxy)"
        ] }),
        /* @__PURE__ */ jsx("p", { children: "Finally, React itself, just like in development mode, will be available async and cached by the browser." }),
        /* @__PURE__ */ jsx("p", { children: "In this way, in production we can squeeze as much performance as we can out of rendering React." })
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsxs("blockquote", { className: "card success", children: [
        /* @__PURE__ */ jsxs("p", { className: "group", children: [
          /* @__PURE__ */ jsxs(
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
          ),
          /* @__PURE__ */ jsx("b", { children: "Demo" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Check out a production ready demo ",
          /* @__PURE__ */ jsx("a", { href: PRODUCTION_DEMO_URL, target: "_blank", children: "here" }),
          "."
        ] })
      ] })
    ] })
  ] });
}

// docs-src/react-srv-hydrate-Production.tsx
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
