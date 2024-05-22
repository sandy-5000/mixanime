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
  callback(null)
  Anilist('find', {
    page: 1,
    perPage: 6,
    search: value,
  }, (data) => {
    setTimeout(() => {
      callback(data)
    }, 500)
  })
}, 500)

const Card = ({ data, rotate, width, active }) => {
  const title =
    data.title.romaji ||
    data.title.userPreferred ||
    data.title.english ||
    data.title.native
  console.log(title, active)
  let bounded = rotate % 360
  if (bounded !== 0 && bounded !== 180) {
    if (bounded < 180) {
      rotate += bounded * 0.1
    } else {
      rotate -= (360 - bounded) * 0.1
    }
  }
  return (
    <motion.div
      initial={{ rotate: 0, scale: 1.0 }}
      animate={{ rotate: rotate, scale: active ? 1.0 : 0.8 }}
      transition={{ duration: 0.2 }}
      style={{
        transformOrigin: 'bottom center',
        zIndex: active ? 2 : 3,
        left: `calc(50% - ${width / 2}px)`,
        width: width,
      }}
      className={`h-1/2 absolute top-0 inline-block`}
    >
      <div
        className="rounded-full p-2 w-full flex justify-end"
      >
        <div className={"relative rounded-full aspect-square w-full " + (active ? '' : 'blur-[1px]')}>
          <div className="blur absolute inset-0 rounded-full -translate-x-1 translate-y-1 bg-gradient-to-br from-teal-400 via-cyan-500 to-violet-500"></div>
          <img
            style={{ rotate: `-${rotate}deg` }}
            className="absolute object-cover rounded-full h-full w-full" src={data.coverImage.large}
          />
        </div>
      </div>
    </motion.div >
  )
}
Card.propTypes = {
  data: PropTypes.any,
  rotate: PropTypes.number,
  width: PropTypes.number,
  active: PropTypes.boolean,
}

const AnimeList = ({ list }) => {
  const [shift, setShift] = useState(0)
  useEffect(() => {
    if (!list || list.length === 0) {
      return
    }
    const timeInterval = setInterval(() => {
      setShift(prev => (prev + 60))
    }, 2000)
    return () => {
      clearInterval(timeInterval)
    }
  }, [list])
  if (!list || list.length === 0) {
    return (
      <div>
        <p>Nothing found</p>
      </div>
    )
  }
  let cards = Array(6).fill(0)
  let side = 600, cardWidth = 180
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
            key={index}
            data={list[index % list.length]}
            rotate={index * 60 + shift}
            width={cardWidth}
            active={(index * 60 + shift) % 360 === 0}
          />)
      }
    </div>
  )
}
AnimeList.propTypes = {
  list: PropTypes.list
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
        <div className="w-full mt-8 a-center overflow-hidden">
          {query?.length > 0 && <AnimeList list={list} />}
        </div>
      </div>
    </motion.div>
  )
}

Find.propTypes = {
  toggleFind: PropTypes.any
}


export default Find
