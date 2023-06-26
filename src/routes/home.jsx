import { Link } from "react-router-dom";
import { url } from "../utils";

export default function Home() {
  return (
    <>
      <section className="content">
        <h1>Mapping Tests!</h1>
        <ul>
          <li>
            <Link to={`/leaflet/`}>Leaflet</Link>
          </li>
        </ul>
      </section>
      
    </>
  );
}
