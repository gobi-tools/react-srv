import express from 'express';

import Page from './pages/Page.jsx';
import About from './pages/about/About.jsx';
import config from './react-srv.config.js';
import ReactSrv from 'react-srv';
import { h } from 'preact';
import { renderToString, renderToStaticMarkup } from 'preact-render-to-string';

const app = express();
app.use(express.static('public'));

// Hand react-srv the same preact instance these pages import: under tsx an
// ESM server and the library's own require() would otherwise load two
// copies of preact, and hooks state lives on this one.
const react = new ReactSrv({
  ...config,
  runtime: { h, renderToString, renderToStaticMarkup },
});

app.get('/', (req, res) => {
  const name = req.query['name'] ?? 'World';
  const html = react.render(Page, { name })
  return res.status(200).send(html);
});

app.get('/about', (req, res) => {
  const html = react.render(About);
  return res.status(200).send(html);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening: http://localhost:${port}`);
});
