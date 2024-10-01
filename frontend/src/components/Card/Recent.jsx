import { memo } from "react"
import { PropTypes } from "prop-types"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { getQueryParams, getDate } from "/src/services/untils"

const MAX_TITLE_SIZE = 25

const Recent = ({ data = {} }) => {
  const id = data.media.id
  const name =
    data.media.title.romaji ||
    data.media.title.english ||
    data.media.title.userPreferred ||
    data.media.title.native
  let title =
    data.media.title.userPreferred ||
    data.media.title.english ||
    data.media.title.romaji ||
    data.media.title.native
  if (title.length > MAX_TITLE_SIZE) {
    title = title.slice(0, MAX_TITLE_SIZE - 3) + '...'
  }
  const episode = data.episode
  const backgound = data.media.coverImage.extraLarge
  const format = data.media.format.replaceAll('_', ' ')
  const duration = (data.media.duration || 23) + ':00'
  const date = getDate(data.airingAt)

  return (
    <motion.div
      className="cursor-pointer hidden-recent-card h-full lg:w-1/4 md:w-1/3 sm:w-1/3 w-1/2 p-2"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        to={{
          pathname: '/watch',
          search: getQueryParams({ id, name, episode })
        }}
      >
        <div className="p-1 glass glass-hard w-full h-full">
          <div
            className="background aspect-[7/5] md:aspect-[8/5] lg:aspect-[9/5] relative p-2 rounded-lg"
            style={{
              backgroundImage: `url(${backgound})`,
            }}
          >
            <div
              className="rounded-sm bg-[#5de4b5] absolute top-2 left-2 bg-opacity-80 px-2 text-[15px] font-[550]">
              {format}</div>
            <div
              className="rounded-sm absolute bottom-2 right-2 bg-black bg-opacity-60 text-slate-200 px-2 text-[15px] font-[550]">
              {duration}</div>
          </div>
          <h1 className="text-[11px] md:text-[12px] pt-2 flex justify-between text-gray-100">
            <span>Episode:</span>
            <span>{episode}</span>
          </h1>
          <h1 className="text-[11px] md:text-[12px] pt-0 flex justify-between text-gray-100">
            <span>Aired on:</span>
            <span>{date}</span>
          </h1>
          <h1 className="text-[11px] md:text-sm pt-1 font-normal text-sgreen">
            {title}
          </h1>
        </div>
      </Link>
    </motion.div>
  )
}

Recent.propTypes = {
  data: PropTypes.any,
}

const MemoRecent = memo(Recent)

export default MemoRecent
