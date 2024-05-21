import { PropTypes } from "prop-types"
import Button from "../components/Button"
import { VscClose } from "react-icons/vsc"
import { LuSearch } from "react-icons/lu"
import { useEffect, useState } from "react"
import Anilist from "../services/anilist.js"
import { debounce } from "lodash"

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

const createCard = (data) => {
  const title =
    data.title.romaji ||
    data.title.userPreferred ||
    data.title.english ||
    data.title.native
  return (
    <div>
      <p className="text-gray-200">{title}</p>
    </div>
  )
}

const Find = ({ handleFind }) => {
  const [showFindBar, setShowFindBar] = useState(false)
  const [query, setQuery] = useState('')
  const [list, setList] = useState(null)

  useEffect(() => {
    setShowFindBar(true)
  }, [])

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
    <div className="relative w-screen h-screen">
      <div className="absolute left-0 top-0 w-screen h-screen z-[5] p-5 overflow-y-scroll">
        <div className="flex justify-end">
          <Button btnType="icon" onClick={handleFind}><VscClose className="text-xl" /></Button>
        </div>
        <div className="flex mt-3">
          <div className={"ml-3 relative " + (showFindBar ? "findbar-show" : "findbar-hidden")}>
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
          </div>
        </div>
        <div className="flex flex-wrap">
          {
            list && list.map(x => createCard(x))
          }
        </div>
      </div>
    </div>
  )
}

Find.propTypes = {
  handleFind: PropTypes.any
}


export default Find
