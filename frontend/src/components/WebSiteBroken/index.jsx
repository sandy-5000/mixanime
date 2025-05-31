import ReactDOM from 'react-dom'

const WebSiteBroken = () => {
  return ReactDOM.createPortal(
    <div style={{ padding: 0 }} className="web-site-broken">
      <div className="ring-2 ring-teal-400 p-2 rounded-xl">
        <p className="text-slate-200 text-center text-xs">
          The website has stopped functioning because the parent site is no
          longer operational.
        </p>
      </div>
    </div>,
    document.body
  )
}

export default WebSiteBroken
