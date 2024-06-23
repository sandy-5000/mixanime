import { PropTypes } from "prop-types"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"


const _Card = ({ data, rotate, width, active }) => {
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

_Card.propTypes = {
  data: PropTypes.any,
  rotate: PropTypes.number,
  width: PropTypes.number,
  active: PropTypes.boolean,
}


const _AnimeList = ({ list }) => {
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
          <_Card
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

_AnimeList.propTypes = {
  list: PropTypes.list
}
