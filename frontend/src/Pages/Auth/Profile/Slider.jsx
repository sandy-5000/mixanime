import { PropTypes } from "prop-types"

const Slider = ({ list }) => {
  console.log(list)

  if (!list || list.length === 0) {
    return (
      <div className="h-[400px] a-center">
        <p>Nothing Avaliable</p>
      </div>
    )
  }

  return <></>
}

Slider.propTypes = {
  list: PropTypes.array,
}

export default Slider
