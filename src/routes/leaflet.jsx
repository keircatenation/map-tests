import { Outlet, useLoaderData, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  Polygon,
  LayersControl,
  SVGOverlay,
  ImageOverlay,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { url } from "../utils";

export default function Leaflet(props) {
  const [lat, setLat] = useState(43.157773)
  const [lng, setLng] = useState(-77.588601)
  const [mapZoom, setMapZoom] = useState(18)
  const SVGbounds = [
    [43.159032857273324, -77.59059101343156],
    [43.1564748529275, -77.585716098547]
  ]

  return (
    <>
      <div className="content">
        <h1>Map</h1>
        <MapContainer
          center={[lat, lng]}
          zoom={mapZoom}
          placeholder={MapPlaceholder}
          style={{
            height: "70vh",
            width: "100%",
            overflow: "hidden",
            marginBottom: "1rem",
          }}
          whenReady={ map => {
            if ('geolocation' in navigator) {
              navigator.geolocation.getCurrentPosition( location => {
                console.log(location)
                L.marker([location.coords.latitude, location.coords.longitude], {icon: L.icon({
                  iconUrl: `${url.origin}/clothesline/pin.png`,
                  iconSize:     [22, 30], // size of the icon
                  iconAnchor:   [11, 30], // point of the icon which will correspond to marker's location
                  popupAnchor:  [0, -50]
                })} ).addTo(map.target);
              } )
            }
          } }
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={20}
            zoom={mapZoom}
            minZoom={17}
          />
          <ImageOverlay bounds={SVGbounds} url={`${url.origin}/clothesline/map.png`} opacity="1" />
          {/* <LocationMarker /> */}
        </MapContainer>
      </div>
    </>
  );
}
function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect( () => {
    map.locate().on( 'locationfound', e => {
      setPosition(e.latlng);
      map.flyTo( e.latlng, map.getZoom() )
    } )
  }, [map] )

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        You are here!
      </Popup>
    </Marker>
  );
}
function MapPlaceholder() {
  return (
    <p>
      M&T Bank Clothesline Art Festival Map.{' '}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}