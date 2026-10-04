import { useState, useEffect } from "react";
import { PUB_SUBDOMAIN } from "../constants";

export function useRoute() {
  const [route, setRoute] = useState(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const baseRoute = path.includes(PUB_SUBDOMAIN) ? PUB_SUBDOMAIN : '';
      setRoute(baseRoute);
      console.log('Test', 'setting route to', baseRoute);
    }
  }, []);

  return route;
}