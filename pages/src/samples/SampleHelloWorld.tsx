import CodeHighlight from "../components/CodeHighlight";
import { TSupportedLibrary, TSupportedLanguage } from "../constants";

export default function SampleHelloWorld(
  props: { library: TSupportedLibrary, language: TSupportedLanguage }
) {
  return <figure>
    <CodeHighlight lang={'javascript'}>{`export default function Page() {
  return <>
    <h1>Hello, world!</h1>
  </>
}`}</CodeHighlight>
    <figcaption>{`Page.${props.language === 'typescript' ? 'tsx' : 'jsx'}`}</figcaption>
  </figure>
}