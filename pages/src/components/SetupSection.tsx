import { BABEL_URL, PREACT_URL, REACT_URL, TSupportedLanguage, TSupportedLibrary, TSX_URL } from "../constants";
import SettingsIcon from "./SettingsIcon";
import { useRoute } from "../common/useRoute";
import { RouteMaster } from "../common/routes";
import CodeHighlight from "./CodeHighlight";

function ReactTSSetup(props: { library: TSupportedLibrary, language: TSupportedLanguage }) {
  const route = useRoute();

  return <>
    <p>
      First, install the latest versions of <a href={RouteMaster.home(route, props.library, props.language)}>react-srv</a> and <a href={REACT_URL}>React</a>.
    </p>
    <figure>
      <CodeHighlight lang={'bash'}>{`npm i react-srv
      
# preferrably same version
npm i react
npm i react-dom

npm i @types/react --save-dev
npm i @types/react-dom --save-dev`}</CodeHighlight>
      <figcaption>{'shell'}</figcaption>
    </figure>
    <p>
      Then, to make sure React is defined correctly at runtime, add the following entries to your <code>tsconfig.json</code> file.
    </p>
    <figure>
      <CodeHighlight lang={'json'}>{`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}`}</CodeHighlight>
      <figcaption>{'tsconfig.json'}</figcaption>
    </figure>
  </>
}

function ReactJSESMSetup(props: { library: TSupportedLibrary, language: TSupportedLanguage }) {
  const route = useRoute();

  return <>
    <p>
      First, install the latest versions of <a href={RouteMaster.home(route, props.library, props.language)}>react-srv</a>, <a href={REACT_URL}>React</a> and <a href={TSX_URL} target="_blank">tsx</a>.
    </p>
    <figure>
      <CodeHighlight lang={'bash'}>{`npm i react-srv

# preferrably same version
npm i react
npm i react-dom

# install tsx as a dev dependency
npm i tsx --save-dev`}</CodeHighlight>
      <figcaption>{'shell'}</figcaption>
    </figure>
    <p>
      Then, to make sure React is defined correctly at runtime, you'll need to add a <code>tsconfig.json</code> file.
    </p>
    <figure>
      <CodeHighlight lang={'json'}>{`{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react", // optional
    "allowJs": true
  }
}`}</CodeHighlight>
      <figcaption>{'tsconfig.json'}</figcaption>
    </figure>
    <p>
      Finally, you'll need to run your app with <code>tsx</code> so you avoid the <code className="error">Unknown file extension ".jsx"</code> error.
    </p>
    <figure>
      <CodeHighlight lang={'bash'}>{`tsx src/server.js`}</CodeHighlight>
      <figcaption>{'shell'}</figcaption>
    </figure>
  </>
}

function ReactJSCJSSetup(props: { library: TSupportedLibrary, language: TSupportedLanguage }) {
  const route = useRoute();

  return <>
    <p>
      First, install the latest versions of <a href={RouteMaster.home(route, props.library, props.language)}>react-srv</a>, <a href={REACT_URL}>React</a> and <a href={BABEL_URL} target="_blank">babel</a>.
    </p>
    <figure>
      <CodeHighlight lang={'bash'}>{`npm i react-srv

# preferrably same version
npm i react
npm i react-dom

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev
npm i @babel/plugin-transform-modules-commonjs --save-dev`}</CodeHighlight>
      <figcaption>{'shell'}</figcaption>
    </figure>
    <p>
      Then, add a <code>.babelrc</code> file where we'll setup the react preset so the server recognises JSX syntax and a plugin
      for module resolution inside <code>.jsx</code> files.
    </p>
    <figure>
      <CodeHighlight lang={'json'}>{`{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-modules-commonjs"
  ]
}
`}</CodeHighlight>
      <figcaption>{'.babelrc'}</figcaption>
    </figure>
    <p>
      Then, in the same file where you setup <code>ReactSrv</code>, make sure you add the following line.
    </p>
    <figure>
      <CodeHighlight lang={'javascript'}>{`require('@babel/register')({ extensions: ['.js', '.jsx'] });`}</CodeHighlight>
      <figcaption>{'server.js'}</figcaption>
    </figure>
    <p>
      This will allow other files to <code>require</code> files with the <code>.jsx</code> extension:
    </p>
    <figure>
      <CodeHighlight lang={'javascript'}>{`const Page = require('./pages/Page.jsx').default;`}</CodeHighlight>
      <figcaption>{'server.js'}</figcaption>
    </figure>
  </>
}

function PreactTSSetup(props: { library: TSupportedLibrary, language: TSupportedLanguage }) {
  const route = useRoute();

  return <>
    <p>
      First, install the latest versions of <a href={RouteMaster.home(route, props.library, props.language)}>react-srv</a> and <a href={PREACT_URL}>Preact</a>.
    </p>
    <figure>
      <CodeHighlight lang={'bash'}>{`npm i react-srv
      
npm i preact
npm i preact-iso
npm i preact-render-to-string # needed for SSR/SSG
`}</CodeHighlight>
      <figcaption>{'shell'}</figcaption>
    </figure>
    <p>
      Then, to make sure Preact is defined correctly at runtime, add the following entries to your <code>tsconfig.json</code> file.
    </p>
    <figure>
      <CodeHighlight lang={'javascript'}>{`{
  "compilerOptions: {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "paths": {
      "react": ["./node_modules/preact/compat/"],
      "react-dom": ["./node_modules/preact/compat/"],
      "react-dom/*": ["./node_modules/preact/compat/*"]
    }
  }
}`}</CodeHighlight>
      <figcaption>{'tsconfig.json'}</figcaption>
    </figure>
  </>
}

