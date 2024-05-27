import { useEffect, useState } from "react"
import { PropTypes } from "prop-types"
import { VscSignIn, VscSignOut } from "react-icons/vsc"
import Logo from "/src/components/Logo"
import Button from "/src/components/Button"
import wall from "/src/assets/images/wallp0.jpg"
import Find from "/src/components/Find"


const MainLayout = ({ children }) => {
  const [isLoggedIn, setLogin] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [maxScrollY, setMaxScrollY] = useState(0)
  const moveAmount = 0.2 * (scrollY / maxScrollY) * window.innerHeight
  const [blur, setBlur] = useState(false)

  const handleScroll = () => {
    setScrollY(window.scrollY)
  }
  const updateMaxScrollY = () => {
    setMaxScrollY(document.documentElement.scrollHeight - window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', updateMaxScrollY)
    updateMaxScrollY()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateMaxScrollY)
    }
  }, [])

  const handleAuth = () => {
    setLogin(prev => !prev)
  }

  const toggleFind = () => {
    setBlur(prev => !prev)
  }

  return (
    <div className="relative">
      {
        blur && <div className="z-[4] fixed h-screen w-screen">
          <Find toggleFind={toggleFind} />
        </div>
      }
      <header className={"z-[3] fixed w-screen" + (blur ? " blur-md" : "")}>
        <div className="h-[60px] flex justify-between px-4">
          <div className="flex">
            <div className="h-full a-center">
              <Logo />
            </div>
            <div className="ml-3 h-full a-center">
              <Button btnType="find" onClick={toggleFind} />
            </div>
          </div>
          <div className="a-center">
            {
              isLoggedIn
                ? <Button btnType="auth" onClick={handleAuth}><VscSignOut className="mr-2 text-xl" />
                  <span className="w-12">Logout</span>
                </Button>
                : <Button btnType="auth" onClick={handleAuth}><VscSignIn className="mr-2 text-xl" />
                  <span className="w-12">Login</span>
                </Button>
            }
          </div>
        </div>
      </header>
      <main className={"relative h-screen" + (blur ? " blur-md" : "")}>
        <div className="fixed w-screen h-screen flex flex-col justify-end">
          <div className="bg-ratio" style={{ paddingBottom: moveAmount || 0 }}>
            <div className="relative bg-ratio">
              <div className="absolute bg-ratio background" style={{ backgroundImage: `url(${wall})` }}></div>
              <div className="absolute z-[2] bg-ratio background-blur"></div>
            </div>
          </div>
        </div>
        <div className="left-0 top-0 absolute w-full pt-[70px]">
          {children}
        </div>
      </main>
    </div >
  )
}

MainLayout.propTypes = {
  children: PropTypes.node
}

export default MainLayout
