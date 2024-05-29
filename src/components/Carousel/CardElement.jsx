import { PropTypes } from "prop-types"
import Button from "/src/components/Button"
import DefaultImage from "/src/assets/images/wallp2.jpg"
import { VscPlayCircle, VscChevronRight } from "react-icons/vsc"


const CardElement = ({ data, index }) => {
  const title =
    data.title.userPreferred ||
    data.title.english ||
    data.title.romaji ||
    data.title.native
  const backgroundImage = data.bannerImage || DefaultImage
  return (
    <div
      className="left-0 top-0 absolute rounded-lg w-full
      aspect-[9/5] md:aspect-[5/2] lg:aspect-[3/1] overflow-x-hidden"
      style={{
        background: `linear-gradient(to right, rgba(1, 1, 1, 0.7) 90%,
          rgba(1, 1, 1, 0.7) 90%, rgba(1, 1, 1, 0.7) 90%), url(${backgroundImage})
          no-repeat center center / cover`,
      }}
    >
      <div className="w-full h-full relative">
        <div className="flex flex-col justify-end h-full p-4">
          <div className="lg:w-6/12 md:w-6/12 w-8/12">
            <div className="w-10/12">
              <p className="font-bold text-sgreen text-sm my-2 p-0"># {index + 1} SPOTLIGHT</p>
              <h3
                style={{ fontWeight: 'bolder', fontSize: 'min(30px, 3vw)' }}
                className="text-[#9fe6cd] pb-5"
              >{title}</h3>
              <p className="max-h-16 lg:max-h-32 md:block hidden text-[13px] text-slate-200 overflow-scroll"
                style={{
                  width: '120%',
                }}
                dangerouslySetInnerHTML={{ __html: data.description }}
              >
              </p>
              <div className="flex mt-5 mb-2 lg:mb-8 z-[2]">
                <Button
                  style={{
                    background: '#9fe6cd',
                    color: '#111827',
                    marginRight: '8px',
                  }}
                >
                  <VscPlayCircle className="mr-1 text-lg" />
                  <span>Watch</span>
                </Button>
                <Button
                  style={{
                    color: '#111827',
                    backgroundColor: '#e5e7ebee',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.75rem',
                  }}
                  hoverStyle={{
                    color: '#111827',
                    backgroundColor: '#e5e7eb',
                  }}
                >
                  <VscChevronRight className="text-lg mr-1" />
                  <span>Details</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CardElement.propTypes = {
  data: PropTypes.any,
  index: PropTypes.number,
}

export default CardElement
