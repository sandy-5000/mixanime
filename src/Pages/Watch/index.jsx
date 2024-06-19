import MainLayout from "/src/layouts/MainLayout"
import { useLocation } from "react-router-dom"

const Watch = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')
  const name = queryParams.get('name')
  const episode = queryParams.get('episode')
  console.log(id, name, episode)

  return (
    <MainLayout>
      <div className="h-screen a-center">
        <h3 className="text-slate-200">Watch Page!</h3>
      </div>
    </MainLayout>
  )
}

export default Watch
