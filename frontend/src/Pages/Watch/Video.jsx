import { PropTypes } from 'prop-types'
import Spinner from '/src/components/Spinner'
import { memo } from 'react'
import girl from '/src/assets/images/girl.png'
import PageButtons from '/src/components/PageButtons'

const Video = ({ data, episode, prevEpisode, nextEpisode }) => {
  if (!data) {
    return (
      <div className="xl:container mx-auto">
        <div className="lg:m-10 m-3 h-[500px]">
          <Spinner />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="md:flex px-5 justify-between">
        <div className="w-full md:w-[69vw] my-5 aspect-video">
          {data.link ? (
            <iframe
              allowfullscreen="true"
              id="playerframe"
              className="w-full h-full rounded-md"
              src={data.link}
            ></iframe>
          ) : (
            <div className="w-full h-full a-center">
              <p className="text-gap-2 text-center text-gray-200">
                Video Not found yet, try after 30 min!
              </p>
            </div>
          )}
        </div>
        <div className="hidden md:block w-0 md:w-[30vw] my-auto">
          <div className="m-5 a-center">
            <img src={girl} className="w-full aspect-square" />
          </div>
        </div>
      </div>
      <div>
        <PageButtons current={episode} prev={prevEpisode} next={nextEpisode} />
      </div>
    </div>
  )
}

Video.propTypes = {
  data: PropTypes.any,
  episode: PropTypes.number,
  prevEpisode: PropTypes.any,
  nextEpisode: PropTypes.any,
}

const PureVideo = memo(Video)

export default PureVideo
