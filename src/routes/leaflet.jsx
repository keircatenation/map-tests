import { Outlet, useLoaderData, Link, useSearchParams } from "react-router-dom";
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
  LayerGroup,
  SVGOverlay,
  ImageOverlay,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { url } from "../utils";

export default function Leaflet(props) {
  const booths = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [shownBooth, setShownBooth] = useState( null );
  useEffect( () => {
    if ( searchParams.get('booth') ) {
      let index = booths?.findIndex( booth => booth.booth === searchParams.get('booth') )
      console.log(booths[index], index, 'finding booth')
      if (booths[index]) {
        setShownBooth( {
          number: booths[index].booth,
          lat: booths[index].lat,
          lng: booths[index].lng
        } )
      }
    }
  }, [] )
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
        <h1>Leaflet</h1>
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
                // console.log(location)
                L.marker([location.coords.latitude, location.coords.longitude], {icon: L.icon({
                  iconUrl: `${url.origin}/map-tests/pin.png`,
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
          <ImageOverlay bounds={SVGbounds} url={`${url.origin}/map-tests/map.png`} opacity="1" />
          <LayersControl position="topright">

            {booths && <LayersControl.Overlay name="Booth Locations">
              <LayerGroup>
                {
                  booths.map( (booth, index) => {
                    return (
                      <Marker position={[booth.lat, booth.lng]} key={index}>
                        <Popup> Booth {booth.zone}{booth.booth}</Popup>
                      </Marker>
                    )
                  } )
                }
              </LayerGroup>
            </LayersControl.Overlay>
            }
          </LayersControl>
          {
            shownBooth && <Marker position={ [shownBooth.lat, shownBooth.lng] } icon={L.icon({
              iconUrl: `${url.origin}/map-tests/pin.png`,
              iconSize:     [22, 30], // size of the icon
              iconAnchor:   [11, 30], // point of the icon which will correspond to marker's location
              popupAnchor:  [0, -50]
            })}>
              <Popup> Booth {shownBooth.number} </Popup>
            </Marker>
          }
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
      // map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      // map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        You are here: {position.lat}, {position.lng}
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