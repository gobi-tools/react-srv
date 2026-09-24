import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const query = '(prefers-color-scheme: dark)';

export default function Code (props: { lang: 'javascript' | 'xml' | 'json' | 'bash', children: any }) {
  // first render must match the prerendered HTML → start with the light style
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const sync = () => setDark(mql.matches);
    sync(); // adopt the OS mode right after hydration
    mql.addEventListener('change', sync); // fires on every light↔dark switch
    return () => mql.removeEventListener('change', sync);
  }, []);

  return (
    <SyntaxHighlighter language={props.lang} style={dark ? atomOneDark : docco}>
      {props.children}
    </SyntaxHighlighter>
  );
};