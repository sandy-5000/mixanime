import { PropTypes } from "prop-types"

const getDate = (x) => {
  let p = new Date(x * 1000)
  let dateExtention = 'th', date = p.getDate()
  if (date < 11 || 13 < date) {
    if (date % 10 == 1) {
      dateExtention = 'st'
    } else if (date % 10 == 2) {
      dateExtention = 'nd'
    } else if (date % 10 == 3) {
      dateExtention = 'rd'
    }
  }
  return date + dateExtention + ' ' + p.toString().slice(4, 7) + ' ' + p.toString().slice(16, 21)
}

const MAX_TITLE_SIZE = 25

const Recent = ({ data = {} }) => {
  console.log(data)
  const id = data.media.id
  const navTitle =
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
    <div className="cursor-pointer hidden-recent-card h-full lg:w-1/4 md:w-1/3 sm:w-1/3 w-1/2 p-2">
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
        <h1 className="text-xs pt-2 flex justify-between text-gray-100">
          <span>Episode:</span>
          <span>{episode}</span>
        </h1>
        <h1 className="text-xs pt-0 flex justify-between text-gray-100">
          <span>Aired on:</span>
          <span>{date}</span>
        </h1>
        <h1 className="lg:text-sm md:text-sm text-xs pt-1 font-normal text-sgreen">
          {title}
        </h1>
      </div>
    </div>
  )
}

Recent.propTypes = {
  data: PropTypes.any,
}

export default Recent
