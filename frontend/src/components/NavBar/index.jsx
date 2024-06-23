import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { VscMenu, VscAccount } from "react-icons/vsc"
import { LuNewspaper } from "react-icons/lu"
import { HiColorSwatch } from "react-icons/hi"
import { TbMapSearch } from "react-icons/tb"
import { Link } from "react-router-dom"
import { getQueryParams } from "/src/services/untils"


const NavBar = () => {
  const [yShift, setYShift] = useState(0)

  const toggleYShift = () => {
    if (yShift === 0) {
      setYShift(60)
    } else {
      setYShift(0)
    }
  }

  useEffect(() => {
    const inteval = setTimeout(() => {
      setYShift(60)
    }, 3000)
    return () => {
      clearInterval(inteval)
    }
  }, [])

  return (
    <motion.div className="fixed z-[5]"
      style={{
        bottom: 10,
        left: 'calc(50vw - 150px)'
      }}
      animate={{
        y: yShift
      }}
    >
      <div className="relative w-[300px] h-[50px] p-2 rounded-lg bg-[#f3f4f6dd]">
        <div
          className="rounded-t-full bg-[#f3f4f6dd] w-16 h-8 -mt-10 mx-auto a-center cursor-pointer"
          onClick={toggleYShift}
        >
          <VscMenu className="text-gray-950 text-xl mt-2" />
        </div>
        <div className="flex justify-around h-[50px] p-2">
          <motion.div
            className="a-center cursor-pointer"
            whileHover={{
              scale: 1.2
            }}
            whileTap={{
              scale: 0.95
            }}
          >
            <Link
              to={{
                pathname: '/recent',
                search: getQueryParams({ page: 1 }),
              }}
            >
              <LuNewspaper className="text-2xl text-gray-950" />
            </Link>
          </motion.div>
          <motion.div
            className="a-center cursor-pointer"
            whileHover={{
              scale: 1.2
            }}
            whileTap={{
              scale: 0.95
            }}
          >
            <Link
              to={{
                pathname: '/trending',
                search: getQueryParams({ page: 1 }),
              }}
            >
              <HiColorSwatch className="text-2xl text-gray-950" />
            </Link>
          </motion.div>
          <motion.div
            className="a-center cursor-pointer"
            whileHover={{
              scale: 1.2
            }}
            whileTap={{
              scale: 0.95
            }}
          >
            <Link
              to={{
                pathname: "/explore",
                search: getQueryParams({ page: 1 }),
              }}>
              <TbMapSearch className="text-2xl text-gray-950" />
            </Link>
          </motion.div>
          <motion.div
            className="a-center cursor-pointer"
            whileHover={{
              scale: 1.2
            }}
            whileTap={{
              scale: 0.95
            }}
          >

            <Link
              to={{
                pathname: "/profile",
              }}>
              <VscAccount className="text-2xl text-gray-950" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default NavBar