import { RouteMaster } from "./common/routes";
import { useRoute } from "./common/useRoute";
import Code from "./components/Code";
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
        <p className="row align-center disable-mobile">
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
          <Code lang={'javascript'}>{`export default function Page() {
  return <>
    <h1>Hello, world!</h1>
  </>
}`}</Code>
        </figure>
        <p>
          Optionally add a <code>react-srv.config.ts</code> or <code>.js</code> file:
        </p>
        <figure>
          <Code lang={'javascript'}>{`export default {}`}</Code>
        </figure>
        <p>
          And {PRODUCT_NAME} will render it as static HTML you can send down the wire:
        </p>
        <figure>
          <Code lang={'javascript'}>{`import config from './react-srv.config';

const app = express();
const react = new ReactSrv(config);

app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});
`}</Code>
        </figure>
      </section>

      <section>
        <hgroup>
          <h2>Documents</h2>
          <p>
            {PRODUCT_NAME} will wrap all components in a default HTML document. You can create a custom one to
            specify titles, stylesheets, scaling, etc.
          </p>
        </hgroup>
        <figure>
          <Code lang={'javascript'}>{`export default function Document({ children }) {
  return <html lang="en">
    <head>
      <title>Title</title>
      {/*... all other meta tags, link tags, etc */}
    </head>
    <body>
      {children}
    </body>
  </html>
}`}</Code>
        </figure>
        <p>
          You can reference it in the config file:
        </p>
        <figure>
          <Code lang={'javascript'}>{`import Document from './Document';

export default { Document };`}</Code>
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
          <Code lang={'javascript'}>{`function Greeting() { 
  return <p>Today is a fine day!</p>
}

export default function Page() {
  return <>
    <h1>Hello, world!</h1>
    <Greeting/>
  </>
}`}</Code>
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
          <Code lang={'javascript'}>{`export default function Page(props) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
  </>
}`}</Code>
        </figure>
        <p>
          ... and pass them to the rendering function.
        </p>
        <figure>
          <Code lang={'javascript'}>{`app.get('/', (req, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});`}</Code>
        </figure>
      </section>

      <section>
        <hgroup>
          <h2>Hooks</h2>
          <p>
            For interactivity you can use all types of <a href={REACT_HOOKS_URL} target="_blank">React hooks</a>, like <code>useState</code>, <code>useEffect</code>, etc.
          </p>
        </hgroup>
        <figure>
          <Code lang={'javascript'}>{`function Button () {
  const [clicks, setClicks] = useState(0);

  return <p>
    <button onClick={() => setClicks(clicks+1)}>Clicks {clicks}</button>
  </p>
}

...

export default function Page(props) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
    <Button/>
  </>
}`}</Code>
        </figure>
      </section>

      <section>
        <SetupSection />
        <article>
          <p>
            <b>Production</b>
          </p>
          <p>
            Look at best practices for <a href={SSR_URL} target="_blank">server side rendering (SSR)</a> in production.
          </p>
          <p>
            <a href={RouteMaster.production(route)}>Learn more</a>
          </p>
        </article>
        <article>
          <p>
            <b>SSG</b>
          </p>
          <p>
            {PRODUCT_NAME} can directly output HTML for <a href={SSG_URL} target="_blank">static site generation (SSG)</a>.
          </p>
          <p>
            <a href={RouteMaster.stat(route)}>Learn more</a>
          </p>
        </article>
      </section>
    </main>
  </>
}