import CodeHighlight from "../components/CodeHighlight";
import { TSupportedLibrary, TSupportedLanguage } from "../constants";

export default function SampleProps(
  props: { library: TSupportedLibrary, language: TSupportedLanguage }
) {
  return <figure>
    {props.language === 'typescript' && <TsSample />}
    {props.language === 'javascript-esm' && <JsEsmSample />}
    {props.language === 'javascript-cjs' && <JsCjsSample />}
    <figcaption>{`Page.${props.language === 'typescript' ? 'tsx' : 'jsx'}`}</figcaption>
  </figure>
}

const TsSample = () => {
  return <CodeHighlight lang={'javascript'}>{`export default function Page(props: { name: string }) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
  </>
}`}</CodeHighlight>
}

const JsEsmSample = () => {
  return <CodeHighlight lang={'javascript'}>{`export default function Page(props) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
  </>
}`}</CodeHighlight>
}

const JsCjsSample = () => {
  return <CodeHighlight lang={'javascript'}>{`export default function Page(props) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
  </>
}`}</CodeHighlight>
}