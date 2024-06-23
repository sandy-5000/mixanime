import { PropTypes } from "prop-types"
import Spinner from "/src/components/Spinner"
import { memo } from "react"
import Lottie from "react-lottie"
import Television from "/src/assets/animations/watch.json"

const Video = ({ data }) => {
  if (!data) {
    return (
      <div className="xl:container mx-auto">
        <div className="lg:m-10 m-3 h-[500px]">
          <Spinner />
        </div>
      </div>
    )
  }

  const options = {
    loop: true,
    autoplay: true,
    animationData: Television,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div className="md:flex px-5 justify-between">
      <div className="w-full md:w-[69vw] my-5 aspect-video">
        {
          data.link ?
            <iframe allowfullscreen="true" id="playerframe" className="w-full h-full rounded-md"
              src={data.link}>
            </iframe>
            : <div className="w-full h-full a-center">
              <p className="text-xl text-gray-200">Video Not found yet, try after 30 min!</p>
            </div>
        }
      </div>
      <div className="hidden md:block w-0 md:w-[30vw] my-auto">
        <div className="m-5 a-center">
          <Lottie className="w-full" options={options} />
        </div>
      </div>
    </div>
  )
}

Video.propTypes = {
  data: PropTypes.any
}

const PureVideo = memo(Video)

export default PureVideo
