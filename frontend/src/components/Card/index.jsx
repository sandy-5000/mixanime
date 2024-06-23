import { PropTypes } from "prop-types"
import Find from "./Find"
import Recent from "./Recent"


const Card = ({ type, data = {}, index = 0 }) => {
  switch (type) {
    case 'find':
      return <Find data={data} index={index} />
    case 'recent':
      return <Recent data={data} />
    default:
      return <></>
  }
}

Card.propTypes = {
  type: PropTypes.string,
  data: PropTypes.any,
  index: PropTypes.number,
}

export default Card
