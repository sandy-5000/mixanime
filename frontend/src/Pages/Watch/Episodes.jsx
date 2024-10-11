import { PropTypes } from 'prop-types'
import { memo } from 'react'

const Episodes = ({ released, setEpisode }) => {
  return (
    <div>
      <div className="text-xs uppercase text-sgreen text-gap-2 pb-4">
        Episodes
      </div>
      <div
        className="h-[300px] md:h-full a-center"
        style={{
          mask: 'linear-gradient(transparent, white 1%, white 98%, transparent)',
        }}
      >
        <div className="flex flex-wrap overflow-y-scroll max-h-[300px] md:max-h-[430px]">
          {Array(released)
            .fill(0)
            .map((_, index) => (
              <div
                key={`episode-${index + 1}`}
                className="aspect-square w-12 p-1"
                onClick={() => setEpisode(index + 1)}
              >
                <div
                  className="
                  w-full h-full text-gray-200 bg-[#1f2937bb]
                  hover:bg-sgreen hover:text-gray-800 hover:scale-110 glass glass-hard
                  cursor-pointer a-center"
                >
                  <span className="text-xs font-semibold">{index + 1}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

Episodes.propTypes = {
  released: PropTypes.number,
  setEpisode: PropTypes.any,
}

const PureEpisodes = memo(Episodes)

export default PureEpisodes
