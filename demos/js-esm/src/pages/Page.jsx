import { useState } from 'react';

function Greeting () {
  return <p>
    Today is a fine day!
  </p>
};

function Button () {
  const [clicks, setClicks] = useState(0);

  return <p>
    <button onClick={() => setClicks(clicks+1)}>Clicks {clicks}</button>
  </p>
}

export default function Page(props) {
  return <>
    <h1>Hello, {props.name}!</h1>
    <Greeting/>
    <Button/>
  </>
}