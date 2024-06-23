import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom"
import "./index.css"
import Home from "/src/Pages/Home"
import Recent from "/src/Pages/Recent"
import Trending from "/src/Pages/Trending"
import Details from "/src/Pages/Details"
import Explore from "/src/Pages/Explore"
import Watch from "/src/Pages/Watch"
import Error from "/src/Pages/Error"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" />,
    errorElement: <Error />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/recent',
    element: <Recent />
  },
  {
    path: '/trending',
    element: <Trending />
  },
  {
    path: '/details',
    element: <Details />
  },
  {
    path: '/explore',
    element: <Explore />
  },
  {
    path: '/watch',
    element: <Watch />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
