import CodeHighlight from "../components/CodeHighlight";
import { TSupportedLibrary, TSupportedLanguage } from "../constants";

export default function SampleConfigProd(
  props: { library: TSupportedLibrary, language: TSupportedLanguage }
) {
  return <figure>
    {props.language === 'typescript' && <TsSample />}
    {props.language === 'javascript-esm' && <JsEsmSample />}
    {props.language === 'javascript-cjs' && <JsCjsSample />}
    <figcaption>{`react-srv.config.${props.language === 'typescript' ? 'ts' : 'js'}`}</figcaption>
  </figure>
}

const TsSample = () => {
  return <CodeHighlight lang={'javascript'}>{`import Document from './Document';

export default {
  Document,
  srcPath: './src', // default
  outPath: './public/hydrate', // default
  isProd: process.env.NODE_ENV === 'production', // serve inline or precompiled code
  minify: true, // minify JS or not
  splitting: true, // split large JS files into small ones that can be reused and cached
}`}</CodeHighlight>
}

const JsEsmSample = () => {
  return <CodeHighlight lang={'javascript'}>{`import Document from './Document.jsx';
  
export default {
  Document,
  srcPath: './src', // default
  outPath: './public/hydrate', // default
  isProd: process.env.NODE_ENV === 'production', // serve inline or precompiled code
  minify: true, // minify JS or not
  splitting: true, // split large JS files into small ones that can be reused and cached
}`}</CodeHighlight>
}

const JsCjsSample = () => {
  return <CodeHighlight lang={'javascript'}>{`const Document = require('./Document.jsx').default;

module.exports = {
  Document,
  srcPath: './src', // default
  outPath: './public/hydrate', // default
  isProd: process.env.NODE_ENV === 'production', // serve inline or precompiled code
  minify: true, // minify JS or not
  splitting: true, // split large JS files into small ones that can be reused and cached
}`}</CodeHighlight>
}