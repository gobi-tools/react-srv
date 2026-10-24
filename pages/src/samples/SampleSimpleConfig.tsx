import CodeHighlight from "../components/CodeHighlight";
import { TSupportedLibrary, TSupportedLanguage } from "../constants";

export default function SampleSimpleConfig(
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
  return <CodeHighlight lang={'javascript'}>{`export default {};`}</CodeHighlight>
}

const JsEsmSample = () => {
  return <CodeHighlight lang={'javascript'}>{`export default {}`}</CodeHighlight>
}

const JsCjsSample = () => {
  return <CodeHighlight lang={'javascript'}>{`module.exports = {};`}</CodeHighlight>
}