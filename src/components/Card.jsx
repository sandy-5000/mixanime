import { PropTypes } from "prop-types"
import { useState } from "react"
import { motion } from "framer-motion"
import { VscPlay, VscAdd } from "react-icons/vsc"
import Button from "/src/components/Button"


const Card = ({ type = 'default', data = {}, index = 0 }) => {
  const title =
    data.title.romaji ||
    data.title.userPreferred ||
    data.title.english ||
    data.title.native

  const [hover, setHover] = useState(false)

  const imgVariants = {
    open: { scale: 1.1, x: -10, y: -5, rotate: -10 },
    closed: { scale: 1, x: 0, y: 5, rotate: 0 },
  }
  const titleVariants = {
    open: { x: -10 },
    closed: { x: 0 },
  }
  const bottomVariants = {
    open: { x: 10 },
    closed: { x: 0 },
  }
  const detailsButtonVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 50 },
  }
  const addButtonVariants = {
    open: { x: 5 },
    closed: { x: 0 },
  }

  const cards = {
    findAnime: (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: index / 10 }}
        className="w-full sm:w-1/2 2xl:w-1/3 p-2"
      >
        <motion.div
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
          onTouchStart={() => setHover(!hover)}
          className="glass h-[200px] cursor-pointer"
        >
          <div className="flex h-full">
            <div className="h-full aspect-[2/3]">
              <motion.div
                animate={hover ? 'open' : 'closed'}
                variants={imgVariants}
              >
                <img
                  className="object-cover rounded-md h-full w-full" src={data.coverImage.large}
                />
              </motion.div>
            </div>
            <motion.div
              style={{ width: 'calc(100% - 134px)' }}
              className="p-2 flex flex-col justify-between"
            >
              <motion.div
                animate={hover ? 'open' : 'closed'}
                variants={titleVariants}
                className="flex justify-end"
              >
                <div className="w-[55px] flex justify-end items-center pr-1">
                  <p className="text-gap-1 text-teal-500">Title: </p>
                </div>
                <div
                  style={{ width: 'calc(100% - 50px)', maxHeight: 65 }}
                  className="overflow-hidden">
                  <p className="text-gray-200 text-xs">{title}</p>
                </div>
              </motion.div>
              <motion.div
                animate={hover ? 'open' : 'closed'}
                variants={bottomVariants}
              >
                <div className="flex justify-end mb-2">
                  <motion.div
                    animate={hover ? 'open' : 'closed'}
                    variants={detailsButtonVariants}
                    className="pr-5"
                  >
                    <Button
                      style={{
                        height: 30,
                        color: hover ? '#111827' : '#cbd5e1',
                        backgroundColor: hover ? '#5eead4ee' : '#000000',
                      }}
                      hoverStyle={{
                        color: '#111827',
                        backgroundColor: '#5eead4',
                      }}
                    >
                      <VscPlay className="mr-2 text-md" />
                      <span>Details</span>
                    </Button>
                  </motion.div>
                  <motion.div
                    animate={hover ? 'open' : 'closed'}
                    variants={addButtonVariants}
                    className="pr-5"
                  >
                    <Button
                      style={{
                        height: 30,
                        color: hover ? '#111827' : '#cbd5e1',
                        backgroundColor: hover ? '#e5e7ebcc' : '#11182755',
                      }}
                      hoverStyle={{
                        color: '#111827',
                        backgroundColor: '#e5e7eb',
                      }}
                    >
                      <VscAdd className="mr-2 text-md" />
                      <span>Add</span>
                    </Button>
                  </motion.div>
                </div>
                <div className="flex justify-start">
                  <div className="w-[55px] flex justify-end items-center pr-1">
                    <p className="text-gap-1 text-teal-500">Year: </p>
                  </div>
                  <div
                    style={{ width: 'calc(100% - 50px)' }}
                    className="overflow-hidden">
                    <p className="text-gray-200 text-xs">{data?.startDate?.year || 'NO DATA'}</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="w-[55px] flex justify-end items-center pr-1">
                    <p className="text-gap-1 text-teal-500">Status: </p>
                  </div>
                  <div
                    style={{ width: 'calc(100% - 50px)' }}
                    className="overflow-hidden">
                    <p className="text-gray-200 text-xs">{
                      (data?.status?.split('_') || ['NO', 'DATA']).join(' ')
                    }</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div >
        </motion.div >
      </motion.div >
    ),
    'default': <></>,
  }
  return cards[type]
}

Card.propTypes = {
  type: PropTypes.string,
  data: PropTypes.any,
  index: PropTypes.number,
}

export default Card