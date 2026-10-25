import { RouteMaster } from "../common/routes";
import { useRoute } from "../common/useRoute";
import CodeHighlight from "../components/CodeHighlight";
import Header from "../components/Header";
import { ESM_URL, LIBRARY_SUPPORT, NODE_NPM_PEER_DEPS, PRODUCT_NAME, REACT_DOM_NPM_URL, REACT_NPM_URL, REACT_VERSIONS_EARLIEST_URL, REACT_VERSIONS_LATEST_URL, TSupportedLanguage, TSupportedLibrary } from "../constants";
import SampleVersions from "../samples/SampleVersions";

const libName = (lib: TSupportedLibrary) => lib === 'react' ? 'React' : 'Preact';

export default function Static(props: { library: TSupportedLibrary, language: TSupportedLanguage }) {
  const route = useRoute();

  return <>
    <header>
      <Header showHome={true} library={props.library} language={props.language} />
    </header>
    <main>
      <section>
        <hgroup>
          <h2>Support</h2>
          <p>
            {PRODUCT_NAME} can work with different versions of {libName(props.library)},
            starting from <b>{LIBRARY_SUPPORT[props.library].min}</b> up until the <b>{LIBRARY_SUPPORT[props.library].max}</b>.
          </p>
        </hgroup>
        <p>
          Furthermore, {PRODUCT_NAME} doesn't bundle {libName(props.library)} in any of the JS scripts it outputs,
          either in <a href={RouteMaster.production(route, props.library, props.language)}>SSR</a> or <a href={RouteMaster.stat(route, props.library, props.language)}>SSG</a> mode.
        </p>
        <p>
          It instead references it from a CDN, <a href={ESM_URL} target="_blank">esm.sh</a> by default.
          You can change this in the config:
        </p>
        <SampleVersions library={props.library} language={props.language} />
        <p>
          By doing this we ensure we serve as little JS as possible to hydrate. React itself will usually
          only get loaded once, for the first page that a user might see. After that it should be cached by the browser.
        </p>
      </section>
    </main>
  </>
}