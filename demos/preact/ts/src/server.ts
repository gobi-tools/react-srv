import express from 'express';
import Page from './pages/Page';
import About from './pages/about/About';
import config from './react-srv.config';
import ReactSrv from 'react-srv';

const app = express()
app.use(express.static('public'));
const port = 3000

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
