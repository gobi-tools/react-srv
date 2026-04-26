import Header from "./components/Header";
import { DEMO_STATIC_URL, PAGE_PRODUCTION_URL, PRODUCT_NAME, SSG_URL } from "./constants";

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
          What you'll need is to create a new file. You can call it <code>prerender.ts</code> or <code>prerender.js</code>.
        </p>
        <figure>
          <pre><code>{`
const react = new ReactSrv({ 
  Document, 
  srcPath: './src',
  outPath: './public',
  outDir: 'hydrate',
});
react.prerender()`}</code></pre>
          {/* <figcaption>prerender.ts</figcaption> */}
        </figure>
        <p>
          We setup the <code>react</code> instance in a familiar way:
        </p>
        <ul>
          <li>Set a custom HTML Document (or use the default one)</li>
          <li>Tell the library where the source <code>.tsx</code> or <code>.jsx</code> pages are</li>
          <li>And where to output the resulting HTML and JS files</li>
        </ul>
        <p>
          And that's it! All you need to do is execute the file to have a full, statically generated, website.
        </p>
      </section>

      <section>
        <h2>Disable hydration</h2>
        <p>
          Prerendering, by default, generates both HTML and hydration JS. In this way statically generated
          websites can maintain most of the interactivity provided by React.
        </p>
        <p>
          If you don't want interactivity, you can disable hydration altogether:
        </p>
        <figure>
          <pre><code>{`const react = new ReactSrv({ 
  Document, 
  srcPath: './src',
  outPath: './public',
  hydrate: false,
});
react.prerender()`}</code></pre>
          {/* <figcaption>prerender.ts</figcaption> */}
        </figure>
        <p>
          In this way, only HTML files will be generated. A trully static website!
        </p>
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
          Check out a statically generated site <a href={DEMO_STATIC_URL} target="_blank">here</a>.
        </p>
      </blockquote>
    </main>
  </>
}