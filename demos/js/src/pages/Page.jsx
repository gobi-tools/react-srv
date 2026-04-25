// src/pages/Page.jsx
import React, { useState } from 'react';

export default function Page({ name = 'friend' }) {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome, {name} — SSR + Hydration!</h1>

      <p>Button clicked <strong>{count}</strong> times</p>

      <button id="inc-btn" onClick={() => setCount(count + 1)}>
        Click me
      </button>

      <p style={{ marginTop: 20, color: '#666' }}>
        This page was server-rendered and will be hydrated on the client.
      </p>
    </div>
  );
}
