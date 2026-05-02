import { RouteMaster } from "../common/routes";
import { useRoute } from "../common/useRoute";
import HomeIcon from "./HomeIcon";

export default function Header() {
  const route = useRoute();

  return <nav>
    <ul>
      <li>
        <a href={RouteMaster.home(route)}>
          <HomeIcon />
          <span>Home</span>
        </a>
      </li>
    </ul>
  </nav>
}