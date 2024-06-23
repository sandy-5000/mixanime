import { PropTypes } from "prop-types"
import { Link } from "react-router-dom"
import logo from "/src/assets/images/logo.png"

const Logo = ({ size = 120 }) => {
  return (
    <Link to="/home">
      <div style={{ width: size }} className="hover-effect relative a-center cursor-pointer">
        <img style={{ width: size }} className="z-[2] absolute left-0 right-0" src={logo} />
        <img style={{ width: size }} className="animate-pulse z-[2] absolute left-0 right-0" src={logo} />
      </div>
    </Link>
  )
}

Logo.propTypes = {
  size: PropTypes.number
}

export default Logo
