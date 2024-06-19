import { PropTypes } from "prop-types"
import Button from "/src/components/Button"
import { motion } from "framer-motion"
import { VscClose } from "react-icons/vsc"
import { LuSearch } from "react-icons/lu"
import { useEffect, useState } from "react"
import Select from "./Select"

const getDefaultFilter = () => {
  return {
    name: '',
    country: '',
    format: '',
    season: '',
    year: '',
    sort: '',
    status: '',
    averageScore: -1,
    genres: {}
  }
}

const Filter = ({ close }) => {
  const year = new Date().getFullYear()
  const years = []
  for (let i = 1938; i < year + 2; ++i) {
    if (i === 1938) {
      years.push({ name: 'Any', value: '' })
    } else {
      years.push({ name: i, value: i })
    }
  }
  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror', 'Mahou Shoujo', 'Mecha', 'Music',
    'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice Of Life', 'Sports', 'Supernatural', 'Thriller'
  ]
  const [state, setState] = useState(getDefaultFilter())

  const getColor = () => {
    const randomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    var h = randomInt(0, 360)
    var s = randomInt(75, 100)
    var l = randomInt(70, 90)
    return `hsl(${h},${s}%,${l}%)`
  }

  useEffect(() => {
    console.log(state)
  }, [state])

  const clearText = () => {
    setState({ ...state, name: '' })
  }
  const clearFilter = () => {
    setState(getDefaultFilter())
  }

  const handleName = (event) => {
    setState({ ...state, name: event.target.value })
  }
  const handleCountry = (country) => {
    setState({ ...state, country })
  }
  const handleFormat = (format) => {
    setState({ ...state, format })
  }
  const handleSeason = (season) => {
    setState({ ...state, season })
  }
  const handleYear = (year) => {
    setState({ ...state, year })
  }
  const handleSorting = (sort) => {
    setState({ ...state, sort })
  }
  const handleStatus = (status) => {
    setState({ ...state, status })
  }
  const handleAverageScore = (averageScore) => {
    setState({ ...state, averageScore })
  }
  const handleCheck = (event) => {
    const value = event.target.value
    const checked = event.target.checked
    if (checked) {
      setState({ ...state, genres: { ...state.genres, [value]: true } })
    } else {
      const genres = state.genres
      delete genres[value]
      setState({ ...state, genres })
    }
  }

  return (
    <motion.div
      className="relative filter-width h-[88vh] z-[5] glass glass-hard overflow-y-scroll"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 right-0 h-[88vh] filter-width z-[5]">
        <div className="flex justify-end px-5 pt-5">
          <Button
            btnType="icon"
            onClick={() => close()}
          >
            <VscClose className="text-xl" />
          </Button>
        </div>
        <div className="flex justify-center">
          <div>
            <div className="mt-3 a-center">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute h-8 left-0 px-3 a-center">
                  <LuSearch className="text-gray-400" />
                </div>
                <div className="absolute h-8 right-0 px-3 a-center">
                  {
                    state.name && state.name.length > 0 && <button
                      onClick={clearText}
                    >
                      <VscClose className="text-gray-200" />
                    </button>
                  }
                </div>
                <input
                  type="text"
                  value={state.name}
                  onChange={handleName}
                  className="h-8 w-[300px] bg-transparent py-2 px-8 text-gray-200
                  rounded-lg ring-2 ring-teal-400 focus:ring-2 focus:ring-teal-300
                  uppercase tracking-wide text-xs"
                  placeholder="Search..."
                />
              </motion.div>
            </div>
            <div className="px-1 mt-5 w-[310px]">
              <Select
                id="COO"
                label="Country Of Origin"
                options={[
                  { name: 'Any', value: '' },
                  { name: 'Japan', value: 'JP' },
                  { name: 'Chinese', value: 'CN' },
                  { name: 'Korean', value: 'KR' },
                ]}
                item={state.country}
                setItem={handleCountry}
              />
            </div>
            <div className="flex justify-between w-[310px]">
              <div className="px-1 mt-3 w-1/2">
                <Select
                  id="format"
                  label="Format"
                  options={[
                    { name: 'Any', value: '' },
                    { name: 'TV', value: 'TV' },
                    { name: 'TV Short', value: 'TV_SHORT' },
                    { name: 'Movie', value: 'MOVIE' },
                    { name: 'Special', value: 'SPECIAL' },
                    { name: 'OVA', value: 'OVA' },
                    { name: 'ONA', value: 'ONA' },
                  ]}
                  item={state.format}
                  setItem={handleFormat}
                />
              </div>
              <div className="px-1 mt-3 w-1/2">
                <Select
                  id="season"
                  label="Season"
                  options={[
                    { name: 'any', value: '' },
                    { name: 'Winter', value: 'WINTER' },
                    { name: 'Spring', value: 'SPRING' },
                    { name: 'Summer', value: 'SUMMER' },
                    { name: 'Fall', value: 'FALL' },
                  ]}
                  item={state.season}
                  setItem={handleSeason}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-around w-[310px] mt-2">
              {
                genres.map((genre, index) => (
                  <span className="w-5/12 py-1" key={`genre-${index}`}>
                    <label className="checkbox">
                      <span
                        className="checkbox__label text-xs font-normal tracking-wider"
                        style={{
                          color: getColor(),
                        }}
                      >{genre}</span>
                      <input type="checkbox" checked={state.genres[genre]} value={genre} onChange={handleCheck} name="genre" />
                      <div className="checkbox__indicator"></div>
                    </label>
                  </span>
                ))
              }
            </div>
            <div className="flex justify-between w-[310px]">
              <div className="px-1 mt-3 w-1/2">
                <Select
                  id="year"
                  label="Year"
                  options={years}
                  item={state.year}
                  setItem={handleYear}
                />
              </div>
              <div className="px-1 mt-3 w-1/2">
                <Select
                  id="sorting"
                  label="Sorting"
                  options={[
                    { name: 'Any', value: '' },
                    { name: 'Ascending', value: 'TITLE_ENGLISH' },
                    { name: 'Descending', value: 'TITLE_ENGLISH_DESC' },
                    { name: 'Newly Added', value: 'START_DATE_DESC' },
                    { name: 'Rating Low to High', value: 'POPULARITY' },
                    { name: 'Rating High to Low', value: 'POPULARITY_DESC' },
                  ]}
                  item={state.sort}
                  setItem={handleSorting}
                />
              </div>
            </div>
            <div className="flex justify-between w-[310px]">
              <div className="px-1 mt-3 w-1/2">
                <Select
                  id="status"
                  label="Status"
                  options={[
                    { name: 'Any', value: '' },
                    { name: 'Airing', value: 'RELEASING' },
                    { name: 'Finished', value: 'FINISHED' },
                    { name: 'Not Yet Aired', value: 'NOT_YET_RELEASED' },
                    { name: 'Cancelled', value: 'CANCELLED' },
                    { name: 'Halted', value: 'HIATUS' },
                  ]}
                  item={state.status}
                  setItem={handleStatus}
                />
              </div>
              <div className="px-1 mt-3 w-1/2">
                <Select
                  id="averageScore"
                  label="Average Score"
                  options={[
                    { name: 'any', value: '-1' },
                    { name: 'Greater than 50', value: '50' },
                    { name: 'Greater than 60', value: '60' },
                    { name: 'Greater than 70', value: '70' },
                    { name: 'Greater than 80', value: '80' },
                    { name: 'Greater than 90', value: '90' },
                  ]}
                  item={state.averageScore}
                  setItem={handleAverageScore}
                />
              </div>
            </div>
            <div className="flex justify-between my-5 px-2">
              <Button
                style={{
                  color: '#e5e7eb',
                  backgroundColor: '#1e293b55',
                }}
                onClick={clearFilter}
              >
                <span>Clear</span>
              </Button>
              <Button
                style={{
                  color: '#1f2937',
                  backgroundColor: '#e5e7eb',
                }}
              >
                <span>Filter</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

Filter.propTypes = {
  close: PropTypes.any
}

export default Filter
