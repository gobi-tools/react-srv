import CodeHighlight from "../components/CodeHighlight";
import { TSupportedLibrary, TSupportedLanguage } from "../constants";

export default function SampleVersions(
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
  return <CodeHighlight lang={'javascript'}>{`export default {
  Document,
  ...other options
  libLocation: 'https://esm.sh', // or your own location
  libVersion: 'x.y.z', // must be same as the one in package.json
}`}</CodeHighlight>
}

const JsEsmSample = () => {
  return <CodeHighlight lang={'javascript'}>{`export default {
  Document,
  ...other options
  libLocation: 'https://esm.sh', // or your own location
  libVersion: 'x.y.z', // must be same as the one in package.json
}`}</CodeHighlight>
}

const JsCjsSample = () => {
  return <CodeHighlight lang={'javascript'}>{`module.exports = {
  Document,
  ...other options
  libLocation: 'https://esm.sh', // or your own location
  libVersion: 'x.y.z', // must be same as the one in package.json
}`}</CodeHighlight>
}