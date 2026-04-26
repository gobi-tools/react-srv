import { PAGE_HOME_URL } from "../constants";
import HomeIco from "./HomeIco";

export default function Header() {
  return <nav>
    <ul>
      <li>
        <a href={PAGE_HOME_URL}>
          <HomeIco />
          <span>Home</span>
        </a>
      </li>
    </ul>
  </nav>
}