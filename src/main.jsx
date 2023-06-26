import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root.jsx';
import Leaflet from './routes/leaflet.jsx';
import Home from './routes/home.jsx';
import './index.css'
import Papa from 'papaparse';
import { url } from './utils.js';

const router = createBrowserRouter( [
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/leaflet',
        element: <Leaflet/>,
        loader: async ( {request, params} ) => {
          return new Promise( (resolve, error) => {
            Papa.parse( `${url.origin}/map-tests/booth-locations.csv`, {
              download: true,
              header: true,
              skipEmptyLines: true,
              error,
              complete: results => {
                resolve(results.data)
              }
            } )
          } )
        },
      }
    ]
  }
], { basename: '/map-tests' } )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
