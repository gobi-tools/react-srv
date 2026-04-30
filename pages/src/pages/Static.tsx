import Header from "./../components/Header";
import SettingsIcon from "./../components/SettingsIcon";
import { DEMO_STATIC_URL, PAGE_PRODUCTION_URL, PRODUCT_NAME, SSG_URL } from "./../constants";

export default function Static() {
  return <>
    <header>
      <Header />
    </header>
    <main>
      <section>
        <h2>Static site generation (SSG)</h2>
        <p>
          {PRODUCT_NAME} can be used for direct static site generation (<a href={SSG_URL} target="_blank">SSG</a>).
          If you've read the section on <a href={PAGE_PRODUCTION_URL}>getting to production</a>, then you're already ninety percent there.
        </p>
        <p>
          You can specify the source and output destinations and whether you want to keep javascript hydration (default) 
          or disable it completely for a pure static experiece, in the config file:
        </p>
        {/* <p>
          You can keep the same <code>react-srv.config.ts</code> (or <code>.js</code>) file. Additionally you can choose to
          enable javascript hydration (default) or disable it for a pure static experience:
        </p> */}
        <figure>
          <pre><code>{`export default {
  document: Document,
  srcPath: './src',
  outPath: './public',
  hydrate: true, // or false
}`}</code></pre>
        </figure>
        <p>
          Then you can add the following step to your build pipeline in <code>package.json</code>:
        </p>
        <figure>
          <pre><code>{`...
"scripts": {
  "render": "react-srv render -f src/react-srv.config.ts && ... other build steos"
},`}</code></pre>
        </figure>
        <p>
          The last thing you need to do is to make sure the <code>/public</code> folder is
          accessible on the internet and you're good to go.
        </p>
      </section>

      <hr />

      <blockquote className="card success">
        <p className="group">
          <SettingsIcon />
          <b>Demo</b>
        </p>
        <p>
          The source for this documentation is a statically generated site. Check it out <a href={DEMO_STATIC_URL} target="_blank">here</a>.
        </p>
      </blockquote>
    </main>
  </>
}