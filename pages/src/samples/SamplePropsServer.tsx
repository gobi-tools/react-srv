import CodeHighlight from "../components/CodeHighlight";
import { TSupportedLibrary, TSupportedLanguage } from "../constants";

export default function SamplePropsServer(
  props: { library: TSupportedLibrary, language: TSupportedLanguage }
) {
  return <figure>
    <CodeHighlight lang={'javascript'}>{`app.get('/', (req, res) => {
  const name = req.query['name'];
  return res.status(200).send(react.render(Page, { name }));
});`}</CodeHighlight>
    <figcaption>{`server.${props.language === 'typescript' ? 'ts' : 'js'}`}</figcaption>
  </figure>
}