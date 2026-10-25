import CodeHighlight from "../components/CodeHighlight";
import { TSupportedLibrary, TSupportedLanguage } from "../constants";

export default function SampleSimpleServer(
  props: { library: TSupportedLibrary, language: TSupportedLanguage }
) {
  return <figure>
    {props.language === 'typescript' && <TsSample />}
    {props.library === 'react' && props.language === 'javascript-esm' && <ReactJsEsmSample />}
    {props.library === 'preact' && props.language === 'javascript-esm' && <PreactJsEsmSample />}
    {props.language === 'javascript-cjs' && <JsCjsSample />}
    <figcaption>{`server.${props.language === 'typescript' ? 'ts' : 'js'}`}</figcaption>
  </figure>
}

const TsSample = () => {
  return <CodeHighlight lang={'javascript'}>{`import config from './react-srv.config';
import Page from './Page';

const app = express();
const react = new ReactSrv(config);
  
app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});`}</CodeHighlight>
}

const ReactJsEsmSample = () => {
  return <CodeHighlight lang={'javascript'}>{`import config from './react-srv.config.js';
import Page from './Page.jsx';

const app = express();
const react = new ReactSrv(config);
  
app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});`}</CodeHighlight>
}

const PreactJsEsmSample = () => {
  return <CodeHighlight lang={'javascript'}>{`import config from './react-srv.config.js';
import Page from './Page.jsx';
import { h } from 'preact';
import { renderToString, renderToStaticMarkup } from 'preact-render-to-string';

const app = express();
const react = new ReactSrv({
  ...config,
  // avoid having two copies of Preact
  runtime: { h, renderToString, renderToStaticMarkup },
});
  
app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});`}</CodeHighlight>
}

const JsCjsSample = () => {
  return <CodeHighlight lang={'javascript'}>{`require('@babel/register')({ extensions: ['.js', '.jsx'] });
  
const ReactSrv = require('react-srv').default;
const Page = require('./Page.jsx').default;

const app = express();
const react = new ReactSrv(config);
  
app.get('/', (_, res) => {
  return res.status(200).send(react.render(Page));
});`}</CodeHighlight>
}