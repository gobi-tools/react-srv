import CodeHighlight from "../components/CodeHighlight";
import Header from "../components/Header";
import SettingsIcon from "../components/SettingsIcon";
import { DEMO_PROD_URL, PRODUCT_NAME, TSupportedLanguage, TSupportedLibrary } from "../constants";
import SampleConfigProd from "../samples/SampleConfigProd";
import SampleHTML from "../samples/SampleHTML";

export default function Production(props: { library: TSupportedLibrary, language: TSupportedLanguage }) {
  return <>
    <header>
      <Header showHome={true} library={props.library} language={props.language} />
    </header>
    <main>
      <section>
        <hgroup>
          <h2>Production</h2>
          <p>
            Every time the <code>render</code> method is called, {PRODUCT_NAME} transforms
            a JSX component into HTML and Javascript:
          </p>
        </hgroup>
        <SampleHTML library={props.library} language={props.language} />
        <p>
          The markup is created from the component itself and the hydration script is
          created by reading the source file - <code>{`Page.${props.language === 'typescript' ? 'tsx' : 'jsx'}`}</code> - from disk.
        </p>
        <p>
          This is good for development but it's not ideal for production, first because the
          source code might not be present at all and second because reading and compiling code
          every time is not very efficient.
        </p>
        <p>
          So, for production we can <b>precompile</b> the necessary javascript and have it ready to go.
        </p>
        <p>
          By default, {PRODUCT_NAME} looks in the <code>./src</code> folder to find React files and outputs
          compiled javascript in <code>./public/hydrate</code>.
        </p>
        <p>
          You can change these locations, as well as whether you're in dev or prod mode, in the config file:
        </p>
        <p>
          You can also, separately, choose to minify the code or not.
        </p>
        <SampleConfigProd library={props.library} language={props.language} />
        <p>
          You can reference the config file in the <code>bundle</code> command in <code>package.json</code>
        </p>
        <figure>
          <CodeHighlight lang={'json'}>{`...
"scripts": {
  "build": "react-srv bundle -f src/react-srv.config.ts && ... other build steps",
  "start": "NODE_ENV=production node dist/server.js"
},`}</CodeHighlight>
          <figcaption>{'package.json'}</figcaption>
        </figure>
        <p>
          The last thing you need to do is to make sure the <code>/public</code> folder is
          statically served and accessible and you're good to go.
        </p>

        <article className="success">
          <p role="group">
            <SettingsIcon />
            <b>Example</b>
          </p>
          <p>
            Check out production ready example for Typescript and Javascript <a href={DEMO_PROD_URL} target="_blank">here</a>.
          </p>
        </article>
      </section>
    </main>
  </>
}