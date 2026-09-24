import Code from "../components/Code";
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
          <Code lang={'xml'}>{`<html>
  <head><title>Page</title></head>
  <body>...</body>
  <script>... set initial props ...</script>
  <script type="module">... inline hydration script ... </script>
</html>`}</Code>
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
          So, for production we can <b>precompile</b> the necessary javascript and have it ready to go.
        </p>
        <p>
          By default, {PRODUCT_NAME} looks in the <code>./src</code> folder to find React files and outputs
          compiled javascript in <code>./public/hydrate</code>.
        </p>
        <p>
          You can change these locations, as well as whether you're in dev or prod mode, in the config file:
        </p>
        <p>
          You can also, separately, choose to minify the code or not.
        </p>
        <figure>
          <Code lang={'javascript'}>{`export default {
  Document,
  srcPath: './src', // default
  outPath: './public/hydrate', // default
  isProd: process.env.NODE_ENV === 'production', // serve inline or precompiled code
  minify: true, // minify JS or not
}`}</Code>
        </figure>
        <p>
          You can reference the config file in the <code>bundle</code> command in <code>package.json</code>
        </p>
        <figure>
          <Code lang={'json'}>{`...
"scripts": {
  "build": "react-srv bundle -f src/react-srv.config.ts && ... other build steps",
  "start": "NODE_ENV=production node dist/server.js"
},`}</Code>
        </figure>
        <p>
          The last thing you need to do is to make sure the <code>/public</code> folder is
          statically served and accessible and you're good to go.
        </p>

        <article className="success">
        <p role="group">
          <SettingsIcon />
          <b>Example</b>
        </p>
        <p>
          Check out production ready example for Typescript and Javascript <a href={DEMO_PROD_URL} target="_blank">here</a>.
        </p>
      </article>
      </section>
    </main>
  </>
}