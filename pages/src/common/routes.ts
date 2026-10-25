import { TSupportedLanguage, TSupportedLibrary } from "../constants";

const PAGE_HOME_URL = 'index.html';
const PAGE_PRODUCTION_URL = 'pages/production.html';
const PAGE_STATIC_URL = 'pages/static.html';
const PAGE_VERSIONS_URL = 'pages/versions.html';
const PAGE_DEMO_URL = 'pages/demo.html';

export class RouteMaster {
  static baseRoute: string = '';

  static External = {
    GitHubRepo: 'https://github.com/gobi-tools/react-srv',
    Example: function (library: TSupportedLibrary, language: TSupportedLanguage): string {
      switch (library) {
        case 'react': {
          switch (language) {
            case 'typescript': return 'https://github.com/gobi-tools/react-srv/tree/main/demos/react/ts';
            case 'javascript-esm': return 'https://github.com/gobi-tools/react-srv/tree/main/demos/react/js-esm';
            case 'javascript-cjs': return 'https://github.com/gobi-tools/react-srv/tree/main/demos/react/js-cjs'
          }
        }
        case 'preact': {
          switch (language) {
            case 'typescript': return 'https://github.com/gobi-tools/react-srv/tree/main/demos/preact/ts';
            case 'javascript-esm': return 'https://github.com/gobi-tools/react-srv/tree/main/demos/preact/js-esm';
            case 'javascript-cjs': return 'https://github.com/gobi-tools/react-srv/tree/main/demos/preact/js-cjs'
          }
        }
      }
    }
  }

  static replace(domain: string, path: string, library: TSupportedLibrary, language: TSupportedLanguage) {
    const base = RouteMaster.getBase(domain);
    const paths = path
      .split('/')
      .filter(s => s !== '')
      .filter(s => base !== s)
      .filter(s => !['preact', 'react'].includes(s))
      .filter(s => !['typescript', 'javascript-esm', 'javascript-cjs'].includes(s));

    const newPath = paths.join('/');
    return `${base}${RouteMaster.createPathParams(library, language)}${newPath}`;
  }

  static home(domain: string, library: TSupportedLibrary, language: TSupportedLanguage): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${RouteMaster.createPathParams(library, language)}${PAGE_HOME_URL}`;
  }

  static production(domain: string, library: TSupportedLibrary, language: TSupportedLanguage): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${RouteMaster.createPathParams(library, language)}${PAGE_PRODUCTION_URL}`;
  }

  static stat(domain: string, library: TSupportedLibrary, language: TSupportedLanguage): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${RouteMaster.createPathParams(library, language)}${PAGE_STATIC_URL}`;
  }

  static versions(domain: string, library: TSupportedLibrary, language: TSupportedLanguage): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${RouteMaster.createPathParams(library, language)}${PAGE_VERSIONS_URL}`;
  }

  static demo(domain: string): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${PAGE_DEMO_URL}`;
  }

  private static getBase(domain?: string): string {
    if (!domain) return '/';
    return domain === '' ? '/' : `/${domain}/`;
  }

  private static createPathParams(library: TSupportedLibrary, language: TSupportedLanguage): string {
    return `${library}/${language}/`;
  }

  private static reload(key: string, value: string): void {
    if (!window) return;
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.location.href = url.toString();
  }
}