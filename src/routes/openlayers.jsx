import { useState, useEffect, useRef } from 'react'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM.js';
import {transform} from 'ol/proj.js'

export default function OpenLayers(props) {
    const [state, setState] = useState(0)
    const [map, setMap] = useState(null)
    const [ selectedCoord , setSelectedCoord ] = useState(null)
    const mapEl = useRef()
    const booths = useLoaderData()
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
    useEffect( () => {
        const initialMap = new Map({
            target: mapEl.current,
            layers: [
              new TileLayer({
                source: new OSM()
              })
            ],
            view: new View({
              center: transform([-77.588601, 43.157773], 'EPSG:4326', 'EPSG:3857'),
              zoom: 18
            }),
            controls: []
        })
        setMap(initialMap)
    }, [] )
    

    return (
        <div className='content'>
            <h1>OpenLayers</h1>
            <div ref={mapEl} className='map'></div>
        </div>
    )

}