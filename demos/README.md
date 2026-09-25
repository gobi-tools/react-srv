# Demos 

Here are three demos showcasing React Srv for [Typescript](https://www.typescriptlang.org/) and [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) ([ESM](https://nodejs.org/api/esm.html) and [CommonJS](https://nodejs.org/api/modules.html) modules).

You'll need to install dependencies:

```bash
npm i
```

After that you should be able to run
the each project either in dev mode (slightly less efficient):

```bash
npm run dev 
```

Or you can run in production mode, if you build
firs:


```bash
# build & bundle each project
npm run build

# start server in production mode
npm run start
```

The end result will be the same. A simple 
Node server running on `http://128.0.0.1:3000` exposing a number of endpoints that respond with a React page ([SSR](https://developer.mozilla.org/en-US/docs/Glossary/SSR)).

If you want to explore a statically generated website ([SSG](https://developer.mozilla.org/en-US/docs/Glossary/SSG)) look at the [project's documentation](https://github.com/gobi-tools/react-srv/tree/main/pages).   