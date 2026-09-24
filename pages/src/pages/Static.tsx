import { RouteMaster } from "../common/routes";
import { useRoute } from "../common/useRoute";
import Code from "../components/Code";
import Header from "./../components/Header";
import SettingsIcon from "./../components/SettingsIcon";
import { DEMO_STATIC_URL, PRODUCT_NAME, SSG_URL } from "./../constants";

export default function Static() {
  const route = useRoute();

  return <>
    <header>
      <Header />
    </header>
    <main>
      <section>
        <hgroup>
          <h2>Static site generation (SSG)</h2>
          <p>
            {PRODUCT_NAME} can be used for direct static site generation (<a href={SSG_URL} target="_blank">SSG</a>).
            If you've read the section on <a href={RouteMaster.production(route)}>getting to production</a>, then you're already ninety percent there.
          </p>
        </hgroup>
        <p>
          You can specify the source and output destinations and whether you want to keep javascript hydration (default)
          or disable it completely for a pure static experiece, in the config file:
        </p>
        <figure>
          <Code lang={'javascript'}>{`export default {
  Document,
  srcPath: './src',
  outPath: './public',
  hydrate: true, // or false
}`}</Code>
        </figure>
        <p>
          Then you can add the following step to your build pipeline in <code>package.json</code>:
        </p>
        <figure>
          <Code lang={'json'}>{`...
"scripts": {
  "render": "react-srv render -f src/react-srv.config.ts && ... other build steps"
},`}</Code>
        </figure>
        <p>
          The last thing you need to do is to make sure the <code>/public</code> folder is
          accessible on the internet and you're good to go.
        </p>

        <article className="success">
          <p role="group">
            <SettingsIcon />
            <b>Example</b>
          </p>
          <p>
            The source for this documentation is a statically generated site. Check it out <a href={DEMO_STATIC_URL} target="_blank">here</a>.
          </p>
        </article>
        <article>
          <p role="group">
            <b>Note</b>
          </p>
          <p>
            If you turn off hydration, only HTML will be generated. Any interactivity that's due to React will not work.
          </p>
        </article>
      </section>
    </main>
  </>
}