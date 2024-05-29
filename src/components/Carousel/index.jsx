import { PropTypes } from "prop-types"
import CardElement from "./CardElement"

const Carousel = ({ list }) => {
  if (!list || list.length === 0) {
    return <></>
  }
  return (
    <div className="lg:m-10 m-3 carousel relative">
      <CardElement data={list[0]} index="0" />
    </div>
  )
}

Carousel.propTypes = {
  list: PropTypes.array,
}

export default Carousel