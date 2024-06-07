import { PropTypes } from "prop-types"
import { LuNewspaper } from "react-icons/lu"
import { VscDebugLineByLine } from "react-icons/vsc"
import Button from "/src/components/Button"
import { motion } from "framer-motion"
import { useState } from "react"
import Recent from "/src/components/Card/Recent"


const Recents = ({ list = [] }) => {
  const [btnHover, setButtonHover] = useState(false)

  if (!list || list.length === 0) {
    return <></>
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
          <motion.div
            onHoverStart={() => setButtonHover(true)}
            onHoverEnd={() => setButtonHover(false)}
          >
            <Button
              style={{
                height: 30,
                color: btnHover ? '#111827' : '#cbd5e1',
                backgroundColor: btnHover ? '#e5e7ebee' : '#11182799',
              }}
              hoverStyle={{
                color: '#111827',
                backgroundColor: '#e5e7eb',
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
          </motion.div>
        </div>
        <div className="recent-container w-full overflow-x-scroll pt-2">
          <div className="recent flex flex-nowrap relative w-[1200%] md:w-[800%] lg:w-[600%]">
            {
              list.map((data, index) => {
                return <Recent
                  key={'rcard-' + index}
                  data={data}
                />
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

Recents.propTypes = {
  list: PropTypes.array,
}

export default Recents
