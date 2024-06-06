import { useState } from "react"
import { PropTypes } from "prop-types"
import { VscSignIn, VscSignOut } from "react-icons/vsc"
import Logo from "/src/components/Logo"
import Button from "/src/components/Button"
import wall from "/src/assets/images/pic_1.jpg"
import Find from "/src/components/Find"
import Footer from "/src/components/Footer"


const MainLayout = ({ children }) => {
  const [isLoggedIn, setLogin] = useState(false)
  const [blur, setBlur] = useState(false)

  const handleAuth = () => {
    setLogin(prev => !prev)
  }

  const toggleFind = () => {
    setBlur(prev => !prev)
  }

  return (
    <div className="relative">
      {
        blur && <div className="z-[5] fixed h-screen w-screen">
          <Find toggleFind={toggleFind} />
        </div>
      }
      <header
        className="bg-gradient-to-b from-gray-900 z-[4] fixed w-screen"
        style={{
          filter: blur ? 'blur(12px)' : 'blur(0px)',
        }}
      >
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
      <div
        style={{
          filter: blur ? 'blur(12px)' : 'blur(0px)',
        }}
        className="fixed left-0 top-0 w-screen h-screen flex flex-col justify-center"
      >
        <div className="bg-ratio">
          <div className="relative bg-ratio">
            <div className="absolute bg-ratio background" style={{ backgroundImage: `url(${wall})` }}></div>
            <div className="absolute z-[2] bg-ratio background-blur"></div>
          </div>
        </div>
      </div>
      <main
        className="relative"
        style={{
          minHeight: '100vh',
          filter: blur ? 'blur(12px)' : 'blur(0px)',
        }}
      >
        <div className="w-full pt-[70px]">
          {children}
        </div>
        <Footer />
      </main>
    </div >
  )
}

MainLayout.propTypes = {
  children: PropTypes.node
}

export default MainLayout
