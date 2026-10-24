import { RouteMaster } from "../common/routes";
import { useLanguage } from "../common/useLanguage";
import { useLibrary } from "../common/useLibrary";
import { useRoute } from "../common/useRoute";
import { TSupportedLanguage, TSupportedLibrary } from "../constants";
import HomeIcon from "./HomeIcon";

export default function Header(props: { showHome: boolean }) {
  const route = useRoute();
  const library = useLibrary();
  const language = useLanguage();

  const onLibraryChange = (e: { target: { value: string } }) => {
    const library = e.target.value as TSupportedLibrary;
    RouteMaster.changeLibrary(library);
  }

  const onLanguageChange = (e: { target: { value: string } }) => {
    const language = e.target.value as TSupportedLanguage;
    RouteMaster.changeLanguage(language);
  }

  return <nav className="disable-mobile">
    <ul>
      {props.showHome &&
        <li>
          <a href={RouteMaster.home(route, library, language)}>
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
              selected={library === 'react'}>
              React
            </option>
            <option
              id="preact"
              value={'preact'}
              selected={library === 'preact'}>
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
              selected={language === 'typescript'}>
              TS
            </option>
            <option
              id="js-esm"
              value={'javascript-esm'}
              selected={language === 'javascript-esm'}>
              JS (ESM)
            </option>
            <option
              id="js-cjs"
              value={'javascript-cjs'}
              selected={language === 'javascript-cjs'}>
              JS (CJS)
            </option>
          </optgroup>
        </select>
      </li>
    </ul>
  </nav>
}