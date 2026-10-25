export const PRODUCT_NAME = 'React Srv';

export const REACT_URL = 'https://react.dev/';
export const REACT_VERSIONS_EARLIEST_URL = 'https://react.dev/versions#react-18';
export const REACT_VERSIONS_LATEST_URL = 'https://react.dev/versions';
export const REACT_NPM_URL = 'https://www.npmjs.com/package/react';
export const REACT_DOM_NPM_URL = 'https://www.npmjs.com/package/react-dom';

export const REACT_COMPONENTS_URL = 'https://react.dev/learn#components';
export const REACT_PROPS_URL = 'https://react.dev/learn/passing-props-to-a-component';
export const REACT_HOOKS_URL = 'https://react.dev/reference/react/hooks';
export const REACT_HYDRATION_URL = 'https://react.dev/reference/react-dom/client/hydrateRoot';
export const REACT_RENDER_URL = 'https://react.dev/reference/react-dom/server/renderToString';

export const PREACT_URL = 'https://preactjs.com/';

export const TSX_URL = 'https://github.com/privatenumber/tsx';
export const BABEL_URL = 'https://babeljs.io/';
export const ESM_URL = 'https://esm.sh/';
export const NGINX_URL = 'https://nginx.org/';
export const NODE_NPM_PEER_DEPS = 'https://nodejs.org/en/blog/npm/peer-dependencies';

export const DEMO_STATIC_URL = 'https://github.com/gobi-tools/react-srv/tree/main/pages';
export const DEMO_PROD_URL = 'https://github.com/gobi-tools/react-srv/tree/main/demos';

export const SSR_URL = 'https://developer.mozilla.org/en-US/docs/Glossary/SSR';
export const SSG_URL = 'https://en.wikipedia.org/wiki/Static_site_generator';

export const PUB_SUBDOMAIN = 'react-srv';

export type TSupportedLibrary = 'react' | 'preact';
export type TSupportedLanguage = 'typescript' | 'javascript-esm' | 'javascript-cjs';

export const LIBRARY_SUPPORT: { [key in TSupportedLibrary] : { min: string, max: string }} = {
  'react': { min: '18.0.0', max: 'latest' },
  'preact': { min: '10.0.0', max: 'latest'},
};