import { BABEL_URL, DEMO_JS_CJS_URL, DEMO_JS_ESM_URL, DEMO_TS_URL, REACT_URL, TSX_URL } from "../constants";
import { useState } from "react";
import SettingsIcon from "./SettingsIcon";
import { useRoute } from "../common/useRoute";
import { RouteMaster } from "../common/routes";

type TEnvironment = 'ts' | 'js-esm' | 'js-cjs';

function TypescriptSetup() {
  const route = useRoute();

  return <>
    <p>
      First, install the latest versions of <a href={RouteMaster.home(route)}>react-srv</a> and <a href={REACT_URL} target="_blank">React</a>.
    </p>
    <figure>
      <pre><code>{`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# optionally install the associated types
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev`}</code></pre>
    </figure>
    <p>
      Then, to make sure React is defined correctly at runtime, add the following entries to your <code>tsconfig.json</code> file.
    </p>
    <figure>
      <pre><code>{`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}`}</code></pre>
    </figure>
    <div className="card success">
      <p className="group">
        <SettingsIcon />
        <b>Demo</b>
      </p>
      <p>
        Check out a fully set up TypeScript project <a href={DEMO_TS_URL} target="_blank">here</a>.
      </p>
    </div>
  </>
}

function JSESMSetup() {
  const route = useRoute();

  return <>
    <p>
      First, install the latest versions of <a href={RouteMaster.home(route)}>react-srv</a>, <a href={REACT_URL} target="_blank">React</a> and <a href={TSX_URL} target="_blank">tsx</a>.
    </p>
    <figure>
      <pre><code>{`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install tsx as a dev dependency
npm i tsx --save-dev`}</code></pre>
    </figure>
    <p>
      Then, to make sure React is defined correctly at runtime, you'll need to add a <code>tsconfig.json</code> file.
    </p>
    <figure>
      <pre><code>{`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}`}</code></pre>
    </figure>
    <p>
      Finally, you'll need to run your app with <code>tsx</code> so you avoid the <code className="error">Unknown file extension ".jsx"</code> error.
    </p>
    <figure>
      <pre><code>{`tsx src/server.js`}</code></pre>
    </figure>
    <div className="card success">
      <p className="group">
        <SettingsIcon />
        <b>Demo</b>
      </p>
      <p>
        Check out a fully set up ESM Javascript project <a href={DEMO_JS_ESM_URL} target="_blank">here</a>.
      </p>
    </div>
  </>
}

function JSCJSSetup() {
  const route = useRoute();

  return <>
    <p>
      First, install the latest versions of <a href={RouteMaster.home(route)}>react-srv</a>, <a href={REACT_URL} target="_blank">React</a> and <a href={BABEL_URL} target="_blank">babel</a>.
    </p>
    <figure>
      <pre><code>{`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev`}</code></pre>
    </figure>
    <p>
      Then, add a <code>.babelrc</code> file where we'll setup the react preset so the server recognises JSX syntax.
    </p>
    <figure>
      <pre><code>{`{
  "presets": ["@babel/preset-react"]
}
`}</code></pre>
    </figure>
    <p>
      Then, in the same file where you setup <code>ReactSrv</code>, make sure you add the following line.
    </p>
    <figure>
      <pre><code>{`require('@babel/register')({ extensions: ['.js', '.jsx'] });`}</code></pre>
    </figure>
    <p>
      This will allow other files to <code>require</code> files with the <code>.jsx</code> extension:
    </p>
    <figure>
      <pre><code>{`const Page = require('./pages/Page.jsx').default;`}</code></pre>
    </figure>
    <div className="card success">
      <p className="group">
        <SettingsIcon />
        <b>Demo</b>
      </p>
      <p>
        Check out a fully set up CommonJS Javascript project <a href={DEMO_JS_CJS_URL} target="_blank">here</a>.
      </p>
    </div>
  </>
}

export default function SetupSection() {
  const [environment, selectEnvironment] = useState<TEnvironment>('ts');

  return (
    <section>
      <hgroup>
        <h2>Setup</h2>
        <p>
          Setup is slightly different based on the platform you're running:
        </p>
      </hgroup>
      <menu>
        <li aria-selected={environment === 'ts'}>
          <a onClick={() => selectEnvironment('ts')}>Typescript</a>
        </li>
        <li aria-selected={environment === 'js-esm'}>
          <a onClick={() => selectEnvironment('js-esm')}>Javascript (ESM)</a>
        </li>
        <li aria-selected={environment === 'js-cjs'}>
          <a onClick={() => selectEnvironment('js-cjs')}>Javascript (CJS)</a>
        </li>
      </menu>
      <br />
      {environment === 'ts' && <TypescriptSetup />}
      {environment === 'js-esm' && <JSESMSetup />}
      {environment === 'js-cjs' && <JSCJSSetup />}
    </section>
  )
}