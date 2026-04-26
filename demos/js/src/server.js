// Use CommonJS + @babel/register to allow requiring .jsx files on the server.
require('@babel/register')({ extensions: ['.js', '.jsx'] });

const express = require('express');
const ReactSrv = require('react-srv').default;

const react = new ReactSrv({
  outPath: './public',
  srcPath: './src',
});

const Page = require('./pages/Page.jsx').default;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  const html = react.render(Page);
  return res.status(200).send(html);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening: http://localhost:${port}`);
});
