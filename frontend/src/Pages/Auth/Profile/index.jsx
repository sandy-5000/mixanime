import MainLayout from '/src/layouts/MainLayout'
import UpdateForm from './UpdateForm'
import ProfilePic from '/src/assets/images/umaru.png'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '/src/context'
import Slider from './Slider'
import Spinner from '/src/components/Spinner'
import { ROUTES } from '/src/services/untils'

const Profile = () => {
  const navigate = useNavigate()
  const [user] = useContext(Context)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!user.loading && (!token || !user.loggedIn)) {
      navigate(ROUTES.LOGIN, { replace: true })
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (user.loading || !user.loggedIn) {
    return (
      <MainLayout>
        <div className="h-screen">
          <Spinner />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="p-5 md:flex justify-center">
        <div className="a-center">
          <img src={ProfilePic} className="h-[300px]" />
        </div>
        <div className="a-center">
          <UpdateForm />
        </div>
      </div>
      <div className="mt-5">
        <div className="px-5 md:px-8">
          <p className="text-gap-2 text-gray-200">
            Your <span className="text-sgreen">List</span>
          </p>
        </div>
        <Slider list={user.data?.userList} name="userlist" />
        <div className="px-5 md:px-8">
          <p className="text-gap-2 text-gray-200">
            Your <span className="text-sgreen">Favourites</span>
          </p>
        </div>
        <Slider list={user.data?.favourites} name="favourites" />
        <div className="h-[200px]"></div>
      </div>
    </MainLayout>
  )
}

export default Profile
