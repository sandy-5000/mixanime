import { useEffect, useState } from "react"
import MainLayout from "/src/layouts/MainLayout"
import Anilist from "/src/services/anilist"
import Carousel from "/src/components/Carousel"

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

  useEffect(() => {
    Anilist('carousel', variables.carousel, (data) => {
      setCarousel(data)
    })
  }, [])

  return (
    <MainLayout>
      <Carousel list={carousel} />
      <h1 className="h-screen a-center font-semibold text-slate-200">Home Page!</h1>
    </MainLayout>
  )
}

export default Home
