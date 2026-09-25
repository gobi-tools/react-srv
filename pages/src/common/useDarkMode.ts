import { useEffect, useState } from "react";

export function usePrefersDarkMode() {
  if (typeof window !== 'undefined') {

    const [isDark, setIsDark] = useState(() => {
      return !window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {

      // now we are safely in the browser
      const media = window.matchMedia("(prefers-color-scheme: dark)");

      const update = () => setIsDark(media.matches);

      update(); // set initial value

      media.addEventListener("change", update);

      return () => media.removeEventListener("change", update);
    }, []);

    return isDark;
  }
}