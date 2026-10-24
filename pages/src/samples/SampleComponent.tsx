import CodeHighlight from "../components/CodeHighlight";
import { TSupportedLibrary, TSupportedLanguage } from "../constants";

export default function SampleComponent(
  props: { library: TSupportedLibrary, language: TSupportedLanguage }
) {
  return <figure>
    <CodeHighlight lang={'javascript'}>{`function Greeting() { 
  return <p>Today is a fine day!</p>
}

export default function Page() {
  return <>
    <h1>Hello, world!</h1>
    <Greeting/>
  </>
}`}</CodeHighlight>
    <figcaption>{`Page.${props.language === 'typescript' ? 'tsx' : 'jsx'}`}</figcaption>
  </figure>
}