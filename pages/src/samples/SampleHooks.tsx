import CodeHighlight from "../components/CodeHighlight";
import { TSupportedLibrary, TSupportedLanguage } from "../constants";

export default function SampeHooks(
  props: { library: TSupportedLibrary, language: TSupportedLanguage }
) {
  return <figure>
    <CodeHighlight lang={'javascript'}>{`function Button () {
  const [clicks, setClicks] = useState(0);

  return <p>
    <button onClick={() => setClicks(clicks+1)}>Clicks {clicks}</button>
  </p>
}

...

export default function Page(props) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
    <Button/>
  </>
}`}</CodeHighlight>
    <figcaption>{`Page.${props.language === 'typescript' ? 'tsx' : 'jsx'}`}</figcaption>
  </figure>
}