import { NumResults } from "./NumResults";
import { Search } from "./Search";

export function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <Search />
      <NumResults />
    </nav>
  );
}
