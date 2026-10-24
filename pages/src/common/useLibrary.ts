import { useState, useEffect } from "react";
import { TSupportedLibrary } from "../constants";

export function useLibrary() {
  const [library, setLibrary] = useState<TSupportedLibrary>('react');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search
      const params = new URLSearchParams(search);
      const newLib = params.get("library") as TSupportedLibrary ?? 'react';
      console.log(newLib);
      setLibrary(newLib);
    }
  }, []);

  return library;
}