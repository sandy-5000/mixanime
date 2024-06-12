import { PropTypes } from "prop-types"
import { motion } from "framer-motion"

const Season = ({ data }) => {
  const startDate = data.startDate.day + '/' + data.startDate.month + '/' + data.startDate.year
  const background = data.coverImage.extraLarge
  const format = data.format.replaceAll('_', ' ')
  const title =
    data.title.userPreferred ||
    data.title.english ||
    data.title.romaji ||
    data.title.native
  return (
    <motion.div
      className="cursor-pointer hidden-season-card lg:w-1/6 md:w-1/4 sm:w-1/4 w-1/3 p-1"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className="glass glass-hard w-full"
        style={{
          padding: 5
        }}
      >
        <div className="aspect-[2/3] md:aspect-[2/3] lg:aspect-[2/3] p-[1px] md:p-1">
          <div className="background w-full h-full relative p-2 rounded-lg"
            style={{
              backgroundImage: `url(${background})`,
            }}
          >
            <div
              className="rounded-sm bg-[#5de4b5] absolute top-2 left-2 bg-opacity-80 px-2 text-[15px] font-[550]">
              {format}</div>
            <div
              className="rounded-sm absolute bottom-2 right-2 bg-black bg-opacity-60 text-slate-200 px-2 text-[15px] font-[550]">
              {data.duration || 23}:00</div>
          </div>
        </div>
        <div className="p-[1px] md:p-1">
          <p className="pt-2 text-xs text-slate-200 flex justify-between">
            <span>
              Airing <span className="lg:inline-flex md:inline-flex hidden">from</span>:
            </span>
            <span className="text-right">
              {startDate}
            </span>
          </p>
          <h1 className="truncate text-sm pt-1 font-normal text-sgreen">
            {title}
          </h1>
        </div>
      </div>
    </motion.div>
  )
}

Season.propTypes = {
  data: PropTypes.any,
}

export default Season
