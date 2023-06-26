import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header>
      <Link role="menuitem" to={`/`}>Home</Link>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© Memorial Art Gallery of the University of Rochester</p>
      </footer>
    </>
  );
}
