# React Srv

Add React to your server side rendered or statically generated website.

All you need to do is define a React component as a default export of a `.tsx` or `.jsx` file of the same name:

```js
export default function Page() {
  return <>
    <h1>Hello, world!</h1>
  </>
}
```

Optionally add a `react-srv.config.ts` or `.js` file:

```js
export default {}
```

And React Srv will render it as static HTML you can send down the wire:

```js
import config from './react-srv.config';

const app = express();
const react = new ReactSrv(config);

app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});
```

You can find out more [here](https://gobi-tools.github.io/react-srv/).

NPM package [here](https://www.npmjs.com/package/react-srv).