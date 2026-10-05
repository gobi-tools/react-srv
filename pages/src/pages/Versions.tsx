import { RouteMaster } from "../common/routes";
import { useRoute } from "../common/useRoute";
import CodeHighlight from "../components/CodeHighlight";
import Header from "../components/Header";
import { ESM_URL, NODE_NPM_PEER_DEPS, PRODUCT_NAME, REACT_DOM_NPM_URL, REACT_NPM_URL, REACT_VERSIONS_EARLIEST_URL, REACT_VERSIONS_LATEST_URL } from "../constants";

export default function Static() {
  const route = useRoute();

  return <>
    <header>
      <Header />
    </header>
    <main>
      <section>
        <hgroup>
          <h2>React Support</h2>
          <p>
            {PRODUCT_NAME} can work with different versions of React,
            starting from <a href={REACT_VERSIONS_EARLIEST_URL} target="_blank">v18.0.0</a> up until the <a href={REACT_VERSIONS_LATEST_URL} target="_blank">latest</a>.
          </p>
        </hgroup>
        <p>
          {PRODUCT_NAME} also requires the <a href={REACT_NPM_URL} target="_blank">react</a> and <a href={REACT_DOM_NPM_URL} target="_blank">react-dom</a> packages 
          to be installed.
        </p>
        <p>
          Whilst they are setup as <a href={NODE_NPM_PEER_DEPS} target="_blank">peer dependencies</a> (so NPM will choose the most suitable option), 
          it's always good to pin the version you want explicitly:
        </p>

        <CodeHighlight lang={'bash'}>{`npm i react@version
npm i react-dom@version

# optionally install the associated types
npm i @types/react@version --save-dev
npm i @types/react-dom@version --save-dev`}</CodeHighlight>

        <article>
          <p role="group">
            <b>Careful</b>
          </p>
          <p>
            Make sure the <code>react</code> and <code>react-dom</code> versions are identical.
          </p>
        </article>
        <p>
          Furthermore, {PRODUCT_NAME} doesn't bundle React in any of the JS scripts it outputs, 
          either in <a href={RouteMaster.production(route)}>SSR</a> or <a href={RouteMaster.stat(route)}>SSG</a> mode. 
        </p>
        <p>
          It instead references React from a CDN, <a href={ESM_URL} target="_blank">esm.sh</a> by default. 
          You can change this in the config:
        </p>
        <CodeHighlight lang={'javascript'}>{`export default {
  Document,
  ...other options
  reactLocation: 'https://esm.sh', // or your own location
}`}</CodeHighlight>
        <p>
          By doing this we ensure we serve as little JS as possible to hydrate. React itself will usually 
          only get loaded once, for the first page that a user might see. After that it should be cached by the browser.
        </p>
      </section>
    </main>
  </>
}