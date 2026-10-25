import { useState } from 'preact/hooks';
import Info from "../components/Info";

function Greeting(props) {
  return <h1>
    Hello{props.name ? `, ${props.name}` : ', World'}!
  </h1>
};

function Button() {
  const [clicks, setClicks] = useState(0);

  return <p>
    <button onClick={() => setClicks(clicks + 1)}>Clicks {clicks}</button>
  </p>
}

export default function Page(props) {
  return <>
    <Info />
    <hr />
    <Greeting name={props.name} />
    <Button />
    <hr/>
    <p>
      <a href="/about">About</a>
    </p>
  </>
}