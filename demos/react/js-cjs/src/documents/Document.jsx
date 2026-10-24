export default function Document({ children }) {
  return <html>
    <head>
      <title>React Javascript (CJS)</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="color-scheme" content="light dark" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gobi-tools/css-theme@refs/heads/main/dist/theme.default.min.css"></link>
    </head>
    <body>
      <main>
        {children}
      </main>
    </body>
  </html>
}