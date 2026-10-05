import CodeHighlight from "../components/CodeHighlight";
import Header from "../components/Header";
import { ESM_URL, PRODUCT_NAME, REACT_DOM_NPM_URL, REACT_NPM_URL, REACT_VERSIONS_EARLIEST_URL, REACT_VERSIONS_LATEST_URL } from "../constants";

export default function Static() {
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
          be installed, which are used for building (transforming JSX into HTML and bundleing JS). 
        </p>
        <p>
          They are defined as peer dependencies, so NPM will choose the most suitable option, 
          but if you want to have precise control over the version you can install each manually:
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
          In dev mode the local version of React is sufficient. For production builds that's not the case anymore. 
          By default, {PRODUCT_NAME} uses <a href={ESM_URL} target="_blank">esm.sh</a> as a CDN to serve the <b>latest</b> React version.
        </p>
        <p>
          You can change that by modifying the config file or leave as is if you're happy with the default configuration.
        </p>
        <CodeHighlight lang={'javascript'}>{`export default {
  Document,
  ...other options
  reactLocation: 'https://esm.sh',
  reactVersion: 'latest', // or 18.3.0, for example
}`}</CodeHighlight>
      </section>
    </main>
  </>
}