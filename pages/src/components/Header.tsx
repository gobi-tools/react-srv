import { RouteMaster } from "../common/routes";
import { useRoute } from "../common/useRoute";
import { TSupportedLanguage, TSupportedLibrary } from "../constants";
import HomeIcon from "./HomeIcon";

export default function Header(props: { showHome: boolean, library: TSupportedLibrary, language: TSupportedLanguage }) {
  const route = useRoute();

  const onLibraryChange = (e: { target: { value: string } }) => {
    const library = e.target.value as TSupportedLibrary;
    const language = props.language;

    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const href = RouteMaster.replace(route, path, library, language);
      window.location.href = href;
    }
  }

  const onLanguageChange = (e: { target: { value: string } }) => {
    const library = props.library;
    const language = e.target.value as TSupportedLanguage;
    
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const href = RouteMaster.replace(route, path, library, language);
      window.location.href = href;
    }
  }

  return <nav className="disable-mobile">
    <ul>
      {props.showHome &&
        <li>
          <a href={RouteMaster.home(route, props.library, props.language)}>
            <HomeIcon />
            <span>Home</span>
          </a>
        </li>
      }
      <div></div>
      <li>
        <select onChange={(e) => onLibraryChange(e)}>
          <optgroup label="Library">
            <option
              id="react"
              value={'react'}
              selected={props.library === 'react'}>
              React
            </option>
            <option
              id="preact"
              value={'preact'}
              selected={props.library === 'preact'}>
              Preact
            </option>
          </optgroup>
        </select>
      </li>
      <li>
        <select onChange={(e) => onLanguageChange(e)}>
          <optgroup label="Language">
            <option
              id="ts"
              value={'typescript'}
              selected={props.language === 'typescript'}>
              TS
            </option>
            <option
              id="js-esm"
              value={'javascript-esm'}
              selected={props.language === 'javascript-esm'}>
              JS (ESM)
            </option>
            <option
              id="js-cjs"
              value={'javascript-cjs'}
              selected={props.language === 'javascript-cjs'}>
              JS (CJS)
            </option>
          </optgroup>
        </select>
      </li>
    </ul>
  </nav>
}