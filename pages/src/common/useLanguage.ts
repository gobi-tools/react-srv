import { useState, useEffect } from "react";
import { TSupportedLanguage } from "../constants";

export function useLanguage() {
  const [library, setLibrary] = useState<TSupportedLanguage>('typescript');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search
      const params = new URLSearchParams(search);
      const newLanguage = params.get("language") as TSupportedLanguage ?? 'typescript';
      setLibrary(newLanguage);
    }
  }, []);

  return library;
}