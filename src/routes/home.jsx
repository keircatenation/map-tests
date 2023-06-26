import { Link } from "react-router-dom";
import { url } from "../utils";

export default function Home() {
  return (
    <>
      <section className="content">
        <h1>Mapping Tests!</h1>
        <ul>
          <li>
            <Link to={`/leaflet/`}>Leaflet</Link> / <Link to={`/leaflet/?booth=010`}>Leaflet, Booth 10</Link>
          </li>
          <li>
            <Link to={`/openlayers/`}>OpenLayers</Link> / <Link to={`/openlayers/?booth=010`}>OpenLayers, Booth 10</Link>
          </li>
        </ul>
      </section>
      
    </>
  );
}
