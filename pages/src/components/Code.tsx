import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export default function Code (props: { lang: 'javascript' | 'xml' | 'json' | 'bash', children: any }) {
  return (
    <SyntaxHighlighter language={props.lang} style={docco}>
      {props.children}
    </SyntaxHighlighter>
  );
};