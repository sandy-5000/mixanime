import { PropTypes } from "prop-types"
import Video from "./Video"
import Info from "./Info"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { getQueryParams } from "/src/services/untils"
import backend from "/src/services/backend"
import scrapper from "/src/services/scraper"


const getEpisode = ({ id, episode, romaji, callback }) => {
  romaji = romaji?.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || ''
  backend
    .get(`/api/anime/${id}/${episode}/${romaji}`, {})
    .then(({ data }) => {
      if (!data) {
        callback({
          "link": null,
          "status": 200
        })
        return
      }
      if (data.linkURL?.link) {
        callback({
          link: data.linkURL.link,
          status: data.linkURL.status || 200
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
            "link": null,
            "status": 200
          })
          return
        }
        callback({
          "link": urlData.link,
          "status": 200
        })
      })
    })
    .catch(() => {
      callback({
        "link": null,
        "status": 200
      })
    })
}

const Container = ({ data }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  const [episode, setEpisode] = useState(parseInt(query.get('episode')))
  const [watchLink, setLink] = useState(null)
  const id = data.id
  const romaji = data.title.romaji
  const airedUpTo = data?.nextAiringEpisode?.episode
    ? (data?.nextAiringEpisode?.episode - 1)
    : (data?.episodes || 1)

  const setCurrentEpisode = (value, flag = true) => {
    if (0 < value && value <= airedUpTo) {
      if (flag) {
        navigate('/watch' + getQueryParams({ name, id, episode: value }))
      }
      setEpisode(value)
    }
  }

  useEffect(() => {
    console.log({ id, romaji, episode })
    setLink(null)
    getEpisode({
      id, episode, romaji,
      callback: (response) => {
        setLink(response)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode])

  useEffect(() => {
    const episode = Math.max(query.get('episode'), 1) || 1
    setCurrentEpisode(episode, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <>
      <div className="xl:container">
        <div className="mx-3 pt-2 flex">
          <div className="w-[100px]">
            <p className="pl-3 text-xs text-gray-200 text-gap-1 uppercase">
              Anime <span className="text-sgreen">Name</span>
            </p>
            <p className="pl-3 text-xs text-gray-200 text-gap-1 uppercase">
              EPISODE <span className="text-sgreen">No.</span>
            </p>
          </div>
          <div className="truncate">
            <p className="pr-3 text-xs text-gray-200 text-gap-1 uppercase">
              <span className="px-1">:</span> {romaji}
            </p>
            <p className="pr-3 text-xs text-gray-200 text-gap-1 uppercase">
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
  data: PropTypes.any
}

export default Container
