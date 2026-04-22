import express from 'express';
import Page from './Page';
import react from './react-srv';

const app = express()
const port = 3000

app.get('/', (req, res) => {
  const name = req.query['name'];
  const html = react.render(Page, { name })
  return res.status(200).send(html);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
