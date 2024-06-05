import { useEffect, useState } from "react";
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  ImageOverlay,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { url } from "../utils";

const personPin = L.icon({
  iconUrl: `${url.origin}/map-tests/person-pin.png`,
  iconSize:     [22, 30], // size of the icon
  iconAnchor:   [11, 30], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -40]
});

export default function LeafletHelper(props) {
  const [lat, setLat] = useState(43.157773)
  const [lng, setLng] = useState(-77.588601)
  const [mapZoom, setMapZoom] = useState(18)
  const SVGbounds = [
    [43.15906932220975, -77.59078949689867],
    [43.156366347551774, -77.58567184209825]
  ]

  return (
    <>
      <div className="content">
        <h1>Leaflet Position Helper</h1>
        <MapContainer
          center={[lat, lng]}
          zoom={mapZoom}
          style={{
            height: "70vh",
            width: "100%",
            overflow: "hidden",
            marginBottom: "1rem",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={20}
            zoom={mapZoom}
            minZoom={17}
          />
          <ImageOverlay bounds={SVGbounds} url={`${url.origin}/map-tests/map.webp`} opacity="1" />
          <LocationMarker/>
        </MapContainer>
      </div>
    </>
  );
}


function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
        setPosition(e.latlng)
    //   map.locate()
    },
    // locationfound(e) {
    //   map.flyTo(e.latlng, map.getZoom())
    // },
  })

  return position === null ? null : (
    <>
      <Marker position={position} icon={personPin} >
        <Popup>Clicked at {position.lat}, {position.lng}</Popup>
      </Marker>
    </>
  );
}