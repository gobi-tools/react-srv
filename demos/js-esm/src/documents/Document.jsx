import React from "react";

export default function Document({ children }) {
  return <html>
    <head>
      <title>Example</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="color-scheme" content="light dark" />
    </head>
    <body>
      {children}
    </body>
  </html>
}