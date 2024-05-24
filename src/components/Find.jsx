import { PropTypes } from "prop-types"
import Button from "/src/components/Button"
import { VscClose } from "react-icons/vsc"
import { LuSearch } from "react-icons/lu"
import { useState } from "react"
import Anilist from "/src/services/anilist.js"
import { debounce } from "lodash"
import { motion } from "framer-motion"
import Card from "/src/components/Card.jsx"

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

const AnimeList = ({ list }) => {
  if (!list || list.length === 0) {
    return (
      <div>
        <p>Nothing found</p>
      </div>
    )
  }
  return (
    <div className="lg:flex justify-between">
      <div className="w-full lg:w-1/3"></div>
      <div className="w-full lg:w-2/3 flex flex-wrap">
        {
          list.map((data, index) =>
            <Card
              key={'find-card-' + index}
              type="findAnime"
              data={data}
              index={index + 1}
            />
          )
        }
      </div>
    </div>
  )
}

AnimeList.propTypes = {
  list: PropTypes.array
}


const Find = ({ toggleFind: closeButton }) => {
  const [query, setQuery] = useState('')
  const [list, setList] = useState(null)

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
        <div className="w-full mt-8">
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
