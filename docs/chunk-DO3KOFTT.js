// src/common/routes.ts
var PAGE_HOME_URL = "index.html";
var PAGE_PRODUCTION_URL = "pages/production.html";
var PAGE_STATIC_URL = "pages/static.html";
var PAGE_DEMO_URL = "pages/demo.html";
var RouteMaster = class _RouteMaster {
  static baseRoute = "";
  static home(domain) {
    const base = _RouteMaster.getBase(domain);
    return `${base}${PAGE_HOME_URL}`;
  }
  static production(domain) {
    const base = _RouteMaster.getBase(domain);
    return `${base}${PAGE_PRODUCTION_URL}`;
  }
  static stat(domain) {
    const base = _RouteMaster.getBase(domain);
    return `${base}${PAGE_STATIC_URL}`;
  }
  static demo(domain) {
    const base = _RouteMaster.getBase(domain);
    return `${base}${PAGE_DEMO_URL}`;
  }
  static getBase(domain) {
    if (!domain) return "/";
    return domain === "" ? "/" : `/${domain}/`;
  }
};

// src/constants.ts
var PRODUCT_NAME = "React Srv";
var REACT_URL = "https://react.dev/";
var REACT_COMPONENTS_URL = "https://react.dev/learn#components";
var REACT_PROPS_URL = "https://react.dev/learn/passing-props-to-a-component";
var REACT_HOOKS_URL = "https://react.dev/reference/react/hooks";
var TSX_URL = "https://github.com/privatenumber/tsx";
var BABEL_URL = "https://babeljs.io/";
var DEMO_TS_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/ts";
var DEMO_JS_ESM_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/js-esm";
var DEMO_JS_CJS_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos/js-cjs";
var DEMO_STATIC_URL = "https://github.com/gobi-tools/react-srv/tree/main/pages";
var DEMO_PROD_URL = "https://github.com/gobi-tools/react-srv/tree/main/demos";
var SSR_URL = "https://developer.mozilla.org/en-US/docs/Glossary/SSR";
var SSG_URL = "https://en.wikipedia.org/wiki/Static_site_generator";
var PUB_SUBDOMAIN = "react-srv";

// src/common/useRoute.ts
import { useState, useEffect } from "https://esm.sh/react@19.2.0";
function useRoute() {
  const [route, setRoute] = useState(void 0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const baseRoute = path.includes(PUB_SUBDOMAIN) ? PUB_SUBDOMAIN : "";
      setRoute(baseRoute);
      console.log("Test", "setting route to", baseRoute);
    }
  }, []);
  return route;
}

export {
  RouteMaster,
  PRODUCT_NAME,
  REACT_URL,
  REACT_COMPONENTS_URL,
  REACT_PROPS_URL,
  REACT_HOOKS_URL,
  TSX_URL,
  BABEL_URL,
  DEMO_TS_URL,
  DEMO_JS_ESM_URL,
  DEMO_JS_CJS_URL,
  DEMO_STATIC_URL,
  DEMO_PROD_URL,
  SSR_URL,
  SSG_URL,
  useRoute
};
