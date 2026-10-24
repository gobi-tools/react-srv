import CodeHighlight from "../components/CodeHighlight";
import { TSupportedLibrary, TSupportedLanguage } from "../constants";

export default function SampleHTML(
  props: { library: TSupportedLibrary, language: TSupportedLanguage }
) {
  return <figure>
    <CodeHighlight lang={'xml'}>{`<html>
  <head><title>Page</title></head>
  <body>...</body>
  <script>... set initial props ...</script>
  <script type="module">... inline hydration script ... </script>
</html>`}</CodeHighlight>
    <figcaption>{`page.html`}</figcaption>
  </figure>
}