import { useContext, useEffect } from "react"
import { Context } from "/src/context"
import backend from "/src/services/backend"

const Auth = () => {
  const [user, setUser] = useContext(Context)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || user.loggedIn) {
      console.log('context', user)
      return
    }
    backend.post('/api/user/profile', {})
      .then(({ data }) => {
        if (data.error) {
          localStorage.removeItem('token')
          return
        }
        setUser({
          loggedIn: true,
          data,
        })
        console.log('api', {
          loggedIn: true,
          data,
        })
      })
      .catch(error => {
        localStorage.removeItem('token')
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}

export default Auth
