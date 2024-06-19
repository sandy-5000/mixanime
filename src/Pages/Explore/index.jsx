import { useEffect, useState } from "react"
import Filter from "./Filter"
import MainLayout from "/src/layouts/MainLayout"
import Anilist from "/src/services/anilist"
import Spinner from "/src/components/Spinner"
import { useNavigate, useLocation } from "react-router-dom"
import { getQueryParams } from "/src/services/untils"
import Container from "./Container"

const defaultFilter = () => {
  return {
    animename: '',
    country: '',
    format: '',
    season: '',
    year: '',
    sort: 'TITLE_ENGLISH',
    status: '',
    averageScore: -1,
    genres: {}
  }
}

const getVariables = (variables) => {
  let {
    animename,
    countryOfOrigin,
    format,
    season,
    genre,
    year,
    sort,
    status,
    averageScore
  } = variables

  if (!animename || animename.trim() == '') {
    animename = null
  }
  if (!['JP', 'CN', 'KR'].includes(countryOfOrigin)) {
    countryOfOrigin = null
  }
  if (!['WINTER', 'SPRING', 'SUMMER', 'FALL'].includes(season)) {
    season = null
  }
  if (!['TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA'].includes(format)) {
    format = null
  }
  genre = []
  for (let [k, v] of Object.entries(variables.genres)) {
    if (v) {
      genre.push(k)
    }
  }
  year = parseInt(year)
  const nextYear = new Date().getFullYear() + 1
  if (isNaN(year) || 1940 > year || year > nextYear) {
    year = null
  }
  if (!['TITLE_ENGLISH', 'TITLE_ENGLISH_DESC', 'START_DATE_DESC', 'POPULARITY', 'POPULARITY_DESC'].includes(sort)) {
    sort = null
  }
  if (!['RELEASING', 'FINISHED', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS'].includes(status)) {
    status = null
  }
  averageScore = parseInt(averageScore)
  if (isNaN(averageScore)) {
    averageScore = null
  }
  const build = {
    search: animename,
    countryOfOrigin,
    season,
    format,
    genre_in: genre,
    seasonYear: year,
    sort,
    status,
    averageScore_greater: averageScore,
  }
  return build
}


const Explore = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const [list, setList] = useState(null)
  const [variables, setVariables] = useState({
    page: Math.max(query.get('page'), 1) || 1,
    perPage: 24,
  })
  const [filter, setFilter] = useState(defaultFilter())

  const setPage = (value, flag = true) => {
    if (value < 1) {
      return
    }
    setList(null)
    if (flag) {
      navigate('/explore' + getQueryParams({ page: value }))
      query.set('page', value)
    }
    setVariables({ ...variables, page: value })
  }

  useEffect(() => {
    const build = { ...variables, build: getVariables(filter) }
    setList(null)
    Anilist('search', build, (data) => {
      setList(data)
    })
  }, [filter, variables])

  useEffect(() => {
    const page = Math.max(query.get('page'), 1) || 1
    setPage(page, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  if (!list) {
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
      {
        show && <div className="z-[5] w-[90vw] mx-[5vw] flex justify-end"
          style={{
            position: 'fixed'
          }}
        >
          <Filter
            defaultFilter={defaultFilter}
            close={() => setShow(false)}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      }
      <div
        style={{
          filter: show ? 'blur(20px)' : 'blur(0)',
        }}
      >
        <Container
          page={variables.page}
          setPage={setPage}
          list={list}
          setShow={setShow}
        />
      </div>
    </MainLayout>
  )
}

export default Explore
