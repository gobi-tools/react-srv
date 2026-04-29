import express from 'express';

import Page from './pages/Page.jsx';
import About from './pages/about/About.jsx';
import config from './react-srv.config.js';
import ReactSrv from 'react-srv';

const app = express();
app.use(express.static('public'));

const react = new ReactSrv(config);

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
