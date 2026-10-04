import {
  t4Templating
} from "./chunk-ZWJ46OV3.js";
import {
  csharp
} from "./chunk-5OXTG4QR.js";

// node_modules/refractor/lang/t4-cs.js
t4Cs.displayName = "t4-cs";
t4Cs.aliases = ["t4"];
function t4Cs(Prism) {
  Prism.register(csharp);
  Prism.register(t4Templating);
  Prism.languages.t4 = Prism.languages["t4-cs"] = Prism.languages["t4-templating"].createT4("csharp");
}

export {
  t4Cs
};
