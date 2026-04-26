import { PAGE_HOME_URL } from "../constants";
import HomeIcon from "./HomeIcon";

export default function Header() {
  return <nav>
    <ul>
      <li>
        <a href={PAGE_HOME_URL}>
          <HomeIcon />
          <span>Home</span>
        </a>
      </li>
    </ul>
  </nav>
}