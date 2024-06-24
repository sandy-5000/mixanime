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
import Login from "/src/Pages/Auth/Login"
import SignUp from "/src/Pages/Auth/SignUp"
import Profile from "/src/Pages/Auth/Profile"

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
    element: <Recent />,
  },
  {
    path: '/trending',
    element: <Trending />,
  },
  {
    path: '/details',
    element: <Details />,
  },
  {
    path: '/explore',
    element: <Explore />,
  },
  {
    path: '/watch',
    element: <Watch />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
