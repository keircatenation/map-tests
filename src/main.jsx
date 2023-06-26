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
        element: <Leaflet/>
      }
    ]
  }
], { basename: '/map-tests' } )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
