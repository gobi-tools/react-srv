import express from 'express';
import ReactSrv from 'react-srv';
import Page from './Page';
import Document from './Document';

const app = express()
const port = 3000

const react = new ReactSrv({ Document });

app.get('/', (req, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
