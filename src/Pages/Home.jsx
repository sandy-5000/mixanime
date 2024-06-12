import { useEffect, useState } from "react"
import MainLayout from "/src/layouts/MainLayout"
import Anilist from "/src/services/anilist"
import Carousel from "/src/components/Carousel"
import Recents from "/src/components/Recents"
import Trending from "/src/components/Trending"

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

const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL']

const Home = () => {
  const date = new Date()
  const year = date.getFullYear()
  const season = seasons[Math.floor(date.getMonth() / 3)]
  variables.season.seasonYear = year
  variables.season.season = season

  const [carousel, setCarousel] = useState(null)
  const [recents, setRecents] = useState(null)
  const [trending, setTrending] = useState(null)

  useEffect(() => {
    Anilist('carousel', variables.carousel, (data) => {
      setCarousel(data)
    })
    Anilist('recent', variables.recent, (data) => {
      setRecents(data)
    })
    Anilist('season', variables.season, (data) => {
      setTrending(data)
    })
  }, [])

  return (
    <MainLayout>
      <Carousel list={carousel} />
      <div className="h-8"></div>
      <Recents list={recents} />
      <div className="h-8"></div>
      <Trending list={trending} season={season} />
      <div className="h-[150px]"></div>
    </MainLayout>
  )
}

export default Home
