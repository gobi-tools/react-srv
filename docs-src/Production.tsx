import { NGINX_URL, PAGE_HOME_URL, PRODUCT_NAME, PRODUCTION_DEMO_URL, REACT_HYDRATION_URL, REACT_RENDER_URL, TSX_URL } from "./constants";

export default function Production() {
  return <>
    <header>
      <nav>
        <ul>
          <li>
            <a href={PAGE_HOME_URL}>Home</a>
          </li>
        </ul>
      </nav>

    </header>
    <main>
      <section>
        <h2>Anatomy of a request</h2>
        <p>
          Every time this example endpoint is hit ...
        </p>
        <figure>
          <pre><code>{`app.get('/', (_, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});`}</code></pre>
          <figcaption>server.ts</figcaption>
        </figure>
        <p>
          ... there's a number of things {PRODUCT_NAME} does inside the <code>render</code> method:
          <ol>
            <li>First, it <a href={REACT_RENDER_URL} target="_blank">creates static markup</a> (that includes initial props)</li>
            <li>Then, it creates a <a href={REACT_HYDRATION_URL} target="_blank">hydration</a> script (for subsequent interactivity)</li>
          </ol>
        </p>
        <p>
          Therefore, at each request, the final payload consists of both HTML and Javascript:
        </p>
        <figure>
          <pre><code>{`<html>
  <head><title>Page</title></head>
  <body>...</body>
  <script>... set initial props ...</script>
  <script type="module">... hydration script ... </script>
</html>`}</code></pre>
          <figcaption>react.render(Page)</figcaption>
        </figure>
        <p>
          The static markup is created at runtime from the component - <code>{`<Page/>`}</code> - itself.
        </p>
        <p>
          The hydration script is also created at runtime by reading the file - <code>{`Page.tsx`}</code> - from disk.
        </p>
        <p>
          In order to know where to find the file, {PRODUCT_NAME} needs to know where to look. By defualt it looks in the <code>/src</code> folder.
          This can be changed by specifying the <code>srcPath</code> parameter when initialising the shared object.
        </p>
        <figure>
          <pre><code>{`const react = new ReactSrv({
  Document,
  srcPath: './input',
});`}</code></pre>
          <figcaption>server.ts</figcaption>
        </figure>
      </section>

      <section>
        <h2>Prebundling</h2>
        <p>
          For small project or for development, reading from disk might be good enough. It does require the source always be
          present, however, and it does mean the same code will be compiled over and over again, at each request.
        </p>
        <p>
          For production builds, it's always best to <b>prebundle</b> all the hydration scripts.
        </p>
        <p>
          You can do so by creating a <code>prebundle.ts</code> script:
        </p>
        <figure>
          <pre><code>{`import { react } from '../src/server.ts';
react.prebundle()`}</code></pre>
          <figcaption>prebundle.ts</figcaption>
        </figure>
        <p>
          Than you can execute via <a href={TSX_URL} target="_blank">tsx</a> (<code>tsx prebundle.ts</code>) or add it to your own build pipeline.
        </p>
        <p>
          When successfull, it will write the compiled <code>.js</code> files in <code>./public/react-srv</code>. Note it will
          create or overwrite the <code>react-srv</code> folder, but it needs an existing <code>public</code> folder to exist.
        </p>
        <p>
          You can control the output folder path and name with the <code>outPath</code> and <code>outDir</code> config value:
        </p>
        <figcaption>
          <pre><code>{`const react = new ReactSrv({
  Document,
  srcPath: './input',
  outPath: './dist',
  outDir: 'hydration',
});`}</code></pre>
          <figure>server.ts</figure>
        </figcaption>
        <details className="card">
          <summary>Notes on accessibility</summary>
          <p>
            The output path, whether the <code>./public</code> folder or any other folder, must be publicly asscessible, otherwise
            the generated HTML won't be able to load the hydration script.
          </p>
          <figure>
            <pre><code>{`app.use(express.static('public'));`}</code></pre>
            <figcaption>server.ts</figcaption>
          </figure>
        </details>
      </section>

      <section>
        <h2>Select environment</h2>
        <p>
          One final step is to let {PRODUCT_NAME} know when you're running in a test environment and when in a production environment.
        </p>
        <p>
          You can use the <code>isProd</code> config value to specify what environment to run in. The underlying logic is up to you.
        </p>
        <figure>
          <pre><code>{`const react = new ReactSrv({
  Document,
  srcPath: './input',
  outPath: './dist',
  outDir: 'hydration',
  isProd: process.env.NODE_ENV === 'production',
});`}</code></pre>
          <figcaption>server.ts</figcaption>
        </figure>
        <p>
          When setup like this, {PRODUCT_NAME} will compile <code>.tsx</code> files on the go in test mode and server pre-compiled <code>.js</code> files
          from the bundle output folder in production model.
        </p>
        <details className="card">
          <summary>Small optimisation</summary>
          <p>
            In <code>prebundle.ts</code> we've referenced the <code>react</code> instance created in <code>server.ts</code>.
            This setup works but can be improved by creating a separate <code>react-srv.ts</code> (or any other name) file in which
            we export the instance by default:
          </p>
          <figure>
            <pre><code>{`export default new ReactSrv({
  Document,
  srcPath: './input',
  outPath: './dist',
  outDir: 'hydration',
  isProd: process.env.NODE_ENV === 'production',
});`}</code></pre>
            <figcaption>react-srv.ts</figcaption>
          </figure>
          <p>
            This also avoids having to create duplicate instances (one for the script, one for the server) and keeping them in sync.
          </p>
        </details>
      </section>

      <section>
        <h2>Performance</h2>
        <p>
          In development mode we've seen that every time the <code>render</code> method gets called,
          we generate both HTML and a hydration script and we send it over to the client browser.
        </p>
        <p>
          This is still pretty reasonable. The content that weighs the most is the React library itself, which
          needs to be present on every page for hydration and interactivity to work. But that's only loaded
          once and then cached locally by the browser.
        </p>
        <p>
          By applying the tecniques above to prepare {PRODUCT_NAME} for production, we can gain extra performance.
        </p>
        <p>
          First, now on every request we'll send over <i>just</i> the HTML, with a link to the hydration script.
        </p>
        <p>
          Secondly, the hydration script needs to be loaded once, towards the end of the rendering loop.
          It too can be cached (e.g. by using <a href={NGINX_URL} target="_blank">nginx</a> as a reverse proxy)
        </p>
        <p>
          Finally, React itself, just like in development mode, will be available async and cached by the browser.
        </p>
        <p>
          In this way, in production we can squeeze as much performance as we can out of rendering React.
        </p>
      </section>

      <hr/>

      <blockquote className="card success">
        <p className="group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <b>Demo</b>
        </p>
        <p>
          Check out a production ready demo <a href={PRODUCTION_DEMO_URL} target="_blank">here</a>.
        </p>
      </blockquote>
    </main>
  </>
}