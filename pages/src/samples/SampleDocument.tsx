import CodeHighlight from "../components/CodeHighlight";
import { TSupportedLibrary, TSupportedLanguage } from "../constants";

export default function SampleDocument(
  props: { library: TSupportedLibrary, language: TSupportedLanguage }
) {
  return <figure>
    <CodeHighlight lang={'javascript'}>{`export default function Document({ children }) {
  return <html lang="en">
    <head>
      <title>Title</title>
      {/*... all other meta tags, link tags, etc */}
    </head>
    <body>
      {children}
    </body>
  </html>
}`}</CodeHighlight>
    <figcaption>{`Document.${props.language === 'typescript' ? 'tsx' : 'jsx'}`}</figcaption>
  </figure>
}