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
  Circle,
  LayersControl,
  LayerGroup,
  ImageOverlay,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { url } from "../utils";

const boothPin = L.icon({
  iconUrl: `${url.origin}/map-tests/booth-pin.png`,
  iconSize:     [22, 30], // size of the icon
  iconAnchor:   [11, 30], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -40]
});
const foodPin = L.icon({
  iconUrl: `${url.origin}/map-tests/food-pin.png`,
  iconSize:     [22, 30], // size of the icon
  iconAnchor:   [11, 30], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -40]
});
const starPin = L.icon({
  iconUrl: `${url.origin}/map-tests/star-pin.png`,
  iconSize:     [22, 30], // size of the icon
  iconAnchor:   [11, 30], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -40]
});
const personPin = L.icon({
  iconUrl: `${url.origin}/map-tests/person-pin.png`,
  iconSize:     [22, 30], // size of the icon
  iconAnchor:   [11, 30], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -40]
});

export default function Leaflet(props) {
  const locations = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [shownBooth, setShownBooth] = useState( null );
  const [accuracy, setAccuracy] = useState(null)
  useEffect( () => {
    if ( searchParams.get('booth') ) {
      let index = locations?.findIndex( booth => booth.name === searchParams.get('booth') )
      console.log(locations[index], index, 'finding booth')
      if (locations[index]) {
        setShownBooth( {
          number: locations[index].name,
          lat: locations[index].lat,
          lng: locations[index].lng
        } )
      }
    }
  }, [] )
  const [lat, setLat] = useState(43.157773)
  const [lng, setLng] = useState(-77.588601)
  const [mapZoom, setMapZoom] = useState(18)
  const SVGbounds = [
    [43.15904224612154, -77.5905816257],
    [43.15643280607245, -77.58568659424783]
  ]

  return (
    <>
      <div className="content">
        <h1>Leaflet</h1>
        <div className="legend">
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/person-pin.png`} alt="Person Pin" width="40px" height="50px"/>
            <figcaption>Location{ accuracy? ` (within ${Math.round(accuracy)} meters)` : ''}</figcaption>
          </figure>
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/booth-pin.png`} alt="Booth Pin" width="40px" height="50px"/>
            <figcaption>Artist Booths</figcaption>
          </figure>
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/food-pin.png`} alt="Food Pin" width="40px" height="50px"/>
            <figcaption>Food Trucks</figcaption>
          </figure>
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/star-pin.png`} alt="Food Pin" width="40px" height="50px"/>
            <figcaption>Entertainment</figcaption>
          </figure>
        </div>
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
              map.target.locate()
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
          <ImageOverlay bounds={SVGbounds} url={`${url.origin}/map-tests/map.webp`} opacity="1" />
          <LocationMarker setAccuracy={setAccuracy} accuracy={accuracy}/>
          <LayersControl position="topright">

            {locations && <LayersControl.Overlay name="Locations" checked={shownBooth == null ? true : false}>
              <LayerGroup>
                {
                  locations.map( (location, index) => {

                    return (
                      <Marker position={[location.lat, location.lng]} key={index} icon={L.icon({
                          iconUrl: `${url.origin}/map-tests/${location.pin}-pin.png`,
                          iconSize:     [22, 30], // size of the icon
                          iconAnchor:   [11, 30], // point of the icon which will correspond to marker's location
                          popupAnchor:  [0, -40]
                        })}>
                        <Popup>{location.name}</Popup>
                      </Marker>
                    )
                  } )
                }
              </LayerGroup>
            </LayersControl.Overlay>
            }
          </LayersControl>
          <ShownBoothMarker shownBooth={shownBooth}/>
        </MapContainer>
      </div>
    </>
  );
}
function ShownBoothMarker ( {shownBooth} ) {
  return shownBooth == null ? null : (
    <Marker position={ [shownBooth.lat, shownBooth.lng] } icon={boothPin}>
      <Popup> Booth {shownBooth.number} </Popup>
    </Marker>
  )
}

function LocationMarker({setAccuracy, accuracy}) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    locationfound(e) {
      console.log('location found!', e.accuracy*1.5)
      setPosition(e.latlng)
      setAccuracy(e.accuracy)
      map.flyTo(e.latlng, map.getZoom())
    },
    locationerror(e) {
      alert(e.message)
    }
  })
  const mapRef = useMap();
  function updateLocation() {
    console.log('updating location!')
    mapRef.locate()
  }

  return position === null ? null : (
    <>
      <button className="update-location" onClick={() => updateLocation()}>Update Location</button>
      <Marker position={position} icon={personPin} ></Marker>
      <Circle center={position} radius={accuracy*1.5} pathOptions={ {color: 'var(--primary)', opacity: '1', fillColor: 'transparent'} }/>
    </>
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