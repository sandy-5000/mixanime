import { Link } from "react-router-dom"
import { getQueryParams } from "/src/services/untils"

const App = () => {
  return (
    <div>
      <h1 className="text-md text-slate-200">
        <Link to="/home">Home</Link>
      </h1>
      <h1 className="text-md text-slate-200">
        <Link to={{
          pathname: '/recent',
          search: getQueryParams({ page: 1 }),
        }}
        >
          Recent
        </Link>
      </h1>
      <h1 className="text-md text-slate-200">
        <Link to={{
          pathname: '/trending',
          search: getQueryParams({ page: 1 }),
        }}
        >
          Trending
        </Link>
      </h1>
      <h1 className="text-md text-slate-200">
        <Link to="/details">Details</Link>
      </h1>
      <h1 className="text-md text-slate-200">
        <Link to="/explore">Explore</Link>
      </h1>
      <h1 className="text-md text-slate-200">
        <Link to="/watch">Watch</Link>
      </h1>
    </div>
  )
}

export default App
