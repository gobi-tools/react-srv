export default function Index() {
  return <>
    <header>
      <div className="hero align-center">
        <h1>React Srv</h1>
        <p>
          React Srv is a small project that allows you to very quickly serve React pages from an existing route.
        </p>
        <p>
          <a href="https://github.com/gobi-tools/react-srv" target="_blank">
            <button>
              <img src="GitHub_Invertocat_White.svg" alt="GitHub Logo" />
              <span>Source</span>
            </button>
          </a>
        </p>
        <br />
      </div>
    </header>
    <main>
      <section>
        <p>
          All you need to do is define a React component in a .tsx file:
        </p>
        <figure>
          <pre><code>{`export default function Page() {
  return <>
    <h1>Hello, world!</h1>
    <p>Demo time</p>
  </>
}`}</code></pre>
          <figcaption>page.tsx</figcaption>
        </figure>
        <p>
          And React Srv will render it as static HTML you can send down the wire:
        </p>
        <figure>
          <pre><code>{`const app = express();
const react = new ReactSrv({});

app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page, {}));
});
`}</code></pre>
          <figcaption>server.tsx</figcaption>
        </figure>
      </section>

      <section>
        <h2>Setup</h2>
        <p>
          First, install the latest versions of the <code>react-srv</code> library and <a href="https://react.dev/" target="_blank">React</a>:
        </p>
        <figure>
          <pre><code>{`npm i react-srv

# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev`}</code></pre>
          <figcaption>install dependencies</figcaption>
        </figure>
        <p>
          Then add the following entries to your <code>.tsconfig</code>
        </p>
        <figcaption>
          <pre><code>{`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}`}</code></pre>
          <figcaption>tsconfig.json</figcaption>
        </figcaption>
      </section>
    </main>
  </>
}