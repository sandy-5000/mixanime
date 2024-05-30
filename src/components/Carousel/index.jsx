import { PropTypes } from "prop-types"
import CardElement from "./CardElement"
import { useEffect, useState } from "react"

const Carousel = ({ list }) => {
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setActiveCard((activeCard + 1) % list.length)
    }, 10000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [activeCard, list])

  if (!list || list.length === 0) {
    return <></>
  }
  return (
    <div className="container mx-auto">
      <div className="lg:m-10 m-3 carousel relative aspect-[9/5] md:aspect-[5/2] xl:aspect-[3/1]">
        {
          list.map((data, index) => {
            return <CardElement
              key={'ccard-' + index}
              data={data}
              index={index}
              active={index === activeCard}
            />
          })
        }
        <div
          className="z-[4] absolute left-0 bottom-0 bg-sgreen rounded-sm h-[2px]"
          style={{ width: `${(activeCard + 1) * 10}%` }}
        ></div>
      </div>
    </div>
  )
}

Carousel.propTypes = {
  list: PropTypes.array,
}

export default Carousel
