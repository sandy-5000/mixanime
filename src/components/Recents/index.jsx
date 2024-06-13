import { PropTypes } from "prop-types"
import { LuNewspaper } from "react-icons/lu"
import { VscDebugLineByLine } from "react-icons/vsc"
import Button from "/src/components/Button"
import { useEffect, useState } from "react"
import Recent from "/src/components/Card/Recent"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Spinner from "/src/components/Spinner"


const scrollState = {
  LEFT: -1,
  MID: 0,
  RIGHT: 1,
}

const Recents = ({ list = [] }) => {
  const [scroll, setScroll] = useState(scrollState.MID)
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ffe4e622", "#ffe4e628", "#ffe4e622"]
  )

  useEffect(() => {
    let interval = null
    let container = document.querySelector('.recent-container')
    if (container && scroll !== scrollState.MID) {
      interval = setInterval(() => {
        container.scrollLeft += 20 * scroll
      }, 10)
    }
    return () => {
      clearInterval(interval)
    }
  }, [scroll])

  const handleDrag = (_, info) => {
    let offset = info.offset.x
    if (offset > 100) {
      if (scroll !== scrollState.RIGHT) {
        setScroll(scrollState.RIGHT)
      }
    } else if (offset > 10) {
      if (scroll !== scrollState.RIGHT / 2) {
        setScroll(scrollState.RIGHT / 2)
      }
    } else if (offset < -100) {
      if (scroll !== scrollState.LEFT) {
        setScroll(scrollState.LEFT)
      }
    } else if (offset < -10) {
      if (scroll !== scrollState.LEFT / 2) {
        setScroll(scrollState.LEFT / 2)
      }
    } else {
      if (scroll !== scrollState.MID) {
        setScroll(scrollState.MID)
      }
    }
  }

  if (!list || list.length === 0) {
    return (
      <div className="xl:container mx-auto">
        <div className="lg:m-10 m-3 h-[300px]">
          <Spinner />
        </div>
      </div>
    )
  }
  list = list
    .filter(x => x.media.countryOfOrigin === 'JP' && !x.media.genres?.includes('Hentai'))
    .slice(0, 24)
  return (
    <div className="xl:container mx-auto">
      <div className="lg:m-10 m-3">
        <div className="flex justify-between">
          <div className="flex">
            <div className="a-center">
              <LuNewspaper className="text-sgreen text-[22px] mr-2" />
            </div>
            <div className="a-center font-semibold">
              <h1 className="text-slate-200 text-sm side-heading">Recently <span className="text-sgreen">Released</span></h1>
            </div>
          </div>
          <Button
            style={{
              height: 30,
              color: '#cbd5e1',
              backgroundColor: '#11182799',
            }}
            hoverStyle={{
              color: '#111827',
              backgroundColor: '#e5e7ebee',
            }}
          >
            <div className="flex justify-center">
              <div className="a-center">
                <span className="mr-1 text-xs inline-flex">More</span>
              </div>
              <div className="a-center">
                <VscDebugLineByLine className="text-[17px]" />
              </div>
            </div>
          </Button>
        </div>
        <div className="recent-container w-full overflow-x-scroll pt-2"
          style={{
            mask: 'linear-gradient(90deg, transparent, white 10%, white 90%, transparent)'
          }}
        >
          <div className="scroller">
            <div className="w-8"></div>
            {
              list.map((data, index) => {
                return <Recent
                  key={'rcard-' + index}
                  data={data}
                />
              })
            }
            <div className="w-8"></div>
          </div>
        </div>
        <div className="w-full a-center">
          <motion.div className="mx-2 overflow-hidden w-full md:w-[300px] p-2 rounded-lg a-center"
            style={{
              background,
              scrollBehavior: 'revert'
            }}
          >
            <motion.div
              drag="x"
              dragMomentum={false}
              dragConstraints={{ left: 0, right: 0 }}
              style={{ x }}
              onDrag={handleDrag}
              onDragEnd={() => setScroll(scrollState.MID)}
            >
              <div className="w-8 h-8 rounded-full bg-[#cbd5e166]"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

Recents.propTypes = {
  list: PropTypes.array,
}

export default Recents
