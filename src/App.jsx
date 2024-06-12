import { Link } from "react-router-dom"

const App = () => {
  return (
    <div>
      <h1 className="text-md text-slate-200">
        <Link to="/home">Home</Link>
      </h1>
      <h1 className="text-md text-slate-200">
        <Link to="/recent">Recent</Link>
      </h1>
      <h1 className="text-md text-slate-200">
        <Link to="/trending">Trending</Link>
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
