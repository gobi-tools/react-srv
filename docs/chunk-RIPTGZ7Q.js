import {
  HomeIcon
} from "./chunk-6VOJJRER.js";
import {
  RouteMaster,
  useRoute
} from "./chunk-DO3KOFTT.js";

// src/components/Header.tsx
import { jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Header() {
  const route = useRoute();
  return /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: RouteMaster.home(route), children: [
    /* @__PURE__ */ jsx(HomeIcon, {}),
    /* @__PURE__ */ jsx("span", { children: "Home" })
  ] }) }) }) });
}

export {
  Header
};
