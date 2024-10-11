import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { useEffect, useContext, useState } from 'react'
import { MdAlternateEmail } from 'react-icons/md'
import { FaShieldAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { LuShieldCheck } from 'react-icons/lu'
import { GoShieldLock } from 'react-icons/go'
import { PiUserCircleDuotone } from 'react-icons/pi'
import { FaRegUser } from 'react-icons/fa'
import { Context } from '/src/context'
import Loading from '/src/components/Button/Loading'
import backend from '/src/services/backend'
import { GrPowerReset } from 'react-icons/gr'

const UpdateForm = () => {
  const [showPasswd, setShowPasswd] = useState(false)
  const [showNPasswd, setShowNPasswd] = useState(false)
  const [user, setUser] = useContext(Context)

  const getDefaultValues = () => {
    const data = {
      username: user.data?.name || '',
      usermail: user.data?.email || '',
      passwd: '',
      npasswd: '',
      cpasswd: '',
    }
    return data
  }

  const [form, setForm] = useState(getDefaultValues())
  const [error, setError] = useState({})
  const [updateError, setUpdateError] = useState(null)
  const [updateSuccess, setUpdateSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    let interval = null
    if (updateError) {
      interval = setTimeout(() => {
        setUpdateError(null)
      }, 5000)
    }
    return () => {
      clearTimeout(interval)
    }
  }, [updateError])

  useEffect(() => {
    let interval = null
    if (updateSuccess) {
      interval = setTimeout(() => {
        setUpdateSuccess(null)
      }, 5000)
    }
    return () => {
      clearTimeout(interval)
    }
  }, [updateSuccess])

  const handleChange = (event) => {
    const data = { ...form, [event.target.name]: event.target.value }
    setForm(data)
    validate(event.target.name, data)
  }
  const resetForm = () => {
    setForm(getDefaultValues())
    setError({})
  }
  const handleShowPasswd = () => {
    setShowPasswd(!showPasswd)
  }
  const handleShowNPasswd = () => {
    setShowNPasswd(!showNPasswd)
  }

  const handleSubmit = (event, { username, passwd, npasswd, cpasswd }) => {
    event.preventDefault()
    if (!validate('all', { username, passwd, npasswd, cpasswd })) {
      return
    }
    const body = { username, passwd, npasswd }
    setLoading(true)
    backend
      .post('/api/user/update-profile', body)
      .then(({ data }) => {
        if (data.error) {
          setUpdateError(data.error)
          return
        }
        localStorage.setItem('token', data.jwt)
        setUser({
          loggedIn: user.loggedIn,
          data: { ...user.data, name: data.name },
        })
        setUpdateSuccess('Profile updated Successfully')
      })
      .catch((error) => {
        setUpdateError('Something went wrong')
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const validate = (param, { username, passwd, npasswd, cpasswd }) => {
    let flag = true
    if (param === 'username' || param === 'all') {
      if (3 > username.length || username.length > 30) {
        setError({
          ...error,
          username: 'Name must be of size 3 to 30 characters',
        })
        flag = false
      } else {
        setError({ ...error, username: undefined })
      }
    }
    if (param === 'npasswd' || param === 'all') {
      if (npasswd !== '' && npasswd.length < 8) {
        setError({ ...error, npasswd: 'Contains atleast 8 chars' })
        flag = false
      } else {
        setError({ ...error, npasswd: undefined })
      }
    }
    if (param === 'cpasswd' || param === 'all') {
      if (cpasswd === '') {
        setError({ ...error, cpasswd: undefined })
        flag = flag && npasswd === cpasswd
      } else if (npasswd !== cpasswd) {
        setError({ ...error, cpasswd: "Password didn't match" })
        flag = false
      } else {
        setError({ ...error, cpasswd: undefined })
      }
    }
    if (param === 'all') {
      if (passwd === '') {
        flag = false
      }
    }
    return flag
  }

  return (
    <div className="w-full h-full a-center p-5 pb-[60px]">
      <div className="w-full md:w-[360px] glass glass hard v-center">
        <form className="w-full h-full" onSubmit={(e) => handleSubmit(e, form)}>
          <div className="p-5 pt-3 pb-4">
            <p className="text-gray-200 text-gap-2">Update Profile</p>
          </div>
          <div className="p-5 pt-0 w-full">
            <div className="relative w-full">
              <div className="absolute h-8 left-0 px-3 a-center">
                <MdAlternateEmail className="text-gray-100" />
              </div>
              <input
                type="email"
                value={form.usermail}
                name="usermail"
                disabled={true}
                className="h-8 w-full md:w-[300px] bg-transparent py-2 px-10 text-gray-200
                  rounded-lg ring-2 ring-teal-700 focus:ring-2 focus:ring-teal-200
                  tracking-wide text-sm opacity-75"
                placeholder="Enter Email"
              />
            </div>
          </div>
          <div className="p-5 pt-3 w-full">
            <div className="relative w-full">
              <div className="absolute h-8 left-0 px-3 a-center">
                <FaRegUser className="text-gray-100" />
              </div>
              <input
                type="text"
                value={form.username}
                name="username"
                onChange={handleChange}
                className="h-8 w-full md:w-[300px] bg-transparent py-2 px-10 text-white
                  rounded-lg ring-2 ring-teal-700 focus:ring-2 focus:ring-teal-200
                  tracking-wide text-sm"
                placeholder="Enter Username"
              />
            </div>
            {error.username && (
              <span className="-mb-5 text-red-300 text-xs">
                {error.username}
              </span>
            )}
          </div>
          <div className="p-5 pt-0 w-full">
            <div className="relative w-full">
              <div className="absolute h-8 left-0 px-3 a-center">
                <GoShieldLock className="text-gray-100" />
              </div>
              <input
                type={showNPasswd ? 'text' : 'password'}
                value={form.npasswd}
                name="npasswd"
                onChange={handleChange}
                className="h-8 w-full md:w-[300px] bg-transparent py-2 px-10 text-white
                  rounded-lg ring-2 ring-teal-700 focus:ring-2 focus:ring-teal-200
                  tracking-wide text-sm"
                placeholder="Enter New Password"
              />
              <div className="absolute top-0 h-8 right-0 px-3 a-center">
                <button onClick={handleShowNPasswd} type="button">
                  {showNPasswd ? (
                    <VscEye className="text-gray-200" />
                  ) : (
                    <VscEyeClosed className="text-gray-200" />
                  )}
                </button>
              </div>
            </div>
            {error.npasswd && (
              <span className="-mb-5 text-red-300 text-xs">
                {error.npasswd}
              </span>
            )}
          </div>
          <div className="p-5 pt-0 w-full">
            <div className="relative w-full">
              <div className="absolute h-8 left-0 px-3 a-center">
                <LuShieldCheck className="text-gray-100" />
              </div>
              <input
                type="password"
                value={form.cpasswd}
                name="cpasswd"
                onChange={handleChange}
                className="h-8 w-full md:w-[300px] bg-transparent py-2 px-10 text-white
                  rounded-lg ring-2 ring-teal-700 focus:ring-2 focus:ring-teal-200
                  tracking-wide text-sm"
                placeholder="Confirm Password"
              />
            </div>
            {error.cpasswd && (
              <span className="-mb-5 text-red-300 text-xs">
                {error.cpasswd}
              </span>
            )}
          </div>
          <div className="p-5 pt-3 w-full">
            <div className="relative w-full">
              <div className="absolute h-8 left-0 px-3 a-center">
                <FaShieldAlt className="text-gray-100" />
              </div>
              <input
                type={showPasswd ? 'text' : 'password'}
                value={form.passwd}
                name="passwd"
                onChange={handleChange}
                className="h-8 w-full md:w-[300px] bg-transparent py-2 px-10 text-gray-200
                  rounded-lg ring-2 ring-teal-700 focus:ring-2 focus:ring-teal-200
                  tracking-wide text-sm"
                placeholder="Enter Password"
              />
              <div className="absolute top-0 h-8 right-0 px-3 a-center">
                <button onClick={handleShowPasswd} type="button">
                  {showPasswd ? (
                    <VscEye className="text-gray-200" />
                  ) : (
                    <VscEyeClosed className="text-gray-200" />
                  )}
                </button>
              </div>
            </div>
            {error.passwd && (
              <span className="-mb-5 text-red-300 text-xs">{error.passwd}</span>
            )}
            {updateError && (
              <span className="-mb-5 text-red-300 text-xs">{updateError}</span>
            )}
            {updateSuccess && (
              <span className="-mb-5 text-teal-300 text-xs">
                {updateSuccess}
              </span>
            )}
          </div>
          <div className="p-5 pt-0 pb-3 flex justify-end">
            {loading ? (
              <Loading>
                <span>Updating...</span>
              </Loading>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={resetForm}
                    type="button"
                    className="inline-flex items-center px-4 py-2
                        rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm
                        transition ease-in-out duration-150
                        text-[#111827] bg-[#fca5a5cc]
                        hover:bg-[#ea5f5fee]
                        disabled:opacity-25 mr-2"
                  >
                    <div className="flex justify-center">
                      <div className="a-center mr-1">
                        <span className="text-xs inline-flex">Reset</span>
                      </div>
                      <div className="a-center">
                        <GrPowerReset className="text-lg" />
                      </div>
                    </div>
                  </button>
                </motion.div>
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
                        hover:bg-teal-300
                        disabled:opacity-25"
                  >
                    <div className="flex justify-center">
                      <div className="a-center mr-1">
                        <span className="text-xs inline-flex">Update</span>
                      </div>
                      <div className="a-center">
                        <PiUserCircleDuotone className="text-lg" />
                      </div>
                    </div>
                  </button>
                </motion.div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateForm
