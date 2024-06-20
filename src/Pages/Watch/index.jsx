import Video from "./Video"
import MainLayout from "/src/layouts/MainLayout"
import { useLocation } from "react-router-dom"

const testLink = {
  "link": 'https://goone.pro/streaming.php?id=NzEzMDA=&title=Boku+no+Hero+Academia+Episode+1&typesub=SUB',
  "status": 200
}

const Watch = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')
  const name = queryParams.get('name')
  const episode = queryParams.get('episode')
  console.log(id, name, episode)

  return (
    <MainLayout>
      <div className="">
        <Video data={testLink} />
      </div>
    </MainLayout>
  )
}

export default Watch
