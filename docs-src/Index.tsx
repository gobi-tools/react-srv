import Document from "./Document";

export default function Index() {
  return <>
    <header>
      <div className="hero align-center">
        <h1>React Srv</h1>
        <p>
          <b>
            React Srv is a small project that allows you to very quickly serve React pages from an existing route.
          </b>
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
          <pre><code>{`export default function Page(props: { title: string }) {
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
const react = new ReactSrv();

app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});
`}</code></pre>
          <figcaption>server.tsx</figcaption>
        </figure>
      </section>
    </main>
  </>
}