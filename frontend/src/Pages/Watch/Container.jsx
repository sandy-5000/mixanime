import { PropTypes } from 'prop-types'
import Video from './Video'
import Info from './Info'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { getQueryParams } from '/src/services/untils'
import backend from '/src/services/backend'
import scrapper from '/src/services/scraper'
import { ROUTES, getAiredUpTo } from '/src/services/untils'
import Modal from '/src/components/Modal'
import { BiSearchAlt } from 'react-icons/bi'

const getEpisode = ({ id, episode, romaji, callback }) => {
  romaji =
    romaji
      ?.trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') || ''
  backend
    .get(`/api/anime/${id}/${episode}/${romaji}`, {})
    .then(({ data }) => {
      if (!data) {
        callback({
          link: null,
          status: 200,
        })
        return
      }
      if (data.linkURL?.link) {
        callback({
          link: data.linkURL.link,
          status: data.linkURL.status || 200,
        })
        return
      }
      let shift = 0
      if (data.meta_data?.shift) {
        shift = data.meta_data?.shift
      }
      const uuid = (data.uuid || romaji) + '-episode-' + (shift + episode)
      scrapper.scrape(uuid, (urlData) => {
        if (!urlData.link) {
          callback({
            link: null,
            status: 200,
          })
          return
        }
        callback({
          link: urlData.link,
          status: 200,
        })
      })
    })
    .catch(() => {
      callback({
        link: null,
        status: 200,
      })
    })
}

const Container = ({ data }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  const name = query.get('name')
  const [episode, setEpisode] = useState(parseInt(query.get('episode')))
  const [watchLink, setLink] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [episodeToFind, setEpisodeToFind] = useState('')
  const inputRef = useRef(null)

  const id = data.id
  const romaji = data.title.romaji
  const airedUpTo = getAiredUpTo(
    data.id,
    data?.nextAiringEpisode?.episode
      ? data?.nextAiringEpisode?.episode - 1
      : data?.episodes || 1
  )

  const setCurrentEpisode = (value, flag = true) => {
    if (0 < value && value <= airedUpTo) {
      if (flag) {
        navigate(ROUTES.WATCH + getQueryParams({ name, id, episode: value }))
      }
      setEpisode(value)
    }
  }

  useEffect(() => {
    setLink(null)
    getEpisode({
      id,
      episode,
      romaji,
      callback: (response) => {
        setLink(response)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode])

  useEffect(() => {
    if (showModal) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
      return () => clearTimeout(timeout)
    }
  }, [showModal])

  useEffect(() => {
    const episode = Math.max(query.get('episode'), 1) || 1
    setCurrentEpisode(episode, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  useEffect(() => {
    const handleKeyBinding = (event) => {
      if (event.ctrlKey) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          setCurrentEpisode(episode - 1)
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          setCurrentEpisode(episode + 1)
        }
      } else if (event.key === '/') {
        setShowModal(true)
      } else if (event.key === 'Escape') {
        setShowModal(false)
      }
    }
    addEventListener('keydown', handleKeyBinding)
    return () => {
      removeEventListener('keydown', handleKeyBinding)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode])

  const handleEpisodeSubmit = () => {
    setShowModal(false)
    setEpisode(episodeToFind)
    setEpisodeToFind('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleModalInput = (value) => {
    if (value !== '') {
      value = Math.max(1, value)
      value = Math.min(airedUpTo, value)
    }
    setEpisodeToFind(value)
  }

  return (
    <>
      <Modal close={!showModal} closeModal={() => setShowModal(false)}>
        <div className="w-[280px]">
          <form onSubmit={handleEpisodeSubmit}>
            <div className="relative w-full">
              <div className="absolute h-8 left-0 px-3 a-center">
                <BiSearchAlt className="text-gray-400 text-lg" />
              </div>
              <input
                type="number"
                name="episode_no"
                value={episodeToFind}
                onChange={(e) => handleModalInput(e.target.value)}
                ref={inputRef}
                className="h-8 w-[270px] bg-transparent py-2 pl-10 pr-5 text-gray-200
                  rounded-lg ring-2 ring-teal-400 focus:ring-2 focus:ring-teal-300
                  tracking-wide text-sm"
                placeholder="Enter Episode no."
              />
            </div>
            <div className="flex pt-5 justify-end px-3">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2
                  rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm
                  transition ease-in-out duration-150
                  text-[#111827] bg-[#cbd5e1cc]
                  hover:bg-[#e5e7ebee]
                  disabled:opacity-25"
              >
                <div className="flex justify-center">
                  <div className="mr-1 a-center">
                    <span className="text-xs inline-flex">Go To Episode</span>
                  </div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className="xl:container">
        <div className="mx-3 pt-2 flex">
          <div className="w-[120px]">
            <p
              className="pl-3 text-gray-200 text-gap-2 uppercase"
              style={{
                fontSize: 10,
              }}
            >
              Anime <span className="text-sgreen">Name</span>
            </p>
            <p
              className="pl-3 text-gray-200 text-gap-2 uppercase"
              style={{
                fontSize: 10,
              }}
            >
              EPISODE <span className="text-sgreen">No.</span>
            </p>
          </div>
          <div className="truncate">
            <p
              className="pr-3 text-gray-200 text-gap-2 uppercase truncate"
              style={{
                fontSize: 10,
              }}
            >
              <span className="px-1">:</span> {romaji}
            </p>
            <p
              className="pr-3 text-gray-200 text-gap-2 uppercase"
              style={{
                fontSize: 10,
              }}
            >
              <span className="px-1">:</span> {episode}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Video
          data={watchLink}
          episode={episode}
          prevEpisode={() => setCurrentEpisode(episode - 1)}
          nextEpisode={() => setCurrentEpisode(episode + 1)}
        />
        <Info setEpisode={setCurrentEpisode} data={data} />
      </div>
    </>
  )
}

Container.propTypes = {
  data: PropTypes.any,
}

export default Container
