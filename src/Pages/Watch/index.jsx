import Video from "./Video"
import MainLayout from "/src/layouts/MainLayout"
import { useLocation } from "react-router-dom"
import Anilist from "/src/services/anilist"
import { useEffect, useState } from "react"
import Info from "./Info"
import Spinner from "/src/components/Spinner"

const testLink = {
  "link": 'https://goone.pro/streaming.php?id=NzEzMDA=&title=Boku+no+Hero+Academia+Episode+1&typesub=SUB',
  "status": 200
}

const Watch = () => {
  const [data, setData] = useState(null)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')
  const name = queryParams.get('name')
  const [episode, setEpisode] = useState(queryParams.get('episode'))
  // console.log(id, name, episode)

  useEffect(() => {
    Anilist('watch', { id }, (data) => {
      setData(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!data) {
    return (
      <MainLayout>
        <div className="xl:container mx-auto">
          <div className="lg:m-10 m-3 h-screen">
            <Spinner />
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="xl:container">
        <div className="mx-3 pt-2 flex">
          <div className="w-[100px]">
            <p className="pl-3 text-xs text-gray-200 text-gap-1 uppercase">
              Anime <span className="text-sgreen">Name</span>
            </p>
            <p className="pl-3 text-xs text-gray-200 text-gap-1 uppercase">
              EPISODE <span className="text-sgreen">No.</span>
            </p>
          </div>
          <div className="truncate">
            <p className="pr-3 text-xs text-gray-200 text-gap-1 uppercase">
              <span className="px-1">:</span> {name}
            </p>
            <p className="pr-3 text-xs text-gray-200 text-gap-1 uppercase">
              <span className="px-1">:</span> {episode}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Video data={testLink} />
        <Info data={data} />
      </div>
    </MainLayout>
  )
}

export default Watch
