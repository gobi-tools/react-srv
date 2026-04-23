import { useState } from "react";
import Navigation from "./Navigation";

export default function Index() {
  const [clicks, setClicks] = useState(0);

  return <>
    <header>
      <Navigation/>
    </header>
    <main>
      <h1>Hello, World!</h1>
      <p>
        <button onClick={() => setClicks(clicks+1)}>Click me!</button>
      </p>
      <p>
        Number of clicks: {clicks}
      </p>
    </main>
  </>
}