function PreactJSESMSetup(props: { library: TSupportedLibrary, language: TSupportedLanguage }) {
  const route = useRoute();

  return <>
    <p>
      First, install the latest versions of <a href={RouteMaster.home(route, props.library, props.language)}>react-srv</a>, <a href={PREACT_URL}>Preact</a> and <a href={TSX_URL} target="_blank">tsx</a>.
    </p>
    <figure>
      <CodeHighlight lang={'bash'}>{`npm i react-srv

npm i preact
npm i preact-iso
npm i preact-render-to-string # needed for SSR/SSG

# install tsx as a dev dependency
npm i tsx --save-dev`}</CodeHighlight>
      <figcaption>{'shell'}</figcaption>
    </figure>
    <p>
      Then, to make sure React is defined correctly at runtime, you'll need to add a <code>tsconfig.json</code> file.
    </p>
    <figure>
      <CodeHighlight lang={'json'}>{`{
  "compilerOptions": {
    /* Preact Config */
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "skipLibCheck": true,
    "allowJs": true,
    "paths": {
      "react": ["./node_modules/preact/compat/dist/compat.mjs"],
      "react-dom": ["./node_modules/preact/compat/dist/compat.mjs"],
      "react-dom/client": ["./node_modules/preact/compat/client.mjs"],
      "react-dom/server": ["./node_modules/preact/compat/server.mjs"]
    }
  }
}`}</CodeHighlight>
      <figcaption>{'tsconfig.json'}</figcaption>
    </figure>
    <p>
      Finally, you'll need to run your app with <code>tsx</code> so you avoid the <code className="error">Unknown file extension ".jsx"</code> error.
    </p>
    <figure>
      <CodeHighlight lang={'bash'}>{`tsx src/server.js`}</CodeHighlight>
      <figcaption>{'shell'}</figcaption>
    </figure>
  </>
}

function PreactJSCJSSetup(props: { library: TSupportedLibrary, language: TSupportedLanguage }) {
  const route = useRoute();

  return <>
    <p>
      First, install the latest versions of <a href={RouteMaster.home(route, props.library, props.language)}>react-srv</a>, <a href={PREACT_URL}>Preact</a> and <a href={BABEL_URL} target="_blank">babel</a>.
    </p>
    <figure>
      <CodeHighlight lang={'bash'}>{`npm i react-srv

npm i preact
npm i preact-iso
npm i preact-render-to-string # needed for SSR/SSG

# install a few babel dependencies
npm i @babel/preset-react --save-dev
npm i @babel/register --save-dev
npm i @babel/plugin-transform-modules-commonjs --save-dev`}</CodeHighlight>
      <figcaption>{'shell'}</figcaption>
    </figure>
    <p>
      Then, add a <code>.babelrc</code> file where we'll still need to setup the React preset so the server recognises JSX syntax and a plugin
      for module resolution inside <code>.jsx</code> files.
    </p>
    <figure>
      <CodeHighlight lang={'json'}>{`{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "preact"
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-modules-commonjs"
  ]
}
`}</CodeHighlight>
      <figcaption>{'.babelrc'}</figcaption>
    </figure>
    <p>
      Then, in the same file where you setup <code>ReactSrv</code>, make sure you add the following line.
    </p>
    <figure>
      <CodeHighlight lang={'javascript'}>{`require('@babel/register')({ extensions: ['.js', '.jsx'] });`}</CodeHighlight>
      <figcaption>{'server.js'}</figcaption>
    </figure>
    <p>
      This will allow other files to <code>require</code> files with the <code>.jsx</code> extension:
    </p>
    <figure>
      <CodeHighlight lang={'javascript'}>{`const Page = require('./pages/Page.jsx').default;`}</CodeHighlight>
      <figcaption>{'server.js'}</figcaption>
    </figure>
  </>
}

export default function SetupSection(props: { library: TSupportedLibrary, language: TSupportedLanguage }) {
  return (
    <>
      <hgroup>
        <h2>Setup</h2>
      </hgroup>
      {props.library === 'preact' && props.language === 'typescript' && <PreactTSSetup library={props.library} language={props.language} />}
      {props.library === 'preact' && props.language === 'javascript-esm' && <PreactJSESMSetup library={props.library} language={props.language} />}
      {props.library === 'preact' && props.language === 'javascript-cjs' && <PreactJSCJSSetup library={props.library} language={props.language} />}
      {props.library === 'react' && props.language === 'typescript' && <ReactTSSetup library={props.library} language={props.language} />}
      {props.library === 'react' && props.language === 'javascript-esm' && <ReactJSESMSetup library={props.library} language={props.language} />}
      {props.library === 'react' && props.language === 'javascript-cjs' && <ReactJSCJSSetup library={props.library} language={props.language} />}
      <article className="success">
        <p role="group">
          <SettingsIcon />
          <b>Example</b>
        </p>
        <p>
          Check out a fully set up project <a href={RouteMaster.External.Example(props.library, props.language)} target="_blank">here</a>.
        </p>
      </article>
    </>
  )
}