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
  }

  static changeLanguage(language: TSupportedLanguage) {
    RouteMaster.reload("language", language);
  }

  static changeLibrary(library: TSupportedLibrary) {
    RouteMaster.reload("library", library);
  }

  static home(domain: string, library: TSupportedLibrary, language: TSupportedLanguage): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${PAGE_HOME_URL}${RouteMaster.createSearchParams(library, language)}`;
  }

  static production(domain: string, library: TSupportedLibrary, language: TSupportedLanguage): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${PAGE_PRODUCTION_URL}${RouteMaster.createSearchParams(library, language)}`;
  }

  static stat(domain: string, library: TSupportedLibrary, language: TSupportedLanguage): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${PAGE_STATIC_URL}${RouteMaster.createSearchParams(library, language)}`;
  }

  static versions(domain: string, library: TSupportedLibrary, language: TSupportedLanguage): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${PAGE_VERSIONS_URL}${RouteMaster.createSearchParams(library, language)}`;
  }

  static demo(domain: string): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${PAGE_DEMO_URL}`;
  }

  private static getBase(domain?: string): string {
    if (!domain) return '/';
    return domain === '' ? '/' : `/${domain}/`;
  }

  private static createSearchParams(library: TSupportedLibrary, language: TSupportedLanguage): string {
    return `?library=${library}&language=${language}`;
  }

  private static reload(key: string, value: string): void {
    if (!window) return;
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.location.href = url.toString();
  }
}