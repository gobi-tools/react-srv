// Use CommonJS + @babel/register to allow requiring .jsx files on the server.
require('@babel/register')({ extensions: ['.js', '.jsx'] });

const express = require('express');
const ReactSrv = require('react-srv').default;

const Page = require('./pages/Page.jsx').default;
const About = require('./pages/about/About.jsx').default;

const app = express();
app.use(express.static('public'));

const config = require('./react-srv.config.js');
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
