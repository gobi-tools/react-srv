import { RouteMaster } from "../common/routes";
import { useRoute } from "../common/useRoute";
import HomeIcon from "./HomeIcon";

export default function Header(props: { showHome: boolean }) {
  const route = useRoute();

  return <nav className="disable-mobile">
    <ul>
      {props.showHome &&
        <li>
          <a href={RouteMaster.home(route)}>
            <HomeIcon />
            <span>Home</span>
          </a>
        </li>
      }
      <div></div>
      <li>
        <select>
          <optgroup label="Library">
            <option id="react">React</option>
            <option id="preact">Preact</option>
          </optgroup>
        </select>
      </li>
      <li>
        <select>
          <optgroup label="Language">
            <option id="ts">TS</option>
            <option id="js-esm">JS (ESM)</option>
            <option id="js-cjs">JS (CJS)</option>
          </optgroup>
        </select>
      </li>
    </ul>
  </nav>
}