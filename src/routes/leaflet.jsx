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
  const [accuracy, setAccuracy] = useState(null)
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
    [43.15904224612154, -77.5905816257],
    [43.15643280607245, -77.58568659424783]
  ]

  return (
    <>
      <div className="content">
        <h1>Leaflet</h1>
        <div className="legend">
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/green-pin.png`} alt="Green Pin"/>
            <figcaption>Location{ accuracy? ` (within ${Math.round(accuracy)} meters)` : ''}</figcaption>
          </figure>
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/zone-A.png`} alt="Green Pin"/>
            <figcaption>Zone A Artist Booths</figcaption>
          </figure>
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/zone-B.png`} alt="Green Pin"/>
            <figcaption>Zone B Artist Booths</figcaption>
          </figure>
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/teal-pin.png`} alt="Green Pin"/>
            <figcaption>Zone C Artist Booths</figcaption>
          </figure>
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/teal-pin.png`} alt="Green Pin"/>
            <figcaption>Zone D Artist Booths</figcaption>
          </figure>
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/teal-pin.png`} alt="Green Pin"/>
            <figcaption>Zone E Artist Booths</figcaption>
          </figure>
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/teal-pin.png`} alt="Green Pin"/>
            <figcaption>Zone F Artist Booths</figcaption>
          </figure>
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/teal-pin.png`} alt="Green Pin"/>
            <figcaption>Zone G Artist Booths</figcaption>
          </figure>
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/teal-pin.png`} alt="Green Pin"/>
            <figcaption>Zone H Artist Booths</figcaption>
          </figure>
          <figure className="legend-item">
            <img src={`${url.origin}/map-tests/teal-pin.png`} alt="Green Pin"/>
            <figcaption>Food Trucks</figcaption>
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
              map.target.on( 'locationfound', e => {
                setAccuracy(Math.round(e.accuracy))
                L.marker( e.latlng, {icon: L.icon({
                  iconUrl: `${url.origin}/map-tests/green-pin.png`,
                  iconSize:     [22, 30], // size of the icon
                  iconAnchor:   [11, 30], // point of the icon which will correspond to marker's location
                  popupAnchor:  [0, -50]
                })} ).addTo(map.target)
                L.circle(e.latlng, { radius: e.accuracy, color: 'green', opacity: '0.1' }).addTo(map.target);
              } )
              map.target.on( 'locationerror', e => {
                alert(e.message)
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
          <ImageOverlay bounds={SVGbounds} url={`${url.origin}/map-tests/map.webp`} opacity="1" />
          <LayersControl position="topright">

            {booths && <LayersControl.Overlay name="Booth Locations">
              <LayerGroup>
                {
                  booths.map( (booth, index) => {
                    return (
                      <Marker position={[booth.lat, booth.lng]} key={index} icon={L.icon({
                        iconUrl: `${url.origin}/map-tests/teal-pin.png`,
                        iconSize:     [22, 30], // size of the icon
                        iconAnchor:   [11, 30], // point of the icon which will correspond to marker's location
                        popupAnchor:  [0, -50]
                      })}>
                        <Popup> Booth {booth.zone}{booth.booth}</Popup>
                      </Marker>
                    )
                  } )
                }
              </LayerGroup>
            </LayersControl.Overlay>
            }
          </LayersControl>
          <ShownBoothMarker shownBooth={shownBooth}/>
          {/* <LocationMarker setAccuracy={setAccuracy} accuracy={accuracy}/> */}
        </MapContainer>
      </div>
    </>
  );
}
function ShownBoothMarker ( {shownBooth} ) {
  return shownBooth == null ? null : (
    <Marker position={ [shownBooth.lat, shownBooth.lng] } icon={L.icon({
      iconUrl: `${url.origin}/map-tests/teal-pin.png`,
      iconSize:     [22, 30], // size of the icon
      iconAnchor:   [11, 30], // point of the icon which will correspond to marker's location
      popupAnchor:  [0, -50]
    })}>
      <Popup> Booth {shownBooth.number} </Popup>
    </Marker>
  )
}

function LocationMarker({setAccuracy, accuracy}) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng)
      setAccuracy(e.accuracy)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <>
      <Marker position={position} icon={L.icon({
        iconUrl: `${url.origin}/map-tests/green-pin.png`,
        iconSize:     [22, 30], // size of the icon
        iconAnchor:   [11, 30], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -50]
      })} ></Marker>
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