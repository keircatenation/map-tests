import { useState, useEffect } from 'react'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import { Map } from 'ol'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

export default function OpenLayers(props) {
    const [state, setState] = useState(0)
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

    return (
        <div>
            <h1>OpenLayers</h1>
        </div>
    )

}