import { RouteMaster } from "./common/routes";
import { useRoute } from "./common/useRoute";
import GitHubIcon from "./components/GitHubIcon";
import SetupSection from "./components/SetupSection";
import { PRODUCT_NAME, REACT_COMPONENTS_URL, REACT_HOOKS_URL, REACT_PROPS_URL, SSG_URL, SSR_URL } from "./constants";

export default function Index() {
  const route = useRoute();

  return <>
    <header>
      <div className="align-center">
        <hgroup>
          <h1>{PRODUCT_NAME}</h1>
          <p>
            Add React to your server side rendered or statically generated website.
          </p>
        </hgroup>
        <p>
          <a href="https://github.com/gobi-tools/react-srv" target="_blank">
            <button>
              <GitHubIcon />
              <span>Source</span>
            </button>
          </a>
          <a href={RouteMaster.demo(route)} target="_blank">
            <button type="reset">
              Demo
            </button>
          </a>
        </p>
      </div>
    </header>
    <main>
      <section>
        <p>
          All you need to do is define a React component as a default export of a <code>.tsx</code> or <code>.jsx</code> file of the same name:
        </p>
        <figure>
          <pre><code>{`export default function Page() {
  return <>
    <h1>Hello, world!</h1>
  </>
}`}</code></pre>
        </figure>
        <p>
          Optionally add a <code>react-srv.config.ts</code> or <code>.js</code> file:
        </p>
        <figure>
          <pre><code>{`export default {}`}</code></pre>
        </figure>
        <p>
          And {PRODUCT_NAME} will render it as static HTML you can send down the wire:
        </p>
        <figure>
          <pre><code>{`const app = express();
const react = new ReactSrv(config);

app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});
`}</code></pre>
        </figure>
      </section>

      <section>
        <hgroup>
          <h2>Documents</h2>
          <p>
            {PRODUCT_NAME} will wrap all components in a default HTML document. You may create a custom one to
            specify titles, stylesheets, scaling, etc.
          </p>
        </hgroup>
        <figure>
          <pre><code>{`export default function Document({ children }) {
  return <html lang="en">
    <head>
      <title>Title</title>
      {/*... all other meta tags, link tags, etc */}
    </head>
    <body>
      {children}
    </body>
  </html>
}`}</code></pre>
        </figure>
        <p>
          You can reference it in the config file:
        </p>
        <figure>
          <pre><code>{`export default { Document };`}</code></pre>
        </figure>
      </section>

      <section>
        <hgroup>
          <h2>Components</h2>
          <p>
            Just like in <a href={REACT_COMPONENTS_URL} target="_blanl">any React app</a>,
            you can split a large page into multiple components.
          </p>
        </hgroup>
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
        </figure>
      </section>

      <section>
        <hgroup>
          <h2>Props</h2>
          <p>
            Pages and components don't need to be static. You can define any <a href={REACT_PROPS_URL} target="_blank">props</a> ...
          </p>
        </hgroup>
        <figure>
          <pre><code>{`export default function Page(props) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
  </>
}`}</code></pre>
        </figure>
        <p>
          ... and pass them to the rendering function.
        </p>
        <figure>
          <pre><code>{`app.get('/', (req, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});`}</code></pre>
        </figure>
      </section>

      <section>
        <hgroup>
          <h2>Hooks</h2>
          <p>
            For interactivity you can use all types of <a href={REACT_HOOKS_URL} target="_blank">React hooks</a>, like <code>useState</code> or <code>useEffect</code>.
          </p>
        </hgroup>
        <figure>
          <pre><code>{`function Button () {
  const [clicks, setClicks] = useState(0);

  return <p>
    <button onClick={() => setClicks(clicks+1)}>Clicks {clicks}</button>
  </p>

  ...

  export default function Page(props) {
    return <>
      <h1>Hello, {props.name}!</h1>
      <Greeting/>
      <Button/>
    </>
  }
}`}</code></pre>
        </figure>
      </section>

      <SetupSection />

      <hr />

      <section>
        <div className="row">
          <div>
            <div className="card">
              <p>
                <b>Production</b>
              </p>
              <p>
                Look at best practices for <a href={SSR_URL} target="_blank">server side rendering (SSR)</a> in production.
              </p>
              <p>
                <a href={RouteMaster.production(route)}>Learn more</a>
              </p>
            </div>
          </div>
          <div>
            <div className="card">
              <p>
                <b>SSG</b>
              </p>
              <p>
                {PRODUCT_NAME} can directly output HTML for <a href={SSG_URL} target="_blank">static site generation (SSG)</a>.
              </p>
              <p>
                <a href={RouteMaster.stat(route)}>Learn more</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </>
}