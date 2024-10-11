import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import Home from '/src/Pages/Home'
import Recent from '/src/Pages/Recent'
import Trending from '/src/Pages/Trending'
import Details from '/src/Pages/Details'
import Explore from '/src/Pages/Explore'
import Watch from '/src/Pages/Watch'
import Error from '/src/Pages/Error'
import Login from '/src/Pages/Auth/Login'
import SignUp from '/src/Pages/Auth/SignUp'
import Profile from '/src/Pages/Auth/Profile'
import { Context } from '/src/context'
import { PropTypes } from 'prop-types'
import { ROUTES } from '/src/services/untils'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.HOME} />,
    errorElement: <Error />,
  },
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.RECENT,
    element: <Recent />,
  },
  {
    path: ROUTES.TRENDING,
    element: <Trending />,
  },
  {
    path: ROUTES.DETAILS,
    element: <Details />,
  },
  {
    path: ROUTES.EXPLORE,
    element: <Explore />,
  },
  {
    path: ROUTES.WATCH,
    element: <Watch />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignUp />,
  },
  {
    path: ROUTES.PROFILE,
    element: <Profile />,
  },
])

// eslint-disable-next-line react-refresh/only-export-components
const StateProvider = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: false,
    loading: true,
    data: undefined,
  })
  return <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
}

StateProvider.propTypes = {
  children: PropTypes.node,
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider>
      <RouterProvider router={router} />
    </StateProvider>
  </React.StrictMode>
)
