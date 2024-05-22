import { PropTypes } from "prop-types"
import Button from "../components/Button"
import { VscClose } from "react-icons/vsc"
import { LuSearch } from "react-icons/lu"
import { useEffect, useState } from "react"
import Anilist from "../services/anilist.js"
import { debounce } from "lodash"
import { motion } from "framer-motion"


const findAnime = debounce((value, previous, callback) => {
  value = value.trim()
  if (value === '' || value === previous) {
    callback(null)
    return
  }
  Anilist('find', {
    page: 1,
    perPage: 6,
    search: value,
  }, (data) => {
    callback(data)
  })
}, 500)

const Card = ({ data, rotate, width }) => {
  const title =
    data.title.romaji ||
    data.title.userPreferred ||
    data.title.english ||
    data.title.native
  return (
    <motion.div
      style={{
        transformOrigin: 'bottom center',
        rotate: `${rotate}deg`,
        left: `calc(50% - ${width / 2}px)`,
      }}
      className={`h-1/2 w-[${width}px] absolute top-0 inline-block`}
    >
      <div
        className="rounded-full p-2 w-full flex justify-end"
      >
        <img
          style={{ rotate: `-${rotate}deg` }}
          className="object-cover rounded-full aspect-square w-full" src={data.coverImage.large}
        />
      </div>
    </motion.div >
  )
}

const AnimeList = ({ list }) => {
  if (!list || list.length === 0) {
    return (
      <div>
        <p>Nothing found</p>
      </div>
    )
  }
  const [shift, setShift] = useState(0)
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setShift(prev => (prev + 60) % 360)
    }, 2000)
    return () => {
      clearInterval(timeInterval)
    }
  }, [])
  let cards = Array(6).fill(0)
  let side = 600, cardWidth = 200
  return (
    <div
      style={{
        width: side,
        height: side
      }}
      className="relative aspect-square"
    >
      {
        cards.map((_, index) =>
          <Card
            data={list[index % list.length]}
            rotate={index * 60 + shift}
            width={cardWidth}
          />)
      }
    </div>
  )
}

const Find = ({ toggleFind: closeButton }) => {
  const [query, setQuery] = useState('')
  const [list, setList] = useState(null)

  useEffect(() => {
    console.log(list)
  }, [list])

  const handleQueryChange = (e) => {
    const value = e.target.value || ''
    setQuery(value)
    findAnime(value, query, setList)
  }
  const handleClose = () => {
    setQuery('')
  }

  return (
    <motion.div
      className="relative w-screen h-screen"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute left-0 top-0 w-screen h-screen z-[5] overflow-y-scroll">
        <div className="flex justify-end px-5 pt-5">
          <Button btnType="icon" onClick={closeButton}><VscClose className="text-xl" /></Button>
        </div>
        <div className="flex mt-3 px-5">
          <motion.div
            className="ml-3 relative"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute h-8 left-0 px-3 a-center">
              <LuSearch className="text-gray-400" />
            </div>
            <div className="absolute h-8 right-0 px-3 a-center">
              {
                query?.length > 0 && <button onClick={handleClose}>
                  <VscClose className="text-gray-200" />
                </button>
              }
            </div>
            <input type="text" value={query} onChange={handleQueryChange}
              className="h-8 w-[250px] md:w-[300px] bg-transparent py-2 px-8 text-gray-200
              rounded-3xl ring-2 ring-teal-900 focus:ring-2 focus:ring-teal-600
              uppercase tracking-wide text-xs"
              placeholder="Search..."
            />
          </motion.div>
        </div>
        <div className="w-full mt-[100px] a-center overflow-hidden">
          <AnimeList list={list} />
        </div>
      </div>
    </motion.div>
  )
}

Find.propTypes = {
  toggleFind: PropTypes.any
}


export default Find
