import MainLayout from "/src/layouts/MainLayout"
import UpdateForm from "./UpdateForm"
import ProfilePic from "/src/assets/images/umaru.png"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "/src/context"
import Slider from "./Slider"

const Profile = () => {
  const navigate = useNavigate()
  const [user] = useContext(Context)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || !user.loggedIn) {
      navigate('/login')
      return
    }
  }, [user])

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
        <Slider list={user.data.userList} />
        <Slider list={user.data.favourites} />
      </div>
    </MainLayout>
  )
}

export default Profile
