function BaseTag() {
  const base =
    typeof window !== "undefined" &&
    window.location.hostname.includes("github.io")
      ? "/react-srv/"
      : "/";

  return <base href={base} />;
}

export default function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>{title}</title>

        <meta name="description" content="React Srv Official Page" />
        <meta name="author" content="Gabriel Coman" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />

        <BaseTag/>
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gobi-tools/css-theme@refs/heads/main/dist/theme.app.min.css" />
        <link rel="stylesheet" href="custom.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}