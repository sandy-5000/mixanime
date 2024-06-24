import AuthLayout from "/src/layouts/AuthLayout"
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { useState } from "react"
import { MdAlternateEmail } from "react-icons/md"
import { FaShieldAlt } from "react-icons/fa"
import Logo from "/src/components/Logo"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { LuShieldCheck } from "react-icons/lu"
import { PiUserCircleDuotone } from "react-icons/pi"
import { FaRegUser } from "react-icons/fa"

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [cpasswd, setCPasswd] = useState('')
  const [showPasswd, setShowPasswd] = useState(false)

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handleEmail = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswd = (event) => {
    setPasswd(event.target.value)
  }
  const handleCPasswd = (event) => {
    setCPasswd(event.target.value)
  }
  const handleShowPasswd = () => {
    setShowPasswd(!showPasswd)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ username, email, passwd, cpasswd })
  }

  return (
    <AuthLayout>
      <div className="w-full h-full a-center p-5 pb-[60px]">
        <div className="w-full md:w-[360px] glass glass hard v-center">
          <form
            className="w-full h-full"
            onSubmit={handleSubmit}
          >
            <div className="h-[60px] flex justify-start p-5 pt-8">
              <Logo />
            </div>
            <div className="flex float-start p-5 pt-3 w-full">
              <div className="relative w-full">
                <div className="absolute h-8 left-0 px-3 a-center">
                  <FaRegUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  name="username"
                  onChange={handleUsername}
                  className="h-8 w-full md:w-[300px] bg-transparent py-2 px-10 text-gray-200
                  rounded-lg ring-2 ring-teal-400 focus:ring-2 focus:ring-teal-300
                  tracking-wide text-sm"
                  placeholder="Enter Username"
                />
              </div>
            </div>
            <div className="flex float-start p-5 pt-0 w-full">
              <div className="relative w-full">
                <div className="absolute h-8 left-0 px-3 a-center">
                  <MdAlternateEmail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={handleEmail}
                  className="h-8 w-full md:w-[300px] bg-transparent py-2 px-10 text-gray-200
                  rounded-lg ring-2 ring-teal-400 focus:ring-2 focus:ring-teal-300
                  tracking-wide text-sm"
                  placeholder="Enter Email"
                />
              </div>
            </div>
            <div className="flex float-start p-5 pt-0 w-full">
              <div className="relative w-full">
                <div className="absolute h-8 left-0 px-3 a-center">
                  <FaShieldAlt className="text-gray-400" />
                </div>
                <input
                  type={showPasswd ? "text" : "password"}
                  value={passwd}
                  name="passwd"
                  onChange={handlePasswd}
                  className="h-8 w-full md:w-[300px] bg-transparent py-2 px-10 text-gray-200
                  rounded-lg ring-2 ring-teal-400 focus:ring-2 focus:ring-teal-300
                  tracking-wide text-sm"
                  placeholder="Enter Password"
                />
                <div className="absolute top-0 h-8 right-0 px-3 a-center">
                  <button onClick={handleShowPasswd} type="button">
                    {
                      showPasswd
                        ? <VscEye className="text-gray-200" />
                        : <VscEyeClosed className="text-gray-200" />
                    }
                  </button>
                </div>
              </div>
            </div>
            <div className="flex float-start p-5 pt-0 w-full">
              <div className="relative w-full">
                <div className="absolute h-8 left-0 px-3 a-center">
                  <LuShieldCheck className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={cpasswd}
                  name="cpasswd"
                  onChange={handleCPasswd}
                  className="h-8 w-full md:w-[300px] bg-transparent py-2 px-10 text-gray-200
                  rounded-lg ring-2 ring-teal-400 focus:ring-2 focus:ring-teal-300
                  tracking-wide text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div className="p-5 pt-0 pb-3 flex justify-between">
              <div className="pr-3 flex v-center">
                <Link to="/login">
                  <p className="text-sgreen text-xs cursor-pointer">Already have an account?</p>
                </Link>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2
                  rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm
                  transition ease-in-out duration-150
                  text-[#111827] bg-[#cbd5e1cc]
                  hover:bg-[#e5e7ebee]
                  disabled:opacity-25"
                >
                  <div className="flex justify-center">
                    <div className="a-center mr-1">
                      <span className="text-xs inline-flex">SignUp</span>
                    </div>
                    <div className="a-center">
                      <PiUserCircleDuotone className="text-lg" />
                    </div>
                  </div>
                </button >
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp
