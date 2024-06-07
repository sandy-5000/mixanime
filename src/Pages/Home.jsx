import { useEffect, useState } from "react"
import MainLayout from "/src/layouts/MainLayout"
import Anilist from "/src/services/anilist"
import Carousel from "/src/components/Carousel"
import Recents from "../components/Recents"

const variables = {
  carousel: {
    page: 1,
    perPage: 10,
  },
  recent: {
    page: 1,
    perPage: 48,
  },
  season: {
    page: 1,
    perPage: 12,
  }
}

const Home = () => {
  const [carousel, setCarousel] = useState(null)
  const [recents, setRecents] = useState(null)

  useEffect(() => {
    Anilist('carousel', variables.carousel, (data) => {
      setCarousel(data)
    })
    Anilist('recent', variables.recent, (data) => {
      setRecents(data)
    })
  }, [])

  return (
    <MainLayout>
      <Carousel list={carousel} />
      <div className="h-8"></div>
      <Recents list={recents} />
      <div className="h-8"></div>
      <h1 className="h-screen a-center font-semibold text-slate-200">Home Page!</h1>
    </MainLayout>
  )
}

export default Home
