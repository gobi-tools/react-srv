import { PAGE_HOME_URL } from "../constants";

export default function Header() {
  return <header>
    <nav>
      <ul>
        <li>
          <a href={PAGE_HOME_URL}>Home</a>
        </li>
      </ul>
    </nav>
  </header>
}