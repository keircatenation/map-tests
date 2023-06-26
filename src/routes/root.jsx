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
        <p>© Keiran Pillman</p>
      </footer>
    </>
  );
}
