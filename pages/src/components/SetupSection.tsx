import { REACT_URL } from "../constants";
import { useState } from "react";

type TEnvironment = 'ts' | 'js-esm' | 'js-cjs';

function TypescriptSetup() {
  return (
    <>
      <p>
        First, install the latest versions of the <code>react-srv</code> library and <a href={REACT_URL} target="_blank">React</a>:
      </p>
      <figure>
        <pre><code>{`npm i react-srv
    
# install react & react-dom
npm i react@19.2.0
npm i react-dom@19.2.0
npm i @types/react@19.2.0 --save-dev
npm i @types/react-dom@19.2.0 --save-dev`}</code></pre>
      </figure>
      <p>
        Then add the following entries to your <code>.tsconfig</code>
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
    </>
  )
}

export default function SetupSection() {
  const [environment, selectEnvironment] = useState<TEnvironment>('ts');

  return (
    <section>
      <h2>Setup</h2>
      <p>
        Setup is slightly different based on the platform you're running:
      </p>
      <nav>
        <ol>
          <li aria-selected={environment === 'ts'}>
            <a onClick={() => selectEnvironment('ts')}>Typescript</a>
          </li>
          <li aria-selected={environment === 'js-esm'}>
            <a onClick={() => selectEnvironment('js-esm')}>Javascript (ESM)</a>
          </li>
          <li aria-selected={environment === 'js-cjs'}>
            <a onClick={() => selectEnvironment('js-cjs')}>Javascript (CJS)</a>
          </li>
        </ol>
      </nav>
      <br />
      {environment === 'ts' && <TypescriptSetup/>}
    </section>
  )
}