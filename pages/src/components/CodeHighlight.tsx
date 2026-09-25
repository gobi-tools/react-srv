import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { usePrefersDarkMode } from '../common/useDarkMode';

export default function CodeHighlight (props: { lang: 'javascript' | 'xml' | 'json' | 'bash', children: any }) {
  const isDark = usePrefersDarkMode();
  
  return (
    <SyntaxHighlighter language={props.lang} style={isDark ? atomOneDark : docco}>
      {props.children}
    </SyntaxHighlighter>
  );
};