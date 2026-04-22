import { DEMO_SIMPLE_URL, PAGE_PRODUCTION_URL, PRODUCT_NAME, REACT_COMPONENTS_URL, REACT_HOOKS_URL, REACT_PROPS_URL, REACT_URL } from "./constants";

export default function Index() {
  return <>
    <header>
      <div className="hero align-center">
        <h1>{PRODUCT_NAME}</h1>
        <p>
          {PRODUCT_NAME} is a small project that allows you to quickly serve React pages from an existing route.
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
      {/* simplest demo */}
      <section>
        <p>
          All you need to do is define a React component and save it in a <code>.tsx</code> file of the same name:
        </p>
        <figure>
          <pre><code>{`export default function Page() {
  return <>
    <h1>Hello, world!</h1>
  </>
}`}</code></pre>
          <figcaption>Page.tsx</figcaption>
        </figure>
        <p>
          And {PRODUCT_NAME} will render it as static HTML you can send down the wire:
        </p>
        <figure>
          <pre><code>{`const app = express();
const react = new ReactSrv({});

app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});
`}</code></pre>
          <figcaption>server.ts</figcaption>
        </figure>
      </section>

      {/* install */}
      <section>
        <h2>Setup</h2>
        <p>
          First, install the latest versions of the <code>react-srv</code> library and <a href={REACT_URL} target="_blank">React</a>:
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

      {/* documents */}
      <section>
        <h2>Documents</h2>
        <p>
          {PRODUCT_NAME} will wrap all components in a default HTML document. You may create a custom one ...
        </p>
        <figure>
          <pre><code>{`export default function Document({ children }) {
  return <html lang="en">
    <head>
      <title>My document</title>
      {/*... all other meta tags, link tags, etc */}
    </head>
    <body>
      {children}
    </body>
  </html>
}`}</code></pre>
          <figcaption>Document.tsx</figcaption>
        </figure>
        <p>
          ... which you can reference when creating the <code>ReactSrv</code> instance:
        </p>
        <figure>
          <pre><code>{`import Document from "./Document";

const react = new ReactSrv({ Document });`}</code></pre>
          <figcaption>server.ts</figcaption>
        </figure>
        <p>
          In this way you  can even have different documents for different routes, if you wish.
        </p>
      </section>

      {/* components */}
      <section>
        <h2>Components</h2>
        <p>
          Just like in <a href={REACT_COMPONENTS_URL} target="_blanl">any React app</a>,
          you can split a big page into multiple components.
        </p>
        <figure>
          <pre><code>{`function Greeting() { 
  return <p>Today is a fine day!</p>
}

export default function Page() {
  return <>
    <h1>Hello, world!</h1>
    <Greeting/>
  </>
}`}</code></pre>
          <figcaption>Page.tsx</figcaption>
        </figure>
      </section>

      {/* props */}
      <section>
        <h2>Props</h2>
        <p>
          Pages and components don't need to be static. You can define any <a href={REACT_PROPS_URL} target="_blank">props</a> ...
        </p>
        <figure>
          <pre><code>{`export default function Page(props: { name: string }) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
  </>
}`}</code></pre>
          <figcaption>Page.tsx</figcaption>
        </figure>
        <p>
          ... and pass them to the rendering function.
        </p>
        <figure>
          <pre><code>{`app.get('/', (req, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});`}</code></pre>
          <figcaption>server.ts</figcaption>
        </figure>
      </section>

      {/* internal state / hooks / serving dynami content  */}
      <section>
        <h2>Hooks</h2>
        <p>
          For interactivity you can use all types of <a href={REACT_HOOKS_URL} target="_blank">React hooks</a>, like <code>useState</code> or <code>useEffect</code>.
        </p>
        <figure>
          <pre><code>{`function Button () {
  const [clicks, setClicks] = useState(0);

  return <p>
    <button onClick={() => setClicks(clicks+1)}>Clicks {clicks}</button>
  </p>

  ...

  export default function Page(props: { name: string }) {
    return <>
      <h1>Hello, {props.name}!</h1>
      <Greeting/>
      <Button/>
    </>
  }
}`}</code></pre>
          <figcaption>Page.tsx</figcaption>
        </figure>
      </section>

      <hr />

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
          Check out a simple demo <a href={DEMO_SIMPLE_URL} target="_blank">here</a>.
        </p>
      </blockquote>

      <section>
        <div className="row">
          <div>
            <div className="card">
              <p>
                <b>Ready for production</b>
              </p>
              <p>
                Look at best practices when
                deploying {PRODUCT_NAME} to production.
              </p>
              <p>
                <a href={PAGE_PRODUCTION_URL}>Learn more</a>
              </p>
            </div>
          </div>
          <div>
            <div className="card">
              <p>
                <b>Static websites</b>
              </p>
              <p>
                {PRODUCT_NAME} can also output static markup, with
                or without hydration.
              </p>
              <p>
                <a href="">Learn more</a>
              </p>
            </div>
          </div>
          <div>
            <div className="card">
              <p>
                <b>Advanced state</b>
              </p>
              <p>
                You can use libraries like <a href="">Zustand</a> to keep
                track of global state.
              </p>
              <p>
                <a href="">Learn more</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </>
}