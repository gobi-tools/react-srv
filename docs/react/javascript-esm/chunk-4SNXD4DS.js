import{a as r}from"./chunk-UABS3NKN.js";import{a as e}from"./chunk-7X4DHW36.js";import{jsx as a,jsxs as g}from"https://esm.sh/react@19.3.0/jsx-runtime";function p(t){return g("figure",{children:[a(r,{lang:"javascript",children:`app.get('/', (req, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});`}),a("figcaption",{children:`server.${t.language==="typescript"?"ts":"js"}`})]})}e(p,"SamplePropsServer");export{p as a};
