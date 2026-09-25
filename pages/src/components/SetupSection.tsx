import { BABEL_URL, DEMO_JS_CJS_URL, DEMO_JS_ESM_URL, DEMO_TS_URL, REACT_URL, TSX_URL } from "../constants";
import { useState } from "react";
import SettingsIcon from "./SettingsIcon";
import { useRoute } from "../common/useRoute";
import { RouteMaster } from "../common/routes";
import Code from "./Code";

type TEnvironment = 'ts' | 'js-esm' | 'js-cjs';

function TypescriptSetup() {
  const route = useRoute();

  return <>
    <p>
      First, install the latest versions of <a href={RouteMaster.home(route)}>react-srv</a> and <a href={REACT_URL} target="_blank">React</a>.
    </p>
    <figure>
      <Code lang={'bash'}>{`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# optionally install the associated types
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev`}</Code>
    </figure>
    <p>
      Then, to make sure React is defined correctly at runtime, add the following entries to your <code>tsconfig.json</code> file.
    </p>
    <figure>
      <Code lang={'json'}>{`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}`}</Code>
    </figure>
    <article className="success">
      <p role="group">
        <SettingsIcon />
        <b>Example</b>
      </p>
      <p>
        Check out a fully set up TypeScript project <a href={DEMO_TS_URL} target="_blank">here</a>.
      </p>
    </article>
  </>
}

function JSESMSetup() {
  const route = useRoute();

  return <>
    <p>
      First, install the latest versions of <a href={RouteMaster.home(route)}>react-srv</a>, <a href={REACT_URL} target="_blank">React</a> and <a href={TSX_URL} target="_blank">tsx</a>.
    </p>
    <figure>
      <Code lang={'bash'}>{`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install tsx as a dev dependency
npm i tsx --save-dev`}</Code>
    </figure>
    <p>
      Then, to make sure React is defined correctly at runtime, you'll need to add a <code>tsconfig.json</code> file.
    </p>
    <figure>
      <Code lang={'json'}>{`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}`}</Code>
    </figure>
    <p>
      Finally, you'll need to run your app with <code>tsx</code> so you avoid the <code className="error">Unknown file extension ".jsx"</code> error.
    </p>
    <figure>
      <Code lang={'bash'}>{`tsx src/server.js`}</Code>
    </figure>
    <article className="success">
      <p role="group">
        <SettingsIcon />
        <b>Example</b>
      </p>
      <p>
        Check out a fully set up ESM Javascript project <a href={DEMO_JS_ESM_URL} target="_blank">here</a>.
      </p>
    </article>
  </>
}

function JSCJSSetup() {
  const route = useRoute();

  return <>
    <p>
      First, install the latest versions of <a href={RouteMaster.home(route)}>react-srv</a>, <a href={REACT_URL} target="_blank">React</a> and <a href={BABEL_URL} target="_blank">babel</a>.
    </p>
    <figure>
      <Code lang={'bash'}>{`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev
npm i @babel/plugin-transform-modules-commonjs --save-dev`}</Code>
    </figure>
    <p>
      Then, add a <code>.babelrc</code> file where we'll setup the react preset so the server recognises JSX syntax and a plugin 
      for module resolution inside <code>.jsx</code> files.
    </p>
    <figure>
      <Code lang={'json'}>{`{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-transform-modules-commonjs"]
}
`}</Code>
    </figure>
    <p>
      Then, in the same file where you setup <code>ReactSrv</code>, make sure you add the following line.
    </p>
    <figure>
      <Code lang={'javascript'}>{`require('@babel/register')({ extensions: ['.js', '.jsx'] });`}</Code>
    </figure>
    <p>
      This will allow other files to <code>require</code> files with the <code>.jsx</code> extension:
    </p>
    <figure>
      <Code lang={'javascript'}>{`const Page = require('./pages/Page.jsx').default;`}</Code>
    </figure>
    <article className="success">
      <p role="group">
        <SettingsIcon />
        <b>Example</b>
      </p>
      <p>
        Check out a fully set up CommonJS Javascript project <a href={DEMO_JS_CJS_URL} target="_blank">here</a>.
      </p>
    </article>
  </>
}

export default function SetupSection() {
  const [environment, selectEnvironment] = useState<TEnvironment>('ts');

  return (
    <>
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
    </>
  )
}