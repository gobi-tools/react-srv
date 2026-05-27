const PAGE_HOME_URL = 'index.html';
const PAGE_PRODUCTION_URL = 'pages/production.html';
const PAGE_STATIC_URL = 'pages/static.html';
const PAGE_DEMO_URL = 'pages/demo.html';

export class RouteMaster {
  static baseRoute: string = '';

  static home(domain: string): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${PAGE_HOME_URL}`;
  }

  static production(domain: string): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${PAGE_PRODUCTION_URL}`;
  }

  static stat(domain: string): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${PAGE_STATIC_URL}`;
  }

  static demo(domain: string): string {
    const base = RouteMaster.getBase(domain);
    return `${base}${PAGE_DEMO_URL}`;
  }

  private static getBase(domain?: string): string {
    if (!domain) return '/';
    return domain === '' ? '/' : `/${domain}/`;
  }
}