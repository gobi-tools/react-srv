import { RouteMaster } from "./common/routes";
import pkg from '../../lib/package.json';
import { useRoute } from "./common/useRoute";
import CodeHighlight from "./components/CodeHighlight";
import GitHubIcon from "./components/GitHubIcon";
import SetupSection from "./components/SetupSection";
import { PRODUCT_NAME, REACT_COMPONENTS_URL, REACT_HOOKS_URL, REACT_PROPS_URL, SSG_URL, SSR_URL, TSupportedLanguage, TSupportedLibrary } from "./constants";
import Header from "./components/Header";
import SampleHelloWorld from "./samples/SampleHelloWorld";
import SampleSimpleConfig from "./samples/SampleSimpleConfig";
import SampleSimpleServer from "./samples/SampleSimpleServer";
import SampleDocument from "./samples/SampleDocument";
import SampleConfigWithDocument from "./samples/SampleConfigWithDocument";
import SampleComponent from "./samples/SampleComponent";
import SampleProps from "./samples/SampleProps";
import SamplePropsServer from "./samples/SamplePropsServer";
import SampeHooks from "./samples/SampleHooks";

export default function Index(props: { library: TSupportedLibrary, language: TSupportedLanguage }) {
  const route = useRoute();

  return <>
    <header>
      <Header showHome={false} library={props.library} language={props.language} />
    </header>
    <header>
      <div className="align-center">
        <hgroup>
          <h1>{PRODUCT_NAME}</h1>
          <p>
            Add React or Preact to your server side rendered or statically generated website.
          </p>
        </hgroup>
        <p className="row align-center disable-mobile">
          <a target="_blank">
            <button>Example</button>
          </a>
          <a href={RouteMaster.demo(route)} target="_blank">
            <button type="reset">Demo</button>
          </a>
        </p>
        <div className="row align-center disable-mobile">
          <form onSubmit={(event) => event.preventDefault()}>
            <div role="group">
              <mark><span className="slight-valign">Version {pkg.version}</span></mark>
              <button type="reset" onClick={() => window.open(RouteMaster.External.GitHubRepo, '_blank')}>
                <GitHubIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </header >
    <main>
      <section>
        <p>
          All you need to do is define a component as a default export in a file of the same name:
        </p>
        <SampleHelloWorld library={props.library} language={props.language} />
        <p>
          Optionally add a config file:
        </p>
        <SampleSimpleConfig library={props.library} language={props.language} />
        <p>
          And {PRODUCT_NAME} will render it as static HTML you can send down the wire:
        </p>
        <SampleSimpleServer library={props.library} language={props.language} />
      </section>

      <section>
        <hgroup>
          <h2>Documents</h2>
          <p>
            {PRODUCT_NAME} will wrap all components in a default HTML document. You can create a custom one to
            specify titles, stylesheets, scaling, etc.
          </p>
        </hgroup>
        <SampleDocument library={props.library} language={props.language} />
        <p>
          You can reference it in the config file:
        </p>
        <SampleConfigWithDocument library={props.library} language={props.language} />
      </section>

      <section>
        <hgroup>
          <h2>Components</h2>
          <p>
            Just like in <a href={REACT_COMPONENTS_URL} target="_blanl">any React app</a>,
            you can split a large page into multiple components.
          </p>
        </hgroup>
        <SampleComponent library={props.library} language={props.language} />
      </section>

      <section>
        <hgroup>
          <h2>Props</h2>
          <p>
            Pages and components don't need to be static. You can define any <a href={REACT_PROPS_URL} target="_blank">props</a> ...
          </p>
        </hgroup>
        <SampleProps library={props.library} language={props.language} />
        <p>
          ... and pass them to the rendering function.
        </p>
        <SamplePropsServer library={props.library} language={props.language} />
      </section>

      <section>
        <hgroup>
          <h2>Hooks</h2>
          <p>
            For interactivity you can use all types of <a href={REACT_HOOKS_URL} target="_blank">React hooks</a>, like <code>useState</code>, <code>useEffect</code>, etc.
          </p>
        </hgroup>
        <SampeHooks library={props.library} language={props.language}/>
      </section>

      <section>
        <SetupSection />
        <hr />
        <article>
          <p>
            <b>Production</b>
          </p>
          <p>
            Look at best practices for <a href={SSR_URL} target="_blank">server side rendering (SSR)</a> in production.
          </p>
          <p>
            <a href={RouteMaster.production(route, props.library, props.language)}>Learn more</a>
          </p>
        </article>
        <article>
          <p>
            <b>SSG</b>
          </p>
          <p>
            {PRODUCT_NAME} can directly output HTML for <a href={SSG_URL} target="_blank">static site generation (SSG)</a>.
          </p>
          <p>
            <a href={RouteMaster.stat(route, props.library, props.language)}>Learn more</a>
          </p>
        </article>
        <article>
          <p>
            <b>React Support</b>
          </p>
          <p>
            Check version support and more advanced React setup.
          </p>
          <p>
            <a href={RouteMaster.versions(route, props.library, props.language)}>Learn more</a>
          </p>
        </article>
      </section>
    </main>
  </>
}