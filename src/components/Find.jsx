import { PropTypes } from "prop-types"
import Button from "/src/components/Button"
import { VscClose } from "react-icons/vsc"
import { LuSearch } from "react-icons/lu"
import { useState } from "react"
import Anilist from "/src/services/anilist.js"
import { debounce } from "lodash"
import { motion } from "framer-motion"
import Card from "/src/components/Card.jsx"
import Lottie from 'react-lottie'
import NotFoundAnimation from "/src/assets/animations/not_found.json"
import LoadingAnimation from "/src/assets/animations/loading.json"
import GirlFlyingAnimation from "/src/assets/animations/girl_flying.json"
import BookFindAnimation from "/src/assets/animations/book_find.json"

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
  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const notFoundOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFoundAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const bookFindOptions = {
    loop: true,
    autoplay: true,
    animationData: BookFindAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return (
    <div className="lg:flex justify-between">
      <div className="w-full lg:w-1/3 a-center">
        <div className="hidden lg:block w-[250px] md:w-[300px] lg:w-[350px] aspect-square">
          <Lottie
            style={{ cursor: 'default' }}
            options={bookFindOptions}
          />
        </div>
      </div>
      <div className="w-full lg:w-2/3 flex flex-wrap">
        {
          loading
            ? <div className="w-full a-center">
              <div className="w-[250px] md:w-[300px] lg:w-[350px] aspect-square">
                <Lottie
                  style={{ cursor: 'default' }}
                  options={loadingOptions}
                />
              </div>
            </div>
            : (
              list && list.length !== 0
                ? list.map((data, index) =>
                  <Card
                    key={'find-card-' + index}
                    type="findAnime"
                    data={data}
                    index={index + 1}
                  />
                )
                : <div className="w-full a-center">
                  <div>
                    <div className="mt-[150px] w-[200px] md:mt-0 md:w-[250px] lg:w-[300px] aspect-square">
                      <Lottie
                        speed={0.5}
                        style={{ cursor: 'default' }}
                        options={notFoundOptions}
                      />
                    </div>
                    <div className="a-center text-gray-200">
                      <p className="text-gap-1">
                        Didn&#39;t found <span className="text-sgreen">Any related</span>
                      </p>
                    </div>
                  </div>
                </div>
            )
        }
      </div>
    </div>
  )
}

AnimeList.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
}


const EmptyQuery = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: GirlFlyingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return (
    <div className="a-center">
      <div>
        <div className="w-[300px] md:w-[350px] lg:w-[400px] aspect-square">
          <Lottie options={options} />
        </div>
        <div className="a-center text-gray-200">
          <p className="text-gap-1">
            Search <span className="text-sgreen">Any Anime</span>
          </p>
        </div>
      </div>
    </div>
  )
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
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
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
          {query?.length > 0 ? <AnimeList list={list} loading={loading} /> : <EmptyQuery />}
        </div>
      </div>
    </motion.div>
  )
}

Find.propTypes = {
  toggleFind: PropTypes.any
}


export default Find
