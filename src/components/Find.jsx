import { PropTypes } from "prop-types"
import Button from "/src/components/Button"
import { VscClose } from "react-icons/vsc"
import { LuSearch } from "react-icons/lu"
import { useState } from "react"
import Anilist from "/src/services/anilist.js"
import { debounce } from "lodash"
import { motion } from "framer-motion"
import Card from "/src/components/Card.jsx"

const findAnime = debounce((value, previous, setLoading, callback) => {
  value = value.trim()
  setLoading(true)
  callback(null)
  if (value === '' || value === previous) {
    setLoading(false)
    return
  }
  Anilist('find', {
    page: 1,
    perPage: 6,
    search: value,
  }, (data) => {
    setTimeout(() => {
      callback(data)
      setLoading(false)
    }, 500)
  })
}, 500)

const AnimeList = ({ list, loading }) => {
  return (
    <div className="lg:flex justify-between">
      <div className="w-full lg:w-1/3"></div>
      <div className="w-full lg:w-2/3 flex flex-wrap">
        {
          loading
            ? <div>
              <p className="text-gray-200">Loading</p>
            </div>
            : (list && list.length !== 0
              ? list.map((data, index) =>
                <Card
                  key={'find-card-' + index}
                  type="findAnime"
                  data={data}
                  index={index + 1}
                />
              )
              : <div>
                <p className="text-gray-200">Nothing found</p>
              </div>)
        }
      </div>
    </div>
  )
}

AnimeList.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
}


const Find = ({ toggleFind: closeButton }) => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState(null)

  const handleQueryChange = (e) => {
    const value = e.target.value || ''
    setQuery(value)
    findAnime(value, query, setLoading, (data) => {
      setList(data)
    })
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
          {query?.length > 0 && <AnimeList list={list} loading={loading} />}
        </div>
      </div>
    </motion.div>
  )
}

Find.propTypes = {
  toggleFind: PropTypes.any
}


export default Find
