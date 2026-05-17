import Header from "../components/Header";
import SettingsIcon from "../components/SettingsIcon";
import { DEMO_PROD_URL, PRODUCT_NAME } from "../constants";

export default function Production() {
  return <>
    <header>
      <Header />
    </header>
    <main>
      <section>
        <hgroup>
          <h2>Production</h2>
          <p>
            Every time the <code>render</code> method is called, {PRODUCT_NAME} transforms
            a JSX component into HTML and Javascript:
          </p>
        </hgroup>
        <figure>
          <pre><code>{`<html>
  <head><title>Page</title></head>
  <body>...</body>
  <script>... set initial props ...</script>
  <script type="module">... hydration script ... </script>
</html>`}</code></pre>
        </figure>
        <p>
          The markup is created from the component itself and the hydration script is
          created by reading the source file, <code>Page.tsx</code> or <code>Page.jsx</code>, from disk.
        </p>
        <p>
          This is good for development but it's not ideal for production, first because the
          source code might not be present at all and second because reading and compiling code
          every time is not very efficient.
        </p>
        <p>
          So, for production we can precompile the necessary javascript and have it ready to go.
        </p>
        <p>
          By default, {PRODUCT_NAME} looks in the <code>./src</code> folder to find React files and outputs
          compiled javascript in <code>./public/hydrate</code>.
          You can change this these locations as well as whether you're in dev or prod mode in the config file:
        </p>
        <figure>
          <pre><code>{`export default {
  document: Document,
  srcPath: './src', // default
  outPath: './public/hydrate', // default
  isProd: process.env.NODE_ENV === 'production',
}`}</code></pre>
        </figure>
        <p>
          Which you can reference via the <code>bundle</code> command, in <code>package.json</code>
        </p>
        <figure>
          <pre><code>{`...
"scripts": {
  "build": "react-srv bundle -f src/react-srv.config.ts && ... other build steps",
  "start": "NODE_ENV=production node dist/server.js"
},`}</code></pre>
        </figure>
        <p>
          The last thing you need to do is to make sure the <code>/public</code> folder is
          statically served and accessible and you're good to go.
        </p>
      </section>

      <hr />

      <div className="card success">
        <p className="group">
          <SettingsIcon />
          <b>Demos</b>
        </p>
        <p>
          Check out production ready demos for Typescript and Javascript <a href={DEMO_PROD_URL} target="_blank">here</a>.
        </p>
      </div>
    </main>
  </>
}